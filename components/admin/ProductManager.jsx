import React, { useState, useEffect } from 'react';
import { db, storage } from '@/lib/firebase';
import { 
  collection, addDoc, deleteDoc, doc, updateDoc, 
  serverTimestamp, onSnapshot, query, orderBy, getDocs 
} from 'firebase/firestore';
import { 
  ref, uploadBytes, getDownloadURL 
} from 'firebase/storage';
import { 
  Trash2, Plus, Loader2, X, 
  Edit2, Save, Search, ChevronRight, UploadCloud 
} from 'lucide-react';
import { compressImage } from '@/lib/utils'; 
import { motion, AnimatePresence } from 'framer-motion';

// --- DND-KIT IMPORTS ---
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// --- SORTABLE IMAGE COMPONENT ---
const SortableImage = ({ id, url, isNew, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group cursor-grab active:cursor-grabbing bg-white">
      <img src={url} className={`w-full h-full object-cover ${isNew ? 'opacity-80' : ''}`} alt="product thumbnail" />
      {isNew && <div className="absolute inset-0 bg-green-500/10 pointer-events-none" />}
      <button type="button" onPointerDown={(e) => e.stopPropagation()} onClick={onDelete} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10">
        <X size={12} />
      </button>
      {/* Drag Handle Indicator */}
      <div className="absolute bottom-1 right-1 bg-black/30 text-white p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
      </div>
    </div>
  );
};

export const ProductManager = ({ notify }) => { 
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  
  // Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // --- IMAGES STATE ---
  const [combinedImages, setCombinedImages] = useState([]);

  // --- DND SENSORS ---
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const initialState = {
    name: '',
    sku: '', 
    price: '',
    comparePrice: '',
    category: '', 
    description: '',
    stock: '',
    
    // Luxury Specs
    technique: '', 
    fabric: '', 
    warpMaterial: '',
    weftMaterial: '',
    zariType: '',
    origin: 'Varanasi, India',
    weight: '',
    dimensions: '',
    care: 'Dry Clean Only',
  };

  const [formData, setFormData] = useState(initialState);

  // 1. Fetch Products & Categories
  useEffect(() => {
    setLoading(true);
    
    // Listen to real-time updates
    const qProd = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubProd = onSnapshot(qProd, (snapshot) => {
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setProducts(list);
      setFilteredProducts(list);
      setLoading(false);
    }, (error) => {
      console.error(error);
      notify("Failed to load products", "error");
    });

    const fetchCats = async () => {
        try {
            const qCat = query(collection(db, 'navigation'), orderBy('order', 'asc'));
            const snap = await getDocs(qCat);
            const catList = snap.docs.map(doc => doc.data().name);
            setCategories(catList);
        } catch (e) {
            console.error("Failed to load categories");
        }
    };
    fetchCats();

    return () => unsubProd();
  }, [notify]); 

  // Filter Logic
  useEffect(() => {
    if (!searchQuery) {
      setFilteredProducts(products);
    } else {
      const lower = searchQuery.toLowerCase();
      setFilteredProducts(products.filter(p => 
        p.name.toLowerCase().includes(lower) || 
        (p.subCategory && p.subCategory.toLowerCase().includes(lower)) ||
        (p.sku && p.sku.toLowerCase().includes(lower))
      ));
    }
  }, [searchQuery, products]);

  // --- IMAGE SELECTION ---
  const handleImageSelect = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newImageObjects = newFiles.map((file, index) => ({
          id: `new-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
          type: 'new',
          url: URL.createObjectURL(file),
          file: file
      }));
      setCombinedImages(prev => [...prev, ...newImageObjects]);
    }
  };

  // --- DND HANDLERS ---
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setCombinedImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDeleteImage = (id) => {
    setCombinedImages(prev => prev.filter(item => item.id !== id));
  };

  const openDrawer = (product = null) => {
    if (product) {
      setEditMode(true);
      setEditId(product.id);
      
      // Determine correct category from either category OR subCategory field
      // This handles the legacy "artifact" issue gracefully in the UI
      const currentCategory = (product.category === 'artifact' && product.subCategory) 
        ? product.subCategory 
        : product.category;

      setFormData({
        name: product.name,
        sku: product.sku || '',
        price: product.price,
        comparePrice: product.comparePrice || '',
        category: currentCategory, 
        description: product.fullDescription || '',
        stock: product.stock || 0,
        
        // Populate new fields
        technique: product.technique || '',
        fabric: product.fabric || '',
        warpMaterial: product.warpMaterial || '',
        weftMaterial: product.weftMaterial || '',
        zariType: product.zariType || '',
        origin: product.origin || 'Varanasi, India',
        weight: product.weight || '',
        dimensions: product.dimensions || '',
        care: product.care || 'Dry Clean Only',
      });
      
      // Initialize combinedImages from existing URLs
      setCombinedImages(
        (product.imageUrls || []).map((url, index) => ({
            id: `existing-${product.id}-${index}`,
            type: 'existing',
            url: url,
            file: null
        }))
      );

    } else {
      setEditMode(false);
      setEditId(null);
      setFormData(initialState);
      setCombinedImages([]);
    }
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditMode(false);
    setEditId(null);
    // Revoke object URLs to avoid memory leaks
    combinedImages.forEach(item => {
      if (item.type === 'new') {
        URL.revokeObjectURL(item.url);
      }
    });
    setCombinedImages([]);
  };

  // --- OPTIMIZED SUBMIT HANDLER (Fixes Artifacts + Parallel Uploads) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (combinedImages.length === 0) {
      return notify("Please upload at least one image.", "error");
    }
    if (!formData.category) {
        return notify("Please select a category.", "error");
    }

    setProcessing(true);
    try {
      // 1. UPLOAD IMAGES IN PARALLEL
      const uploadPromises = combinedImages.map(async (item) => {
        if (item.type === 'existing') {
          return item.url;
        } else {
          // Compress and Upload new image
          const compressedFile = await compressImage(item.file, 2000, 0.85); 
          // Create a unique filename
          const uniqueName = `products/${Date.now()}_${Math.random().toString(36).substr(2, 5)}_${compressedFile.name}`;
          const imageRef = ref(storage, uniqueName);
          
          await uploadBytes(imageRef, compressedFile);
          return await getDownloadURL(imageRef);
        }
      });

      // Wait for all uploads to finish
      const finalImageUrls = await Promise.all(uploadPromises);

      // 2. PREPARE PRODUCT DATA
      const productData = {
        name: formData.name,
        sku: formData.sku || `SKU-${Date.now().toString().slice(-6)}`,
        price: parseFloat(formData.price),
        comparePrice: parseFloat(formData.comparePrice) || 0,
        stock: parseInt(formData.stock) || 0,
        
        // --- FIX: Store actual category instead of 'artifact' ---
        category: formData.category, 
        subCategory: formData.category, // Kept for backward compatibility
        
        // Better Search Tags
        tags_lowercase: [
            formData.category.toLowerCase(), 
            formData.name.toLowerCase(), 
            formData.sku.toLowerCase(),
            formData.fabric ? formData.fabric.toLowerCase() : '',
            formData.technique ? formData.technique.toLowerCase() : ''
        ].filter(Boolean),
        
        // Luxury Specs
        technique: formData.technique,
        fabric: formData.fabric,
        warpMaterial: formData.warpMaterial,
        weftMaterial: formData.weftMaterial,
        zariType: formData.zariType,
        origin: formData.origin,
        weight: formData.weight,
        dimensions: formData.dimensions,
        care: formData.care,

        // Images
        featuredImageUrl: finalImageUrls[0], // First image is featured
        imageUrls: finalImageUrls,
        fullDescription: formData.description,
        updatedAt: serverTimestamp()
      };

      // 3. SAVE TO FIRESTORE
      if (editMode) {
        await updateDoc(doc(db, 'products', editId), productData);
        notify("Product updated successfully!");
      } else {
        await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: serverTimestamp()
        });
        notify("New product added!");
      }
      closeDrawer();
    } catch (error) {
      console.error(error);
      notify("Error saving product: " + error.message, "error");
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure? This cannot be undone.")) {
      try {
        await deleteDoc(doc(db, 'products', id));
        notify("Product deleted.");
      } catch (err) {
        notify("Delete failed", "error");
      }
    }
  };

  return (
    <div className="relative h-full">
      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[600px]">
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white sticky top-0 z-10">
           <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search by name, SKU or category..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#B08D55] focus:ring-1 focus:ring-[#B08D55] transition-all bg-gray-50 focus:bg-white"
                />
           </div>
           <button 
             onClick={() => openDrawer()} 
             className="w-full sm:w-auto bg-[#1A1A1A] text-white px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg"
           >
             <Plus size={18} /> Add Product
           </button>
        </div>
        
        <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                    <tr>
                        <th className="p-4 pl-6">Product Details</th>
                        <th className="p-4 hidden md:table-cell">Category</th>
                        <th className="p-4 text-center">Stock</th>
                        <th className="p-4">Price</th>
                        <th className="p-4 text-right pr-6">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {loading ? (
                       <tr><td colSpan="5" className="p-10 text-center"><Loader2 className="animate-spin mx-auto text-gray-400"/></td></tr>
                    ) : filteredProducts.length === 0 ? (
                       <tr><td colSpan="5" className="p-10 text-center text-gray-400">No products found.</td></tr>
                    ) : (
                        filteredProducts.map(p => (
                            <tr key={p.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="p-4 pl-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-16 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                                            <img src={p.featuredImageUrl} className="w-full h-full object-cover" alt="" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 line-clamp-1">{p.name}</p>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-wide">SKU: {p.sku || '-'}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-600 hidden md:table-cell">
                                    <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">{p.category || p.subCategory}</span>
                                </td>
                                <td className="p-4 text-center">
                                    <span className={`font-bold text-xs px-2.5 py-1 rounded-full ${p.stock < 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
                                       {p.stock}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-900 font-medium">₹{p.price.toLocaleString()}</td>
                                <td className="p-4 pr-6 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openDrawer(p)} className="text-gray-500 hover:text-[#B08D55] p-2 hover:bg-[#B08D55]/10 rounded-lg transition-colors" title="Edit">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(p.id)} className="text-gray-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
      </div>

      {/* Drawer Form */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
              onClick={closeDrawer}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[70] w-full max-w-lg bg-white shadow-2xl flex flex-col"
            >
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
                <h3 className="font-serif text-xl text-gray-900 font-bold">
                  {editMode ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button onClick={closeDrawer} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-gray-50/50">
                <form id="product-form" onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* --- DRAG & DROP IMAGE UPLOAD --- */}
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <label className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Product Images (Drag to Reorder)</label>
                    
                    <DndContext 
                      sensors={sensors} 
                      collisionDetection={closestCenter} 
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext 
                        items={combinedImages}
                        strategy={rectSortingStrategy}
                      >
                        <div className="grid grid-cols-4 gap-3">
                          {combinedImages.map((item) => (
                            <SortableImage 
                              key={item.id}
                              id={item.id}
                              url={item.url}
                              isNew={item.type === 'new'}
                              onDelete={() => handleDeleteImage(item.id)}
                            />
                          ))}
                          
                          <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#B08D55] hover:bg-[#B08D55]/5 transition-all group bg-gray-50">
                              <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageSelect} />
                              <UploadCloud className="text-gray-400 group-hover:text-[#B08D55] mb-1" size={20} />
                              <span className="text-[9px] font-bold text-gray-400 uppercase">Upload</span>
                          </label>
                        </div>
                      </SortableContext>
                    </DndContext>
                    <p className="text-[10px] text-gray-400 mt-2">The first image will be the main product image.</p>
                  </div>

                  {/* Basic Details */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b pb-2">Basic Info</h4>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Product Name</label>
                            <input required name="name" className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:border-[#B08D55] outline-none bg-white" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Royal Red Banarasi" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">SKU</label>
                            <input name="sku" className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:border-[#B08D55] outline-none bg-white" value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} placeholder="Auto" />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Price (₹)</label>
                            <input required name="price" type="number" className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:border-[#B08D55] outline-none bg-white" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">MRP (Optional)</label>
                            <input name="comparePrice" type="number" className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:border-[#B08D55] outline-none bg-white" value={formData.comparePrice} onChange={e => setFormData({...formData, comparePrice: e.target.value})} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Category</label>
                        <div className="relative">
                            <select 
                                name="category" 
                                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm appearance-none bg-white focus:border-[#B08D55] outline-none" 
                                value={formData.category} 
                                onChange={e => setFormData({...formData, category: e.target.value})}
                            >
                                <option value="">Select Category</option>
                                {categories.length > 0 ? (
                                    categories.map(cat => <option key={cat} value={cat}>{cat}</option>)
                                ) : (
                                    <>
                                      <option value="Saree">Saree</option>
                                      <option value="Lehenga">Lehenga</option>
                                      <option value="Suit">Suit</option>
                                      <option value="Dupatta">Dupatta</option>
                                    </>
                                )}
                            </select>
                            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" size={14} />
                        </div>
                      </div>
                      <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Stock</label>
                          <input required name="stock" type="number" className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:border-[#B08D55] outline-none bg-white" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                      </div>
                    </div>
                  </div>

                  {/* PRODUCT SPECIFICATIONS SECTION */}
                  <div className="bg-gray-100/50 p-4 rounded-xl border border-gray-200 space-y-4">
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2">Product Specifications</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Technique</label>
                            <input name="technique" className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:border-[#B08D55] outline-none bg-white" value={formData.technique} onChange={e => setFormData({...formData, technique: e.target.value})} placeholder="e.g. Kadhua Handloom" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Fabric Base</label>
                            <input name="fabric" className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:border-[#B08D55] outline-none bg-white" value={formData.fabric} onChange={e => setFormData({...formData, fabric: e.target.value})} placeholder="e.g. Katan Silk" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Warp Material</label>
                            <input name="warpMaterial" className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:border-[#B08D55] outline-none bg-white" value={formData.warpMaterial} onChange={e => setFormData({...formData, warpMaterial: e.target.value})} placeholder="e.g. Pure Silk" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Weft Material</label>
                            <input name="weftMaterial" className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:border-[#B08D55] outline-none bg-white" value={formData.weftMaterial} onChange={e => setFormData({...formData, weftMaterial: e.target.value})} placeholder="e.g. Pure Silk" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Zari Type</label>
                            <input name="zariType" className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:border-[#B08D55] outline-none bg-white" value={formData.zariType} onChange={e => setFormData({...formData, zariType: e.target.value})} placeholder="e.g. Gold Zari" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Origin</label>
                            <input name="origin" className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:border-[#B08D55] outline-none bg-white" value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Weight</label>
                            <input name="weight" className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:border-[#B08D55] outline-none bg-white" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} placeholder="e.g. 750 gms" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Dimensions</label>
                            <input name="dimensions" className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:border-[#B08D55] outline-none bg-white" value={formData.dimensions} onChange={e => setFormData({...formData, dimensions: e.target.value})} placeholder="e.g. 6.5 meters" />
                        </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Full Description</label>
                    <textarea name="description" className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm focus:border-[#B08D55] outline-none bg-white min-h-[120px]" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Detailed description of the weave, fabric, and care instructions..." />
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-gray-100 bg-white">
                <button form="product-form" disabled={processing} className="w-full bg-[#1A1A1A] text-white py-4 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-black transition-all flex justify-center items-center gap-2 shadow-lg disabled:opacity-70">
                    {processing ? <Loader2 className="animate-spin" size={18} /> : <>{editMode ? <Save size={18} /> : <Plus size={18} />} {editMode ? 'Update Product' : 'Create Product'}</>}
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};