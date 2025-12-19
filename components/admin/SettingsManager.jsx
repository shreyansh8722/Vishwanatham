import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { Save, Loader2, Globe, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export const SettingsManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [settings, setSettings] = useState({
    siteName: "Pahnawa Banaras",
    supportEmail: "hello@pahnawa.com",
    supportPhone: "+91 98765 43210",
    address: "Assi Ghat, Varanasi, Uttar Pradesh, 221005",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com"
  });

  // Fetch current settings
  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(doc(db, 'settings', 'global'), (doc) => {
      if (doc.exists()) {
        setSettings(prev => ({ ...prev, ...doc.data() }));
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'global'), {
        ...settings,
        updatedAt: new Date()
      });
      alert("Settings updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-400">Loading configuration...</div>;

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-gray-900">
          <Globe size={20} className="text-[#B08D55]" /> Global Configuration
        </h3>

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* General Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">Contact Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Site Name</label>
                <div className="relative">
                   <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                   <input required name="siteName" value={settings.siteName} onChange={handleChange} className="w-full pl-9 border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#B08D55] outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Support Phone</label>
                <div className="relative">
                   <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                   <input required name="supportPhone" value={settings.supportPhone} onChange={handleChange} className="w-full pl-9 border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#B08D55] outline-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Support Email</label>
              <div className="relative">
                 <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                 <input required name="supportEmail" value={settings.supportEmail} onChange={handleChange} className="w-full pl-9 border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#B08D55] outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Office Address</label>
              <div className="relative">
                 <MapPin size={16} className="absolute left-3 top-3 text-gray-400"/>
                 <textarea required name="address" rows="2" value={settings.address} onChange={handleChange} className="w-full pl-9 border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#B08D55] outline-none" />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">Social Media Links</h4>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Instagram URL</label>
              <div className="relative">
                 <Instagram size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                 <input name="instagram" value={settings.instagram} onChange={handleChange} className="w-full pl-9 border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#B08D55] outline-none" placeholder="https://instagram.com/..." />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Facebook URL</label>
              <div className="relative">
                 <Facebook size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                 <input name="facebook" value={settings.facebook} onChange={handleChange} className="w-full pl-9 border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#B08D55] outline-none" placeholder="https://facebook.com/..." />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Twitter/X URL</label>
              <div className="relative">
                 <Twitter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                 <input name="twitter" value={settings.twitter} onChange={handleChange} className="w-full pl-9 border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#B08D55] outline-none" placeholder="https://twitter.com/..." />
              </div>
            </div>
          </div>

          <button 
            disabled={saving}
            className="w-full bg-[#1A1A1A] text-white py-3 rounded-lg font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            {saving ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Save Settings</>}
          </button>
        </form>
      </div>
    </div>
  );
};