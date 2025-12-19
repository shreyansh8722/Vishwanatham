import React, { useState } from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Search, Package, AlertCircle, Check } from 'lucide-react';

const OrderTimeline = ({ status }) => {
  const steps = ['Pending', 'Shipped', 'Delivered'];
  const currentStep = steps.indexOf(status);
  
  if (status === 'Cancelled') return <div className="text-red-500 font-bold text-center mt-6 bg-red-50 p-3 rounded">This order has been cancelled.</div>;

  return (
    <div className="mt-8 relative">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2"></div>
      <div className="absolute top-1/2 left-0 h-1 bg-green-500 -z-10 -translate-y-1/2 transition-all duration-700" style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}></div>
      <div className="flex justify-between">
        {steps.map((step, idx) => {
          const isCompleted = idx <= currentStep;
          return (
            <div key={step} className="flex flex-col items-center bg-white px-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 text-gray-300'}`}>
                {isCompleted ? <Check size={16} /> : idx + 1}
              </div>
              <span className={`text-xs font-bold uppercase mt-2 ${isCompleted ? 'text-green-600' : 'text-gray-400'}`}>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderId) return;
    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const docRef = doc(db, 'orders', orderId.trim());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setOrder({ id: docSnap.id, ...docSnap.data() });
      } else {
        setError("Order ID not found. Please check your email for the correct ID.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-lg">
           <div className="text-center mb-8">
              <h1 className="font-serif text-3xl text-gray-900 mb-2">Track Your Order</h1>
              <p className="text-gray-500">Enter your Order ID to see real-time status.</p>
           </div>

           <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <form onSubmit={handleTrack} className="flex gap-2 mb-6">
                 <input 
                   placeholder="e.g. 172345..." 
                   className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#B08D55] focus:ring-1 focus:ring-[#B08D55]"
                   value={orderId}
                   onChange={e => setOrderId(e.target.value)}
                 />
                 <button type="submit" disabled={loading} className="bg-[#1A1A1A] text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-black transition-all">
                    {loading ? '...' : 'Track'}
                 </button>
              </form>

              {error && (
                <div className="flex items-center gap-3 bg-red-50 text-red-600 p-4 rounded-lg text-sm">
                   <AlertCircle size={20} /> {error}
                </div>
              )}

              {order && (
                <div className="animate-in fade-in slide-in-from-bottom-4">
                   <div className="border-b border-gray-100 pb-4 mb-4">
                      <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Status</p>
                      <h2 className="text-2xl font-bold text-[#B08D55]">{order.status}</h2>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4 mb-6">
                      <div><p className="text-xs text-gray-400">Order Date</p><p className="text-sm font-medium">{new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</p></div>
                      <div><p className="text-xs text-gray-400">Total Amount</p><p className="text-sm font-medium">₹{order.totalAmount}</p></div>
                   </div>

                   <OrderTimeline status={order.status} />

                   {order.tracking && order.status === 'Shipped' && (
                     <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <p className="text-xs font-bold text-blue-500 uppercase mb-2">Shipment Details</p>
                        <p className="text-sm text-blue-900 font-medium">{order.tracking.courier}</p>
                        <p className="text-sm text-blue-900">AWB: <span className="font-mono font-bold">{order.tracking.trackingId}</span></p>
                     </div>
                   )}
                </div>
              )}
           </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}