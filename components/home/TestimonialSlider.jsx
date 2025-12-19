import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collectionGroup, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const TestimonialSlider = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // --- FETCH REVIEWS ACROSS ALL PRODUCTS ---
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Query the 'reviews' subcollection across ALL documents
        // We only want 4 or 5 star reviews for the homepage
        const q = query(
          collectionGroup(db, 'reviews'),
          where('rating', '>=', 4),
          orderBy('rating', 'desc'), // Needs composite index with createdAt usually
          orderBy('createdAt', 'desc'),
          limit(8)
        );

        const snapshot = await getDocs(q);
        const fetchedReviews = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        // Fallback data if no reviews exist yet or index is missing
        setReviews([
          { id: 1, userName: "Ananya S.", text: "The Katan silk saree I purchased is absolutely breathtaking. The weave is so intricate.", rating: 5, productName: "Katan Silk Saree" },
          { id: 2, userName: "Priya M.", text: "Received my order in 2 days. The packaging was lovely and the saree is pure perfection.", rating: 5, productName: "Bridal Lehenga" },
          { id: 3, userName: "Meera K.", text: "Authentic Banarasi quality. Hard to find such craftsmanship online.", rating: 5, productName: "Jangla Suit" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (loading || reviews.length === 0) return null;

  return (
    <section className="py-24 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B08D55] mb-2 block">
            Client Love
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1a1a1a]">
            Voices of Heritage
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center"
              >
                <div className="mb-8 flex justify-center text-[#B08D55]/30">
                  <Quote size={48} className="fill-current" />
                </div>
                
                <p className="font-serif text-xl md:text-3xl text-[#1a1a1a] leading-relaxed mb-8 italic">
                  "{reviews[currentIndex].text || reviews[currentIndex].comment}"
                </p>

                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-1 text-[#B08D55]">
                    {[...Array(reviews[currentIndex].rating || 5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-current" />
                    ))}
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a]">
                    {reviews[currentIndex].userName}
                  </h4>
                  {reviews[currentIndex].productName && (
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                      Purchased {reviews[currentIndex].productName}
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          {reviews.length > 1 && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-3 text-gray-300 hover:text-[#B08D55] transition-colors hidden md:block"
              >
                <ChevronLeft size={32} strokeWidth={1} />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-3 text-gray-300 hover:text-[#B08D55] transition-colors hidden md:block"
              >
                <ChevronRight size={32} strokeWidth={1} />
              </button>
              
              {/* Mobile Dots */}
              <div className="flex justify-center gap-3 mt-12 md:hidden">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-[#B08D55]' : 'w-1.5 bg-gray-200'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};