import React, { useState } from 'react';

const ProductGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  if (!images.length) return null;

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 h-fit sticky top-24">
      
      {/* THUMBNAILS STRIP (Vertical on Desktop) */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto scrollbar-hide md:w-20 md:h-[600px] flex-shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onMouseEnter={() => setSelectedImage(idx)}
            onClick={() => setSelectedImage(idx)}
            className={`relative w-16 h-20 md:w-full md:h-24 flex-shrink-0 rounded-sm overflow-hidden border transition-all duration-200 ${
              selectedImage === idx 
                ? 'border-[#B08D55] ring-1 ring-[#B08D55] opacity-100' 
                : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-300'
            }`}
          >
            <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* MAIN IMAGE CONTAINER */}
      <div 
        className="relative flex-grow bg-white rounded-sm overflow-hidden border border-gray-100 cursor-crosshair group h-[500px] md:h-[600px] w-full"
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={images[selectedImage]}
          alt="Product Main View"
          className="w-full h-full object-cover object-top"
        />

        {/* Zoom Lens Effect */}
        {showZoom && (
          <div 
            className="absolute inset-0 pointer-events-none hidden lg:block bg-no-repeat"
            style={{
              backgroundImage: `url(${images[selectedImage]})`,
              backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
              backgroundSize: '250%', // Zoom level
            }}
          />
        )}
        
        {/* Mobile Zoom Hint */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-gray-500 md:hidden">
            Pinch to Zoom
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;