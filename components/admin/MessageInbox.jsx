import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Mail, Trash2, MailOpen, Clock, User, Search } from 'lucide-react';

export const MessageInbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsub;
  }, []);

  const markAsRead = async (id, currentStatus) => {
    if(currentStatus) return; // Already read
    await updateDoc(doc(db, 'messages', id), { read: true });
  };

  const deleteMessage = async (e, id) => {
    e.stopPropagation();
    if(window.confirm('Delete this message?')) {
      await deleteDoc(doc(db, 'messages', id));
    }
  };

  const filtered = messages.filter(m => 
    m.email?.toLowerCase().includes(search.toLowerCase()) || 
    m.name?.toLowerCase().includes(search.toLowerCase()) ||
    m.subject?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-10 text-center text-gray-400">Loading messages...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
             <Mail className="text-[#B08D55]" /> Customer Inquiries
          </h3>
          <p className="text-sm text-gray-500">Manage support requests from the contact page.</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search messages..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#B08D55] transition-all"
          />
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-100 overflow-y-auto flex-1 bg-gray-50/30">
        {filtered.length === 0 ? (
          <div className="p-20 text-center text-gray-400">
            <Mail size={48} className="mx-auto mb-4 opacity-20" />
            <p>No messages found.</p>
          </div>
        ) : (
          filtered.map(msg => (
            <div 
              key={msg.id} 
              onClick={() => markAsRead(msg.id, msg.read)}
              className={`p-6 hover:bg-white transition-all cursor-pointer group border-l-4 ${
                !msg.read ? 'border-l-[#B08D55] bg-white' : 'border-l-transparent bg-gray-50/50'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                 <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${!msg.read ? 'bg-[#B08D55]/10 text-[#B08D55]' : 'bg-gray-200 text-gray-500'}`}>
                      {msg.read ? <MailOpen size={16} /> : <Mail size={16} />}
                    </div>
                    <div>
                       <h4 className={`text-sm ${!msg.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                         {msg.subject || 'No Subject'}
                       </h4>
                       <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                          <User size={12} /> {msg.name} &lt;{msg.email}&gt;
                       </div>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-400 flex items-center gap-1 whitespace-nowrap">
                      <Clock size={12} />
                      {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleDateString() : 'Just now'}
                    </span>
                    <button 
                      onClick={(e) => deleteMessage(e, msg.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete Message"
                    >
                      <Trash2 size={16} />
                    </button>
                 </div>
              </div>
              
              <p className={`text-sm mt-3 pl-11 ${!msg.read ? 'text-gray-800' : 'text-gray-500'}`}>
                {msg.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};