import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { Plus, Trash2, Package, ShoppingBag, LayoutDashboard, Loader2, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'add', 'orders'
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // --- FORM STATE ---
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: 'Rudraksha',
    description: '',
    image: '', // URL input for simplicity
    rating: '5.0'
  });

  // --- FETCH DATA ---
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Products
      const prodData = await getDocs(collection(db, "products"));
      setProducts(prodData.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // Fetch Orders (Mocking collection if empty)
      const orderRef = collection(db, "orders");
      const orderData = await getDocs(query(orderRef, orderBy('date', 'desc')));
      setOrders(orderData.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- HANDLERS ---
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "products"), {
        ...newProduct,
        price: Number(newProduct.price),
        originalPrice: Number(newProduct.originalPrice),
        images: [newProduct.image], // Wrapping in array to match structure
        createdAt: new Date()
      });
      alert("Product Added Successfully!");
      setNewProduct({ name: '', price: '', originalPrice: '', category: 'Rudraksha', description: '', image: '', rating: '5.0' });
      fetchData(); // Refresh list
      setActiveTab('products');
    } catch (error) {
      alert("Error adding product: " + error.message);
    }
    setLoading(false);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, "products", id));
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-heritage-paper flex font-manrope">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-heritage-rudraksha text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="font-cinzel text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-bold transition-all ${activeTab === 'products' ? 'bg-white text-heritage-rudraksha' : 'text-white/80 hover:bg-white/10'}`}
          >
            <Package size={18} /> All Products
          </button>
          <button 
            onClick={() => setActiveTab('add')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-bold transition-all ${activeTab === 'add' ? 'bg-white text-heritage-rudraksha' : 'text-white/80 hover:bg-white/10'}`}
          >
            <Plus size={18} /> Add New Product
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-bold transition-all ${activeTab === 'orders' ? 'bg-white text-heritage-rudraksha' : 'text-white/80 hover:bg-white/10'}`}
          >
            <ShoppingBag size={18} /> Orders
          </button>
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-cinzel text-3xl font-bold text-heritage-charcoal">Dashboard</h1>
          <button onClick={fetchData} className="p-2 bg-white border border-heritage-mist rounded hover:bg-heritage-sand">
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* --- VIEW: ALL PRODUCTS --- */}
        {activeTab === 'products' && (
          <div className="bg-white border border-heritage-mist rounded-lg overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-heritage-sand text-heritage-charcoal font-cinzel text-sm border-b border-heritage-mist">
                <tr>
                  <th className="p-4">Image</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Category</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-heritage-mist">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-heritage-paper/50">
                    <td className="p-4">
                      <img src={product.images?.[0] || product.image} alt="" className="w-10 h-10 rounded object-cover border border-heritage-mist" />
                    </td>
                    <td className="p-4 font-bold text-heritage-charcoal text-sm">{product.name}</td>
                    <td className="p-4 text-sm">₹{product.price}</td>
                    <td className="p-4 text-sm text-heritage-grey">{product.category}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && !loading && (
              <div className="p-8 text-center text-heritage-grey">No products found. Add some!</div>
            )}
          </div>
        )}

        {/* --- VIEW: ADD PRODUCT --- */}
        {activeTab === 'add' && (
          <div className="max-w-2xl bg-white border border-heritage-mist rounded-lg p-8 shadow-sm">
            <h2 className="font-cinzel text-xl font-bold text-heritage-charcoal mb-6">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-heritage-grey mb-1">Product Name</label>
                <input 
                  type="text" required
                  value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full border border-heritage-mist rounded p-3 text-sm focus:border-heritage-rudraksha outline-none"
                  placeholder="e.g. 5 Mukhi Rudraksha"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-heritage-grey mb-1">Price (₹)</label>
                  <input 
                    type="number" required
                    value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                    className="w-full border border-heritage-mist rounded p-3 text-sm focus:border-heritage-rudraksha outline-none"
                    placeholder="1200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-heritage-grey mb-1">Original Price (₹)</label>
                  <input 
                    type="number" 
                    value={newProduct.originalPrice} onChange={e => setNewProduct({...newProduct, originalPrice: e.target.value})}
                    className="w-full border border-heritage-mist rounded p-3 text-sm focus:border-heritage-rudraksha outline-none"
                    placeholder="2500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-heritage-grey mb-1">Category</label>
                <select 
                  value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full border border-heritage-mist rounded p-3 text-sm focus:border-heritage-rudraksha outline-none"
                >
                  <option value="Rudraksha">Rudraksha</option>
                  <option value="Gemstones">Gemstones</option>
                  <option value="Yantras">Yantras</option>
                  <option value="Malas">Malas</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-heritage-grey mb-1">Image URL</label>
                <input 
                  type="text" required
                  value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                  className="w-full border border-heritage-mist rounded p-3 text-sm focus:border-heritage-rudraksha outline-none"
                  placeholder="https://images.unsplash.com/..."
                />
                <p className="text-xs text-heritage-grey mt-1">Paste a link from Unsplash or your uploaded images.</p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-heritage-grey mb-1">Description</label>
                <textarea 
                  rows="4" required
                  value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full border border-heritage-mist rounded p-3 text-sm focus:border-heritage-rudraksha outline-none"
                  placeholder="Product details..."
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-heritage-rudraksha text-white py-3 rounded font-bold hover:bg-heritage-saffron transition-colors flex justify-center"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Add Product to Live DB"}
              </button>
            </form>
          </div>
        )}

        {/* --- VIEW: ORDERS --- */}
        {activeTab === 'orders' && (
          <div className="bg-white border border-heritage-mist rounded-lg p-8 text-center">
            {orders.length === 0 ? (
              <div className="text-heritage-grey">
                <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                <h3 className="font-bold text-lg">No Orders Yet</h3>
                <p>Orders placed on the Checkout page will appear here.</p>
              </div>
            ) : (
              <div className="text-left space-y-4">
                 {/* Logic to map orders would go here once we connect Checkout to Firebase */}
                 <p>Orders loaded.</p>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminPage;