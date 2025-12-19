import React from 'react';
import { LegalPageLayout } from '@/components/common/LegalPageLayout';

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="November 2025">
      <h3>1. Acceptance</h3>
      <p>By using Pahnawa Banaras, you agree to be bound by these terms.</p>
      <h3>2. Products</h3>
      <p>
        Our products are handwoven. Slight irregularities in the weave or motif are natural characteristics 
        of handmade items and are not defects.
      </p>
      <h3>3. Pricing</h3>
      <p>Prices are subject to change without notice. We reserve the right to modify or discontinue products at any time.</p>
    </LegalPageLayout>
  );
}