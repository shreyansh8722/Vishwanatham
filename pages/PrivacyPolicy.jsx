import React from 'react';
import { SEO } from '../components/SEO';

const PrivacyPolicy = () => {
  return (
    <div className="bg-heritage-paper min-h-screen pt-24 pb-20">
      <SEO title="Privacy Policy" />
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="font-cormorant text-4xl text-heritage-charcoal text-center mb-4">Privacy Policy</h1>
        <p className="text-center text-heritage-grey text-sm mb-12 max-w-2xl mx-auto">
          At Vishwanatham, we respect the sanctity of your personal information just as we respect the traditions of Kashi.
        </p>

        <div className="bg-white p-8 md:p-12 border border-heritage-border space-y-8 text-sm font-montserrat text-heritage-grey leading-relaxed">
          <section>
            <h3 className="font-cormorant text-xl text-heritage-charcoal mb-2">1. Information We Collect</h3>
            <p>When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address. When you browse our store, we also automatically receive your computer’s internet protocol (IP) address.</p>
          </section>

          <section>
            <h3 className="font-cormorant text-xl text-heritage-charcoal mb-2">2. Consent</h3>
            <p>How do you get my consent? When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.</p>
          </section>

          <section>
            <h3 className="font-cormorant text-xl text-heritage-charcoal mb-2">3. Security</h3>
            <p>To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;