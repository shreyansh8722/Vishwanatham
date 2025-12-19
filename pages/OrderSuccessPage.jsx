import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { CheckCircle, Package, ArrowRight, Loader2, Home, ShoppingBag } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { formatPrice } from '@/lib/utils'; // Ensure you have this utility or use inline formatter

export default function OrderSuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state?.orderId) {
      navigate('/');
      return;
    }

    const fetchOrder = async () => {
      try {
        const docRef = doc(db, 'orders', state.orderId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setOrder({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [state, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="animate-spin text-[#B08D55]" size={40} />
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans text-brand-dark flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="max-w-3xl w-full bg-white shadow-sm border border-gray-100 rounded-sm overflow-hidden relative">
          
          {/* Top Decoration */}
          <div className="h-2 w-full bg-[#B08D55]" />

          <div className="p-8 md:p-12 text-center">
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }} 
              className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle size={40} className="text-green-600" />
            </motion.div>

            <h1 className="font-serif text-3xl md:text-4xl text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-500 mb-8">Thank you, {order.shippingDetails.firstName}. Your royal attire is being prepared.</p>

            <div className="bg-gray-50 rounded-sm p-6 text-left mb-8 border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Order Number</p>
                  <p className="text-lg font-bold text-gray-900">#{order.id.slice(0, 8).toUpperCase()}</p>
                </div>
                <div>
                   <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Date</p>
                   <p className="text-sm font-medium text-gray-900">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                   <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Total Amount</p>
                   <p className="text-lg font-bold text-[#B08D55]">₹{order.totalAmount.toLocaleString('en-IN')}</p>
                </div>
                <div>
                   <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Payment Method</p>
                   <p className="text-sm font-medium text-gray-900 capitalize">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</p>
                </div>
              </div>

              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <div className="w-12 h-16 bg-gray-200 rounded-sm overflow-hidden flex-shrink-0">
                      <img src={item.image || item.featuredImageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">₹{item.price.toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/profile" className="flex items-center justify-center gap-2 px-8 py-3 bg-white border border-gray-300 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">
                <Package size={16} /> Track Order
              </Link>
              <Link to="/shop" className="flex items-center justify-center gap-2 px-8 py-3 bg-[#B08D55] text-white rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-[#8c6a40] transition-colors shadow-lg">
                Continue Shopping <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}