import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { MapPin, Plus, Check } from 'lucide-react';

export const AddressSelector = ({ selectedAddress, onSelect, onAddNew }) => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const fetchAddresses = async () => {
      try {
        const q = query(collection(db, `users/${user.uid}/addresses`), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        setAddresses(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Failed to load addresses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, [user]);

  if (loading) return <div className="text-xs text-gray-400 py-4">Loading saved addresses...</div>;

  if (addresses.length === 0) return null;

  return (
    <div className="space-y-3 mb-6 animate-in fade-in duration-500">
      <p className="text-sm font-bold text-gray-700 mb-2">Saved Addresses</p>
      
      <div className="grid gap-3">
        {addresses.map((addr) => {
          // Rudimentary check to see if this address is currently selected in the parent form
          const isSelected = selectedAddress?.address === addr.street && selectedAddress?.pincode === addr.pincode;

          return (
            <div 
              key={addr.id}
              onClick={() => onSelect(addr)}
              className={`relative p-4 border rounded-sm cursor-pointer flex items-start gap-3 transition-all ${
                isSelected
                ? 'border-[#B08D55] bg-[#B08D55]/5 ring-1 ring-[#B08D55]' 
                : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`mt-1 w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-[#B08D55] bg-[#B08D55]' : 'border-gray-300'}`}>
                 {isSelected && <Check size={10} className="text-white" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">{addr.name}</p>
                <p className="text-xs text-gray-600 mt-0.5">{addr.street}, {addr.city}</p>
                <p className="text-xs text-gray-600">{addr.state} - {addr.pincode}</p>
                <p className="text-xs text-gray-800 mt-1 font-medium">Ph: {addr.phone}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button 
        type="button"
        onClick={onAddNew}
        className="w-full py-3 mt-2 border border-dashed border-gray-300 text-gray-500 text-xs font-bold uppercase tracking-wider hover:border-[#B08D55] hover:text-[#B08D55] transition-all flex items-center justify-center gap-2 rounded-sm"
      >
        <Plus size={14} /> Add New Address
      </button>
      
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink-0 mx-4 text-gray-400 text-[10px] uppercase">Or enter manually</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>
    </div>
  );
};