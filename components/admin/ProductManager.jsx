import React, { useState, useEffect } from 'react';
import { db, storage } from '@/lib/firebase';
import { 
  collection, addDoc, deleteDoc, doc, updateDoc, 
  serverTimestamp, onSnapshot, query, orderBy, getDocs 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { 
  Trash2, Plus, Loader2, X, Edit2, Save, Search, 
  UploadCloud 
} from 'lucide-react';
import { compressImage } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// --- DND-KIT (Drag & Drop) ---
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, 
  useSensor, useSensors,
} from '@dnd-kit/core';
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, 
  useSortable, rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// --- SORTABLE IMAGE COMPONENT ---
const SortableImage = ({ id, url, isNew, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative aspect-square bg-white rounded-lg border border-gray-200 overflow-hidden group cursor-grab active:cursor-grabbing hover:border-[#B08D55] transition-all shadow-sm">
      <img src={url} className={`w-full h-full object-cover ${isNew ? 'opacity-90' : ''}`} alt="thumbnail" />
      {isNew && <span className="absolute bottom-1 left-1 text-[8px] bg-green-500 text-white px-1 rounded">WEBP</span>}
      <button 
        type="button" 
        onPointerDown={(e) => e.stopPropagation()} 
        onClick={onDelete} 
        className="absolute top-1 right-1 bg-white/90 text-red-500 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
};

export const ProductManager = () => { 
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  
  // Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Form & Image State
  const [combinedImages, setCombinedImages] = useState([]);
  
  // --- SPIRITUAL STORE INITIAL STATE ---
  const initialState = {
    name: '', sku: '', price: '', comparePrice: '', 
    category: 'Rudraksha', description: '', stock: '',
    
    // Spiritual Attributes
    mukhi: '', origin: 'Nepal', certification: '',
    deity: '', planet: '', chakra: '', 
    weight: '', beadSize: '', mantra: '',
  };
  const [formData, setFormData] = useState(initialState);

  const categories = ["Rudraksha", "Gemstones", "Yantras", "Malas", "Bracelets", "Idols", "Puja Samagri"];

  // Sensors for Drag & Drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // --- 1. FETCH DATA ---
  useEffect(() => {
    setLoading(true);
    const qProd = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubProd = onSnapshot(qProd, (snapshot) => {
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setProducts(list);
      setFilteredProducts(list);
      setLoading(false);
    });
    return () => unsubProd();
  }, []);

  // --- 2. SEARCH FILTER ---
  useEffect(() => {
    if (!searchQuery) {
      setFilteredProducts(products);
    } else {
      const lower = searchQuery.toLowerCase();
      setFilteredProducts(products.filter(p => 
        p.name?.toLowerCase().includes(lower) || 
        p.sku?.toLowerCase().includes(lower) ||
        p.category?.toLowerCase().includes(lower)
      ));
    }
  }, [searchQuery, products]);

  // --- 3. HANDLERS ---
  const handleImageSelect = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file, i) => ({
        id: `new-${Date.now()}-${i}`, 
        type: 'new', 
        url: URL.createObjectURL(file), 
        file: file
      }));
      setCombinedImages(prev => [...prev, ...newFiles]);
    }
  };

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

  const openDrawer = (product = null) => {
    if (product) {
      setEditMode(true);
      setEditId(product.id);
      setFormData({
        name: product.name, sku: product.sku || '', price: product.price, comparePrice: product.comparePrice || '',
        category: product.category, description: product.fullDescription || '', stock: product.stock || 0,
        mukhi: product.mukhi || '', origin: product.origin || '', certification: product.certification || '',
        deity: product.deity || '', planet: product.planet || '', chakra: product.chakra || '',
        weight: product.weight || '', beadSize: product.beadSize || '', mantra: product.mantra || '',
      });
      setCombinedImages((product.imageUrls || []).map((url, i) => ({ id: `exist-${i}`, type: 'existing', url, file: null })));
    } else {
      setEditMode(false);
      setEditId(null);
      setFormData(initialState);
      setCombinedImages([]);
    }
    setIsDrawerOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (combinedImages.length === 0) return alert("Please upload at least one image.");
    
    setProcessing(true);
    setUploadProgress('Processing Images...');
    
    try {
      const imageUrls = await Promise.all(combinedImages.map(async (item) => {
        if (item.type === 'existing') return item.url;
        // Compress Image
        const compressedFile = await compressImage(item.file); 
        const refName = `products/${Date.now()}_${item.id}.webp`;
        const sRef = ref(storage, refName);
        await uploadBytes(sRef, compressedFile);
        return await getDownloadURL(sRef);
      }));

      const payload = {
        ...formData,
        price: Number(formData.price),
        comparePrice: Number(formData.comparePrice) || 0,
        stock: Number(formData.stock) || 0,
        tags_lowercase: [formData.category, formData.name, formData.deity, formData.mukhi].map(s => s?.toLowerCase()).filter(Boolean),
        featuredImageUrl: imageUrls[0],
        imageUrls: imageUrls,
        fullDescription: formData.description,
        updatedAt: serverTimestamp()
      };

      if (editMode) {
        await updateDoc(doc(db, 'products', editId), payload);
      } else {
        await addDoc(collection(db, 'products'), { ...payload, createdAt: serverTimestamp() });
      }
      setIsDrawerOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    } finally {
      setProcessing(false);
      setUploadProgress('');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure? This action is irreversible.")) await deleteDoc(doc(db, 'products', id));
  };

  return (
    <div className="h-full flex flex-col animate-fade-in">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Search Rudraksha, Yantras..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-[#B08D55] outline-none shadow-sm" />
        </div>
        <button onClick={() => openDrawer()} className="bg-[#B08D55] text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#967645] transition-colors shadow-md"><Plus size={18} /> Add Item</button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-medium">
              <tr>
                <th className="p-4 pl-6 w-20">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Origin/Deity</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="7" className="p-10 text-center"><Loader2 className="animate-spin mx-auto text-gray-400"/></td></tr>
              ) : filteredProducts.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 group transition-colors">
                  <td className="p-4 pl-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-md border border-gray-200 overflow-hidden">
                      <img src={p.featuredImageUrl} className="w-full h-full object-cover" alt="" />
                    </div>
                  </td>
                  <td className="p-4 font-medium text-gray-900">{p.name}<div className="text-xs text-gray-400 font-mono mt-0.5">{p.sku}</div></td>
                  <td className="p-4 text-gray-600"><span className="bg-[#B08D55]/10 text-[#B08D55] px-2 py-1 rounded text-xs font-bold">{p.category}</span></td>
                  <td className="p-4 text-xs text-gray-500">{p.origin || '-'}{p.deity ? ` • ${p.deity}` : ''}</td>
                  <td className="p-4"><span className={`text-xs font-bold px-2 py-1 rounded ${p.stock < 5 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>{p.stock}</span></td>
                  <td className="p-4 font-medium">₹{p.price}</td>
                  <td className="p-4 pr-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openDrawer(p)} className="p-2 text-gray-500 hover:text-[#B08D55] hover:bg-[#B08D55]/10 rounded"><Edit2 size={16}/></button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer - Z-INDEX 100 FIXED */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" onClick={() => setIsDrawerOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed inset-y-0 right-0 z-[110] w-full max-w-2xl bg-white shadow-2xl flex flex-col">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-white z-10">
                <h3 className="font-bold text-lg text-gray-900 font-serif">{editMode ? 'Edit Spiritual Item' : 'New Divine Item'}</h3>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><X size={20}/></button>
              </div>

              <div className="flex-1 overflow-y-auto bg-gray-50 p-6 space-y-6">
                <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Basic Info */}
                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-4">
                    <h4 className="font-bold text-sm text-gray-900 uppercase tracking-wide border-b pb-2 mb-2">Item Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Product Name</label>
                        <input required className="w-full p-2.5 bg-white border border-gray-300 rounded text-sm focus:border-[#B08D55] outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">SKU Code</label>
                        <input className="w-full p-2.5 bg-white border border-gray-300 rounded text-sm focus:border-[#B08D55] outline-none" value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                        <select className="w-full p-2.5 bg-white border border-gray-300 rounded text-sm focus:border-[#B08D55] outline-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>{categories.map(c => <option key={c} value={c}>{c}</option>)}</select>
                      </div>
                    </div>
                    <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description & Significance</label><textarea rows="4" className="w-full p-2.5 bg-white border border-gray-300 rounded text-sm focus:border-[#B08D55] outline-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
                  </div>

                  {/* Media */}
                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-4">
                    <h4 className="font-bold text-sm text-gray-900 uppercase tracking-wide border-b pb-2 mb-2">Images (Auto-Compressed)</h4>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                      <SortableContext items={combinedImages} strategy={rectSortingStrategy}>
                        <div className="grid grid-cols-4 gap-4">
                          {combinedImages.map((item) => <SortableImage key={item.id} id={item.id} url={item.url} isNew={item.type === 'new'} onDelete={() => setCombinedImages(prev => prev.filter(i => i.id !== item.id))} />)}
                          <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#B08D55] hover:bg-[#B08D55]/5 transition-all bg-gray-50">
                            <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageSelect} />
                            <UploadCloud className="text-gray-400 mb-1" size={24} /><span className="text-[10px] uppercase font-bold text-gray-400">Upload</span>
                          </label>
                        </div>
                      </SortableContext>
                    </DndContext>
                  </div>

                  {/* Pricing */}
                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-4">
                    <h4 className="font-bold text-sm text-gray-900 uppercase tracking-wide border-b pb-2 mb-2">Pricing & Inventory</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price (₹)</label><input type="number" required className="w-full p-2.5 border border-gray-300 rounded text-sm focus:border-[#B08D55] outline-none" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} /></div>
                      <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Compare Price</label><input type="number" className="w-full p-2.5 border border-gray-300 rounded text-sm focus:border-[#B08D55] outline-none" value={formData.comparePrice} onChange={e => setFormData({...formData, comparePrice: e.target.value})} /></div>
                      <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Stock Qty</label><input type="number" required className="w-full p-2.5 border border-gray-300 rounded text-sm focus:border-[#B08D55] outline-none" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} /></div>
                    </div>
                  </div>

                  {/* Spiritual Attributes */}
                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-4">
                    <h4 className="font-bold text-sm text-gray-900 uppercase tracking-wide border-b pb-2 mb-2">Spiritual Attributes</h4>
                    <div className="grid grid-cols-2 gap-4">
                        {['mukhi', 'origin', 'deity', 'planet', 'chakra', 'certification', 'weight', 'mantra'].map(field => (
                          <div key={field}>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 capitalize">{field}</label>
                            <input className="w-full p-2.5 border border-gray-300 rounded text-sm focus:border-[#B08D55] outline-none" value={formData[field]} onChange={e => setFormData({...formData, [field]: e.target.value})} />
                          </div>
                        ))}
                    </div>
                  </div>

                </form>
              </div>

              <div className="p-4 border-t border-gray-200 bg-white">
                <button form="product-form" disabled={processing} className="w-full bg-[#B08D55] text-white py-3 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-[#967645] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-70">
                  {processing ? <><Loader2 className="animate-spin" /> {uploadProgress}</> : <><Save size={18} /> {editMode ? 'Update Item' : 'Publish Item'}</>}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};