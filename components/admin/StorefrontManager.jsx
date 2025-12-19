import React, { useState, useEffect } from 'react';
import { db, storage } from '@/lib/firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Save, Image as ImageIcon, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const StorefrontManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // --- CONTENT STATE (No Hero) ---
  const [content, setContent] = useState({
    spotlight: {
      title: "Everyday Elegance",
      subtitle: "Lightweight silks & cottons for your daily grace.",
      buttonText: "Shop Collection",
      image: ""
    },
    muse: {
      image1: "", image2: "", image3: "", image4: ""
    },
    fabrics: {
      katan: "", organza: "", georgette: "", tissue: "", tussar: ""
    }
  });

  // --- FETCH DATA ---
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'storefront', 'home_content'), (docSnap) => {
      if (docSnap.exists()) {
        setContent(prev => ({ ...prev, ...docSnap.data() }));
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // --- HANDLERS ---
  const handleImageUpload = async (file, path) => {
    if (!file) return null;
    const storageRef = ref(storage, `storefront/${path}_${Date.now()}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'storefront', 'home_content'), content);
      toast.success("Home Page Updated Successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const FileUpload = ({ label, section, field, currentImg }) => (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase text-gray-500 tracking-wide">{label}</label>
      <div className="flex items-start gap-4 p-3 border border-gray-100 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors">
        <div className="w-20 h-20 bg-gray-200 rounded border border-gray-300 overflow-hidden relative group shrink-0">
          {currentImg ? (
             <img src={currentImg} alt="Preview" className="w-full h-full object-cover" />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon size={24}/></div>
          )}
          <input 
            type="file" 
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
            onChange={async (e) => {
              const file = e.target.files[0];
              if(file) {
                 const toastId = toast.loading("Uploading...");
                 try {
                   const url = await handleImageUpload(file, `${section}_${field}`);
                   setContent(prev => ({
                      ...prev,
                      [section]: { ...prev[section], [field]: url }
                   }));
                   toast.success("Uploaded!", { id: toastId });
                 } catch (e) {
                   toast.error("Failed", { id: toastId });
                 }
              }
            }}
          />
        </div>
        <div className="flex-1 min-w-0 pt-1">
          <p className="text-xs text-gray-500 truncate">{currentImg ? 'Image Active' : 'No Image'}</p>
        </div>
      </div>
    </div>
  );

  if (loading) return <div className="p-10 text-center text-gray-400"><Loader2 className="animate-spin inline mr-2"/>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto pb-20 space-y-10">
      
      {/* HEADER */}
      <div className="flex justify-between items-center sticky top-0 bg-white z-20 py-6 border-b border-gray-100">
        <div>
           <h2 className="text-2xl font-serif text-gray-900">Home Page Content</h2>
           <p className="text-xs text-gray-500 mt-1">Manage Spotlight, Fabrics, and Muse sections.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="bg-black text-white px-8 py-3 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#B08D55] transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          Save Changes
        </button>
      </div>

      {/* 1. SPOTLIGHT EDITOR */}
      <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#B08D55]" />
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Spotlight Section</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Title</label>
                <input 
                  value={content.spotlight.title}
                  onChange={e => setContent({...content, spotlight: {...content.spotlight, title: e.target.value}})}
                  className="w-full border border-gray-300 p-2.5 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Subtitle</label>
                <textarea 
                  value={content.spotlight.subtitle}
                  onChange={e => setContent({...content, spotlight: {...content.spotlight, subtitle: e.target.value}})}
                  className="w-full border border-gray-300 p-2.5 rounded-lg text-sm"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Button Label</label>
                <input 
                  value={content.spotlight.buttonText}
                  onChange={e => setContent({...content, spotlight: {...content.spotlight, buttonText: e.target.value}})}
                  className="w-full border border-gray-300 p-2.5 rounded-lg text-sm"
                />
              </div>
           </div>
           <div>
              <FileUpload 
                label="Spotlight Image" 
                section="spotlight" 
                field="image" 
                currentImg={content.spotlight.image} 
              />
           </div>
        </div>
      </section>

      {/* 2. FABRIC EDITOR */}
      <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#B08D55]" />
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Fabric Textures</h3>
        </div>
        <div className="p-6 grid grid-cols-2 md:grid-cols-5 gap-4">
            {['katan', 'organza', 'georgette', 'tissue', 'tussar'].map(fabric => (
                <FileUpload 
                    key={fabric}
                    label={fabric} 
                    section="fabrics" 
                    field={fabric} 
                    currentImg={content.fabrics?.[fabric]} 
                />
            ))}
        </div>
      </section>

      {/* 3. MUSE EDITOR */}
      <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#B08D55]" />
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Muse Gallery</h3>
        </div>
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {['image1', 'image2', 'image3', 'image4'].map((field, idx) => (
                <FileUpload 
                    key={field}
                    label={`Muse ${idx + 1}`} 
                    section="muse" 
                    field={field} 
                    currentImg={content.muse?.[field]} 
                />
            ))}
        </div>
      </section>

    </div>
  );
};