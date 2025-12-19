import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { 
  collection, addDoc, deleteDoc, doc, onSnapshot, 
  query, orderBy, serverTimestamp 
} from 'firebase/firestore';
import { Ticket, Trash2, Plus, Loader2, Tag, Calendar } from 'lucide-react';

export const CouponManager = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    type: 'percent', // 'percent' or 'fixed'
    value: '',
    minOrder: '',
    description: ''
  });

  useEffect(() => {
    const q = query(collection(db, 'coupons'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setCoupons(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      await addDoc(collection(db, 'coupons'), {
        code: formData.code.toUpperCase().trim(),
        type: formData.type,
        value: Number(formData.value),
        minOrder: Number(formData.minOrder) || 0,
        description: formData.description,
        createdAt: serverTimestamp(),
        isActive: true
      });
      setFormData({ code: '', type: 'percent', value: '', minOrder: '', description: '' });
    } catch (error) {
      console.error("Error creating coupon:", error);
      alert("Failed to create coupon");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this coupon?")) {
      await deleteDoc(doc(db, 'coupons', id));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Section */}
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-6">
          <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">
            <Plus size={20} className="text-[#B08D55]" /> Create Coupon
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Coupon Code</label>
              <input 
                required 
                value={formData.code}
                onChange={e => setFormData({...formData, code: e.target.value})}
                placeholder="e.g. SUMMER20" 
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm uppercase focus:border-[#B08D55] outline-none font-bold tracking-wider"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Type</label>
                <select 
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none bg-white"
                >
                  <option value="percent">Percentage (%)</option>
                  <option value="fixed">Flat Amount (₹)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Value</label>
                <input 
                  required 
                  type="number"
                  value={formData.value}
                  onChange={e => setFormData({...formData, value: e.target.value})}
                  placeholder={formData.type === 'percent' ? "20" : "500"} 
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Min Order Amount (₹)</label>
              <input 
                type="number"
                value={formData.minOrder}
                onChange={e => setFormData({...formData, minOrder: e.target.value})}
                placeholder="0" 
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Description</label>
              <input 
                required 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="e.g. 20% off on Summer Collection" 
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none"
              />
            </div>

            <button 
              disabled={isCreating}
              className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors flex justify-center items-center gap-2"
            >
              {isCreating ? <Loader2 className="animate-spin" /> : 'Create Coupon'}
            </button>
          </form>
        </div>
      </div>

      {/* List Section */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
              <Ticket size={20} className="text-[#B08D55]" /> Active Coupons
            </h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            {loading ? (
              <div className="p-10 text-center text-gray-400">Loading coupons...</div>
            ) : coupons.length === 0 ? (
              <div className="p-10 text-center text-gray-400">No active coupons found.</div>
            ) : (
              coupons.map(coupon => (
                <div key={coupon.id} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#B08D55]/10 rounded-lg flex items-center justify-center text-[#B08D55]">
                      <Tag size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 tracking-wider text-sm">{coupon.code}</h4>
                      <p className="text-xs text-gray-500">{coupon.description}</p>
                      <div className="flex gap-3 mt-1.5">
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold uppercase">
                          {coupon.type === 'percent' ? `${coupon.value}% OFF` : `₹${coupon.value} FLAT`}
                        </span>
                        {coupon.minOrder > 0 && (
                          <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">
                            Min: ₹{coupon.minOrder}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleDelete(coupon.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};