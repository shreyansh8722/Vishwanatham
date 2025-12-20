import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { ReviewForm } from '@/components/reviews/ReviewForm';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import { Star, MessageSquare } from 'lucide-react';

export const ProductReviews = ({ productId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time listener for reviews
    const q = query(
      collection(db, 'reviews'),
      where('spotId', '==', productId), // 'spotId' matches your ReviewForm logic
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [productId]);

  const handleDelete = async (reviewId) => {
    try {
      await deleteDoc(doc(db, 'reviews', reviewId));
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  return (
    <div className="bg-white border-t border-heritage-border/40 py-16" id="reviews">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <h3 className="font-serif text-3xl text-heritage-charcoal italic mb-2">Customer Reviews</h3>
            <div className="flex items-center gap-2 text-sm text-stone-500">
              <div className="flex text-heritage-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < 4 ? "fill-current" : "text-stone-200"} />
                ))}
              </div>
              <span>Based on {reviews.length} reviews</span>
            </div>
          </div>
          
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-heritage-charcoal text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-heritage-gold transition-colors rounded-sm flex items-center gap-2"
          >
            <MessageSquare size={16} /> {showForm ? 'Cancel Review' : 'Write a Review'}
          </button>
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="mb-12 animate-fade-in">
            {user ? (
              <ReviewForm 
                spotId={productId} 
                user={user} 
                onPostSuccess={() => setShowForm(false)}
                isPosting={false}
                setIsPosting={() => {}}
              />
            ) : (
              <div className="bg-stone-50 p-6 text-center border border-stone-200 rounded-sm">
                <p className="text-stone-500 mb-4">Please sign in to share your experience.</p>
                <a href="/login" className="text-heritage-gold font-bold uppercase text-xs border-b border-heritage-gold pb-0.5">Login Now</a>
              </div>
            )}
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-10 text-stone-400">Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-16 bg-stone-50/50 rounded-sm border border-dashed border-stone-200">
              <p className="text-stone-400 italic mb-2">No reviews yet.</p>
              <p className="text-xs font-bold uppercase tracking-widest text-stone-300">Be the first to review this masterpiece</p>
            </div>
          ) : (
            reviews.map(review => (
              <ReviewCard 
                key={review.id} 
                review={review} 
                user={user} 
                onDeleteReview={handleDelete}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
};