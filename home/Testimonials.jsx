import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      location: "Mumbai",
      text: "I was skeptical about buying Rudraksha online, but Vishwanatham sent a lab certificate with my 5 Mukhi. The energy I feel during meditation is visibly different now. Genuine Kashi vibes.",
      rating: 5,
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Priya Venkatesh",
      location: "Chennai",
      text: "The packaging itself felt sacred. The Pyrite bracelet is heavy and cold to touch—definite signs of real stone. Delivery took only 3 days to Chennai.",
      rating: 5,
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Amitabh Das",
      location: "Kolkata",
      text: "Ordered a Sphatik Mala for my mother. She says it stays cool even in summer. Very happy with the authentic quality and the video of energization provided.",
      rating: 5,
      date: "2 weeks ago"
    }
  ];

  return (
    <section className="py-16 bg-heritage-parchment border-t border-heritage-mist">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-heritage-rudraksha font-bold text-xs tracking-[0.2em] uppercase mb-2 block">
            Voice of Devotees
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-heritage-charcoal">
            Experiences from our Community
          </h2>
          <div className="flex justify-center items-center gap-2 mt-4 text-heritage-grey text-sm">
            <span className="font-bold text-heritage-charcoal">4.9/5</span>
            <div className="flex text-heritage-saffron">
              {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
            </div>
            <span>based on 15,000+ reviews</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-xl border border-heritage-mist shadow-sm hover:shadow-md transition-shadow relative">
              
              {/* Quote Icon Background */}
              <Quote className="absolute top-4 right-4 text-heritage-mist opacity-50" size={40} />

              {/* Stars */}
              <div className="flex text-heritage-saffron mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>

              {/* Text */}
              <p className="text-heritage-charcoal font-body text-sm leading-relaxed mb-6 italic">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-heritage-parchment flex items-center justify-center text-heritage-rudraksha font-bold text-sm border border-heritage-mist">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-heritage-charcoal text-sm flex items-center gap-1">
                    {review.name}
                    <CheckCircle2 size={12} className="text-alert-green" />
                  </h4>
                  <p className="text-[10px] text-heritage-grey uppercase tracking-wider">
                    {review.location} • {review.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;