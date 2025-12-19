import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { Mail, Trash2, Copy, Check, Users, Download } from 'lucide-react';

export const SubscriberManager = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'subscribers'), orderBy('joinedAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setSubscribers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Remove this subscriber?")) {
      await deleteDoc(doc(db, 'subscribers', id));
    }
  };

  const copyAllEmails = () => {
    const emails = subscribers.map(s => s.email).join(',');
    navigator.clipboard.writeText(emails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Email,Date Joined\n"
      + subscribers.map(s => `${s.email},${s.joinedAt?.toDate().toLocaleDateString()}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="p-10 text-center text-gray-400">Loading list...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
             <Users className="text-[#B08D55]" /> Newsletter Subscribers
          </h3>
          <p className="text-sm text-gray-500">Manage your email marketing audience.</p>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={copyAllEmails}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold uppercase transition-colors"
          >
            {copied ? <Check size={16} className="text-green-600"/> : <Copy size={16}/>} 
            {copied ? 'Copied' : 'Copy Emails'}
          </button>
          <button 
            onClick={downloadCSV}
            className="flex items-center gap-2 px-3 py-2 bg-[#B08D55] hover:bg-[#8c6a40] text-white rounded-lg text-xs font-bold uppercase transition-colors"
          >
            <Download size={16}/> CSV
          </button>
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-100 overflow-y-auto flex-1 bg-gray-50/30">
        {subscribers.length === 0 ? (
          <div className="p-20 text-center text-gray-400">
            <Mail size={48} className="mx-auto mb-4 opacity-20" />
            <p>No subscribers yet.</p>
          </div>
        ) : (
          subscribers.map((sub, index) => (
            <div key={sub.id} className="p-4 sm:px-6 flex items-center justify-between hover:bg-white transition-colors group">
              <div className="flex items-center gap-4">
                 <span className="text-gray-300 font-mono text-xs w-6">{index + 1}</span>
                 <div>
                    <p className="font-medium text-gray-900">{sub.email}</p>
                    <p className="text-xs text-gray-400">Joined: {sub.joinedAt?.toDate().toLocaleDateString()}</p>
                 </div>
              </div>
              
              <button 
                onClick={() => handleDelete(sub.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                title="Remove"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
      
      <div className="p-4 bg-gray-50 border-t border-gray-100 text-xs text-center text-gray-500">
         Total Audience: {subscribers.length}
      </div>
    </div>
  );
};