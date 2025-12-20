import React from 'react';
import { SEO } from '../components/SEO';

const TermsPage = () => {
  return (
    <div className="bg-heritage-paper min-h-screen pt-24 pb-20">
      <SEO title="Terms of Service" />
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="font-cormorant text-4xl md:text-5xl text-heritage-charcoal mb-2 text-center">Terms of Service</h1>
        <p className="text-center text-heritage-grey text-xs uppercase tracking-widest mb-16">Last Updated: December 20, 2025</p>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-1/4">
            <ul className="sticky top-32 space-y-4 text-sm font-montserrat border-l-2 border-heritage-border pl-4">
              <li><a href="#general" className="text-heritage-charcoal font-bold hover:text-heritage-gold block">1. General Conditions</a></li>
              <li><a href="#products" className="text-heritage-grey hover:text-heritage-gold block">2. Products & Services</a></li>
              <li><a href="#payments" className="text-heritage-grey hover:text-heritage-gold block">3. Payments</a></li>
              <li><a href="#shipping" className="text-heritage-grey hover:text-heritage-gold block">4. Shipping & Returns</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="w-full md:w-3/4 space-y-12 font-montserrat text-heritage-grey leading-relaxed text-sm">
            <section id="general">
              <h3 className="font-cormorant text-2xl text-heritage-charcoal mb-4">1. General Conditions</h3>
              <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction.</p>
            </section>

            <section id="products">
              <h3 className="font-cormorant text-2xl text-heritage-charcoal mb-4">2. Products & Services</h3>
              <p>Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy. We have made every effort to display as accurately as possible the colors and images of our products.</p>
            </section>

            <section id="payments">
              <h3 className="font-cormorant text-2xl text-heritage-charcoal mb-4">3. Payments</h3>
              <p>We accept major credit cards, UPI, and Net Banking. All prices are in INR. We reserve the right to refuse any order you place with us.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;