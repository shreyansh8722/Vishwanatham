import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase'; // Ensure correct path to your firebase config
import { collectionGroup, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialSlider = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Query reviews with 4+ rating
        const q = query(
          collectionGroup(db, 'reviews'),
          where('rating', '>=', 4),
          // orderBy('rating', 'desc'), // Note: Needs Firestore Index to work with 'where'
          limit(6)
        );

        const snapshot = await getDocs(q);
        const fetchedReviews = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // If we found reviews, use them
        if (fetchedReviews.length > 0) {
            setReviews(fetchedReviews);
        } else {
            // Fallback (Mock) Data if no real reviews exist yet
            setReviews([
              { id: 1, userName: "Ananya S.", text: "The Rudraksha beads are genuinely authentic. I felt the energy immediately.", rating: 5, productName: "5 Mukhi Rudraksha" },
              { id: 2, userName: "Rahul M.", text: "Packaging was divine, like receiving a prasadam from the temple.", rating: 5, productName: "Sphatik Mala" },
              { id: 3, userName: "Meera K.", text: "Very knowledgeable support team. They guided me to the right gemstone.", rating: 5, productName: "Yellow Sapphire" }
            ]);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        // Silent fallback on error
        setReviews([
          { id: 1, userName: "Ananya S.", text: "The Rudraksha beads are genuinely authentic. I felt the energy immediately.", rating: 5, productName: "5 Mukhi Rudraksha" },
          { id: 2, userName: "Rahul M.", text: "Packaging was divine, like receiving a prasadam from the temple.", rating: 5, productName: "Sphatik Mala" },
          { id: 3, userName: "Meera K.", text: "Very knowledgeable support team. They guided me to the right gemstone.", rating: 5, productName: "Yellow Sapphire" }
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

  if (loading) return null;

  return (
    <section className="py-24 bg-heritage-paper border-t border-heritage-mist overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-heritage-rudraksha mb-2 block font-manrope">
            Client Love
          </span>
          <h2 className="font-cinzel text-3xl md:text-4xl text-heritage-charcoal">
            Voices of Heritage
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden min-h-[300px] flex items-center">
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="max-w-3xl mx-auto text-center px-4"
              >
                <div className="mb-8 flex justify-center text-heritage-gold/30">
                  <Quote size={48} className="fill-current" />
                </div>
                
                <p className="font-cinzel text-xl md:text-3xl text-heritage-charcoal leading-relaxed mb-8 italic">
                  "{reviews[currentIndex].text || reviews[currentIndex].comment}"
                </p>

                <div className="flex flex-col items-center gap-2 font-manrope">
                  <div className="flex gap-1 text-heritage-gold">
                    {[...Array(reviews[currentIndex].rating || 5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-current" />
                    ))}
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-heritage-charcoal mt-2">
                    {reviews[currentIndex].userName}
                  </h4>
                  {reviews[currentIndex].productName && (
                    <p className="text-[10px] text-heritage-grey uppercase tracking-wider">
                      Purchased {reviews[currentIndex].productName}
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 text-heritage-mist hover:text-heritage-rudraksha transition-colors hidden md:block"
          >
            <ChevronLeft size={40} strokeWidth={1} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 text-heritage-mist hover:text-heritage-rudraksha transition-colors hidden md:block"
          >
            <ChevronRight size={40} strokeWidth={1} />
          </button>
          
          {/* Mobile Dots */}
          <div className="flex justify-center gap-3 mt-8 md:hidden">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-heritage-rudraksha' : 'w-1.5 bg-heritage-mist'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;