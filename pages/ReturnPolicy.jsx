import React from 'react';
import { LegalPageLayout } from '@/components/common/LegalPageLayout';

export default function ReturnPolicy() {
  return (
    <LegalPageLayout title="Return & Refund Policy" lastUpdated="November 2025">
      <h3>1. Eligibility</h3>
      <p>
        We accept returns within <strong>7 days</strong> of delivery. Items must be unused, unwashed, 
        and with all original tags attached.
      </p>
      <h3>2. Non-Returnable Items</h3>
      <p>
        Custom-stitched items (blouses, suits tailored to size) and items sold during clearance sales are not eligible for return.
      </p>
      <h3>3. Refund Process</h3>
      <p>
        Once we receive your return, we will inspect it and notify you. Approved refunds are processed 
        to your original payment method within 7-10 business days.
      </p>
    </LegalPageLayout>
  );
}