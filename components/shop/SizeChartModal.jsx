import React from 'react';
import { X } from 'lucide-react';

export const SizeChartModal = ({ isOpen, onClose, category }) => {
  if (!isOpen) return null;

  // Define charts based on category (You can expand this)
  const chartType = category?.toLowerCase().includes('blouse') ? 'blouse' : 'suit';

  const data = {
    blouse: {
      headers: ['Size', 'Bust (in)', 'Waist (in)', 'Shoulder (in)', 'Length (in)'],
      rows: [
        ['XS', '32', '26', '13.5', '14'],
        ['S', '34', '28', '14', '14.5'],
        ['M', '36', '30', '14.5', '15'],
        ['L', '38', '32', '15', '15.5'],
        ['XL', '40', '34', '15.5', '16'],
      ]
    },
    suit: {
      headers: ['Size', 'Bust (in)', 'Waist (in)', 'Hip (in)', 'Kurta Length'],
      rows: [
        ['XS', '34', '30', '36', '45'],
        ['S', '36', '32', '38', '45'],
        ['M', '38', '34', '40', '46'],
        ['L', '40', '36', '42', '46'],
        ['XL', '42', '38', '44', '47'],
      ]
    }
  };

  const chart = data[chartType] || data.suit;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl relative shadow-2xl animate-slide-up">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} className="text-gray-500" />
        </button>

        <div className="p-8 md:p-12">
          <h3 className="font-serif text-2xl italic text-gray-900 mb-2">Size Guide</h3>
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-8">
            Standard Sizing for {category || 'Garments'}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider">
                <tr>
                  {chart.headers.map((h, i) => (
                    <th key={i} className="px-6 py-4 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {chart.rows.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    {row.map((cell, j) => (
                      <td key={j} className={`px-6 py-4 text-gray-600 ${j === 0 ? 'font-bold text-gray-900' : ''}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-4 bg-gray-50 border border-gray-100 text-xs text-gray-500 leading-relaxed">
            * All measurements are in inches. Garment measurements may vary slightly due to the handmade nature of the product. For custom fitting, please contact our stylists.
          </div>
        </div>
      </div>
    </div>
  );
};