import React from 'react';
import { LegalPageLayout } from '@/components/common/LegalPageLayout';

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="November 2025">
      <h3>1. Information Collection</h3>
      <p>
        We collect information you provide directly to us when you create an account, make a purchase, 
        sign up for our newsletter, or contact us. This includes your name, email, phone number, and shipping address.
      </p>
      <h3>2. Use of Information</h3>
      <p>
        We use this data to process your orders, send order updates, and improve your shopping experience. 
        We do not sell your personal data to third parties.
      </p>
      <h3>3. Data Security</h3>
      <p>
        We implement industry-standard security measures to maintain the safety of your personal information.
      </p>
    </LegalPageLayout>
  );
}