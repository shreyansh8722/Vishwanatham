import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { 
  collection, query, orderBy, limit, getDocs, 
  updateDoc, doc, serverTimestamp, getDoc 
} from 'firebase/firestore';
import { Truck, CheckCircle, XCircle, Search, Eye, X, Loader2, Printer } from 'lucide-react'; // Added Printer
import { motion, AnimatePresence } from 'framer-motion';
import { printInvoice } from '@/lib/invoice'; // Import Invoice Generator

export const OrderManager = ({ notify }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [shippingModal, setShippingModal] = useState({ open: false, orderId: null });
  const [trackingInfo, setTrackingInfo] = useState({ courier: '', trackingId: '', url: '' });

  useEffect(() => {
    fetchOrders();
  }, [searchQuery]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      if (searchQuery.trim().length > 5) {
         const docRef = doc(db, 'orders', searchQuery.trim());
         const docSnap = await getDoc(docRef);
         if (docSnap.exists()) {
             setOrders([{ id: docSnap.id, ...docSnap.data() }]);
         } else {
             setOrders([]);
         }
      } else {
         const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(20));
         const snap = await getDocs(q);
         setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      }
    } catch (err) {
      console.error(err);
      notify("Error fetching orders", "error");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, 'orders', id), { status });
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
      notify(`Order marked as ${status}`);
      if (selectedOrder?.id === id) setSelectedOrder(prev => ({ ...prev, status }));
    } catch (e) {
      notify("Update failed", "error");
    }
  };

  const handleShipOrder = async (e) => {
    e.preventDefault();
    if (!shippingModal.orderId) return;

    try {
      await updateDoc(doc(db, 'orders', shippingModal.orderId), {
        status: 'Shipped',
        tracking: trackingInfo,
        shippedAt: serverTimestamp()
      });

      setOrders(prev => prev.map(o => o.id === shippingModal.orderId ? { 
          ...o, status: 'Shipped', tracking: trackingInfo 
      } : o));

      setShippingModal({ open: false, orderId: null });
      notify("Order Shipped!");
    } catch (e) {
      notify("Failed to update shipping", "error");
    }
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Shipped: 'bg-blue-100 text-blue-800 border-blue-200',
      Delivered: 'bg-green-100 text-green-800 border-green-200',
      Cancelled: 'bg-red-50 text-red-800 border-red-100'
    };
    return <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${styles[status] || 'bg-gray-100'}`}>{status}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
                type="text" 
                placeholder="Search Order ID..." 
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#B08D55] outline-none transition-all"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />
        </div>
        <div className="flex gap-2">
           <div className="text-xs font-medium text-gray-500 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
              {orders.length} Recent Orders
           </div>
        </div>
      </div>

      {/* Table View */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
               <thead className="bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider border-b border-gray-100">
                  <tr>
                     <th className="p-4 pl-6">Order ID</th>
                     <th className="p-4">Customer</th>
                     <th className="p-4">Date</th>
                     <th className="p-4">Status</th>
                     <th className="p-4 text-right">Amount</th>
                     <th className="p-4 text-center">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {loading ? (
                     <tr><td colSpan="6" className="p-10 text-center"><Loader2 className="animate-spin mx-auto text-gray-400"/></td></tr>
                  ) : orders.map(order => (
                     <tr key={order.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="p-4 pl-6 font-mono text-xs text-gray-500">#{order.id.slice(0,8)}</td>
                        <td className="p-4">
                           <p className="font-bold text-gray-900">{order.shippingDetails?.firstName} {order.shippingDetails?.lastName}</p>
                           <p className="text-xs text-gray-400">{order.shippingDetails?.city}</p>
                        </td>
                        <td className="p-4 text-gray-500 text-xs">
                           {order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : '-'}
                        </td>
                        <td className="p-4"><StatusBadge status={order.status} /></td>
                        <td className="p-4 text-right font-medium">₹{order.totalAmount?.toLocaleString()}</td>
                        <td className="p-4 text-center">
                           <div className="flex items-center justify-center gap-2">
                               {/* INVOICE BUTTON */}
                               <button 
                                 onClick={() => printInvoice(order)} 
                                 className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" 
                                 title="Print Invoice"
                               >
                                  <Printer size={18} />
                               </button>

                               {/* DETAILS BUTTON */}
                               <button onClick={() => setSelectedOrder(order)} className="p-2 text-gray-400 hover:text-[#B08D55] hover:bg-[#B08D55]/10 rounded-lg transition-colors">
                                  <Eye size={18} />
                               </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
           <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
              <motion.div initial={{scale:0.95}} animate={{scale:1}} exit={{scale:0.95}} className="bg-white w-full max-w-2xl rounded-xl shadow-2xl relative z-10 overflow-hidden max-h-[90vh] flex flex-col">
                 
                 {/* Modal Header */}
                 <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
                    <div>
                       <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-serif text-xl font-bold">Order #{selectedOrder.id.slice(0,8)}</h3>
                          <StatusBadge status={selectedOrder.status} />
                       </div>
                       <p className="text-xs text-gray-500">{new Date(selectedOrder.createdAt?.seconds * 1000).toLocaleString()}</p>
                    </div>
                    <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-white rounded-full"><X size={20}/></button>
                 </div>

                 {/* Modal Body */}
                 <div className="p-6 overflow-y-auto space-y-6">
                    {/* Items */}
                    <div className="space-y-3">
                       {selectedOrder.items?.map((item, i) => (
                          <div key={i} className="flex gap-4 p-3 border border-gray-100 rounded-lg bg-gray-50/50">
                             <img src={item.image} className="w-16 h-20 object-cover rounded bg-white" />
                             <div className="flex-1">
                                <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                                <p className="text-xs text-gray-500">Qty: {item.quantity} | Size: Free</p>
                                <div className="mt-2 flex gap-2">
                                   {item.selectedOptions?.fallPico && <span className="text-[10px] bg-white border px-1 rounded">Fall/Pico</span>}
                                   {item.selectedOptions?.blouseStitching && <span className="text-[10px] bg-white border px-1 rounded">Stitching</span>}
                                </div>
                             </div>
                             <p className="font-bold text-sm">₹{item.price}</p>
                          </div>
                       ))}
                    </div>

                    {/* Customer & Shipping */}
                    <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
                       <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Customer</p>
                          <p className="text-sm font-bold">{selectedOrder.shippingDetails?.firstName} {selectedOrder.shippingDetails?.lastName}</p>
                          <p className="text-sm text-gray-600">{selectedOrder.shippingDetails?.email}</p>
                          <p className="text-sm text-gray-600">{selectedOrder.shippingDetails?.phone}</p>
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Shipping Address</p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                             {selectedOrder.shippingDetails?.address}, {selectedOrder.shippingDetails?.city}<br/>
                             {selectedOrder.shippingDetails?.state} - {selectedOrder.shippingDetails?.pincode}
                          </p>
                       </div>
                    </div>
                 </div>

                 {/* Modal Footer (Actions) */}
                 <div className="p-6 border-t border-gray-100 bg-white flex justify-end gap-3">
                    {selectedOrder.status === 'Pending' && (
                       <button onClick={() => { setShippingModal({ open: true, orderId: selectedOrder.id }); setSelectedOrder(null); }} className="bg-gray-900 text-white px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                          <Truck size={16} /> Ship Order
                       </button>
                    )}
                    {selectedOrder.status === 'Shipped' && (
                       <button onClick={() => updateStatus(selectedOrder.id, 'Delivered')} className="bg-green-600 text-white px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                          <CheckCircle size={16} /> Mark Delivered
                       </button>
                    )}
                    {selectedOrder.status !== 'Cancelled' && (
                       <button onClick={() => updateStatus(selectedOrder.id, 'Cancelled')} className="border border-red-200 text-red-600 px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-red-50">
                          Cancel Order
                       </button>
                    )}
                 </div>

              </motion.div>
           </div>
        )}
      </AnimatePresence>
      
      {/* Shipping Modal */}
      <AnimatePresence>
        {shippingModal.open && (
           <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShippingModal({open:false, orderId:null})} />
              <motion.div initial={{scale:0.9}} animate={{scale:1}} className="bg-white w-full max-w-sm p-6 rounded-xl relative z-10 shadow-2xl">
                 <h3 className="text-lg font-bold mb-4">Shipping Details</h3>
                 <div className="space-y-3">
                    <input className="w-full border p-2 rounded text-sm" placeholder="Courier Name" value={trackingInfo.courier} onChange={e => setTrackingInfo({...trackingInfo, courier: e.target.value})} />
                    <input className="w-full border p-2 rounded text-sm" placeholder="Tracking ID" value={trackingInfo.trackingId} onChange={e => setTrackingInfo({...trackingInfo, trackingId: e.target.value})} />
                    <button onClick={handleShipOrder} className="w-full bg-[#B08D55] text-white py-3 rounded font-bold uppercase text-xs mt-2">Confirm</button>
                 </div>
              </motion.div>
           </div>
        )}
      </AnimatePresence>
    </div>
  );
};