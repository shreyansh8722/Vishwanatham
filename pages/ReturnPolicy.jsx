import React from 'react';
import { SEO } from '../components/SEO';
import { RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';

const ReturnPolicy = () => {
  return (
    <div className="bg-heritage-paper min-h-screen pt-24 pb-20">
      <SEO title="Return & Refund Policy" />
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="font-cormorant text-4xl text-heritage-charcoal text-center mb-12">Return & Refund Policy</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 border border-heritage-border text-center">
            <RefreshCw className="w-8 h-8 text-heritage-gold mx-auto mb-4" />
            <h3 className="font-bold text-heritage-charcoal mb-2">7-Day Returns</h3>
            <p className="text-xs text-heritage-grey">Easy returns within 7 days of delivery.</p>
          </div>
          <div className="bg-white p-6 border border-heritage-border text-center">
            <AlertTriangle className="w-8 h-8 text-heritage-gold mx-auto mb-4" />
            <h3 className="font-bold text-heritage-charcoal mb-2">Damaged Items</h3>
            <p className="text-xs text-heritage-grey">Instant replacement for damaged goods.</p>
          </div>
          <div className="bg-white p-6 border border-heritage-border text-center">
            <CheckCircle className="w-8 h-8 text-heritage-gold mx-auto mb-4" />
            <h3 className="font-bold text-heritage-charcoal mb-2">Authenticity</h3>
            <p className="text-xs text-heritage-grey">100% money back if not authentic.</p>
          </div>
        </div>

        <div className="space-y-8 font-montserrat text-heritage-grey text-sm leading-relaxed">
          <div className="bg-white p-8 border-l-4 border-heritage-charcoal">
            <h3 className="font-cormorant text-xl text-heritage-charcoal mb-3">Eligibility for Returns</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Your item must be unused and in the same condition that you received it.</li>
              <li>It must be in the original packaging.</li>
              <li>To complete your return, we require a receipt or proof of purchase.</li>
              <li>Rudraksha beads must not have been worn or energized by the customer.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-cormorant text-xl text-heritage-charcoal mb-3">Non-returnable items</h3>
            <p>Perishable goods such as Prasad, flowers, or certain oils cannot be returned. We also do not accept products that are intimate or sanitary goods, hazardous materials, or flammable liquids or gases.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;