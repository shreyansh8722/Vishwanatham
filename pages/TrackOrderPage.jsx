import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState(null); // 'processing', 'shipped', 'delivered'

  const handleTrack = (e) => {
    e.preventDefault();
    // Simulate tracking logic
    setTimeout(() => setStatus('shipped'), 1000);
  };

  return (
    <div className="bg-heritage-paper min-h-screen pt-24 pb-20">
      <SEO title="Track Order" />
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="font-cormorant text-4xl text-heritage-charcoal text-center mb-2">Track Your Blessing</h1>
        <p className="text-center text-heritage-grey text-sm font-montserrat mb-12">Enter your Order ID to see the status of your sacred package.</p>

        <form onSubmit={handleTrack} className="flex gap-4 mb-16 max-w-md mx-auto">
          <input 
            type="text" 
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Order ID (e.g. VISH-1234)" 
            className="flex-1 p-4 border border-heritage-border bg-white focus:outline-none focus:border-heritage-gold text-heritage-charcoal uppercase tracking-wider text-sm"
            required
          />
          <button className="bg-heritage-gold text-white px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-heritage-clay transition-colors">
            Track
          </button>
        </form>

        {status && (
          <div className="bg-white p-10 rounded-sm shadow-sm border border-heritage-border animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-heritage-mist pb-6">
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-heritage-grey">Order Status</span>
                <span className="font-cormorant text-2xl text-heritage-charcoal">In Transit</span>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <span className="block text-[10px] uppercase tracking-widest text-heritage-grey">Estimated Delivery</span>
                <span className="font-montserrat text-sm font-bold text-heritage-gold">Dec 24, 2025</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
              {/* Line (Desktop) */}
              <div className="absolute top-5 left-0 w-full h-[2px] bg-heritage-mist hidden md:block -z-10"></div>
              
              {/* Steps */}
              {[
                { label: "Order Placed", icon: Clock, active: true },
                { label: "Dispatched", icon: Package, active: true },
                { label: "In Transit", icon: Truck, active: true, current: true },
                { label: "Delivered", icon: CheckCircle, active: false }
              ].map((step, idx) => (
                <div key={idx} className={`flex md:flex-col items-center gap-4 md:gap-2 bg-white md:bg-transparent pr-4 md:pr-0 ${step.active ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step.current ? 'border-heritage-gold bg-heritage-paper text-heritage-gold' : step.active ? 'bg-heritage-gold border-heritage-gold text-white' : 'border-heritage-border bg-white text-heritage-grey'}`}>
                    <step.icon size={16} />
                  </div>
                  <span className="text-xs uppercase tracking-wider font-bold text-heritage-charcoal">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrderPage;