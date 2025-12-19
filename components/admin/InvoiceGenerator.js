import { formatPrice } from '@/lib/utils';

export const generateInvoice = async (order) => {
  // Create a new window for the invoice
  const printWindow = window.open('', 'PRINT', 'height=800,width=800');

  if (!printWindow) {
    alert('Please allow popups to print invoices');
    return;
  }

  const date = order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : new Date(order.createdAt).toLocaleDateString();
  const orderId = order.id.slice(-6).toUpperCase();

  // HTML Template for the Invoice
  printWindow.document.write(`
    <html>
      <head>
        <title>Invoice #${orderId}</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; max-width: 800px; margin: 0 auto; }
          .header { display: flex; justify-content: space-between; margin-bottom: 40px; border-bottom: 2px solid #eee; padding-bottom: 20px; }
          .logo { font-size: 24px; font-weight: bold; font-style: italic; color: #1a1a1a; }
          .invoice-details { text-align: right; }
          .invoice-title { font-size: 32px; font-weight: bold; color: #B08D55; margin-bottom: 5px; }
          .grid { display: flex; justify-content: space-between; margin-bottom: 40px; }
          .section-title { font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #999; margin-bottom: 10px; font-weight: bold; }
          .address { font-size: 14px; line-height: 1.6; }
          table { w-full; width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th { text-align: left; padding: 12px 0; border-bottom: 1px solid #ddd; font-size: 12px; text-transform: uppercase; color: #666; }
          td { padding: 12px 0; border-bottom: 1px solid #eee; font-size: 14px; }
          .text-right { text-align: right; }
          .total-section { display: flex; justify-content: flex-end; }
          .total-box { width: 250px; }
          .row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; }
          .grand-total { font-weight: bold; font-size: 18px; border-top: 2px solid #333; padding-top: 10px; margin-top: 10px; }
          .footer { margin-top: 60px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">Pahnawa Banaras</div>
          <div class="invoice-details">
            <div class="invoice-title">INVOICE</div>
            <div>#${orderId}</div>
            <div>Date: ${date}</div>
          </div>
        </div>

        <div class="grid">
          <div>
            <div class="section-title">Billed To</div>
            <div class="address">
              <strong>${order.shippingAddress?.fullName || 'Guest'}</strong><br>
              ${order.shippingAddress?.addressLine1 || ''}<br>
              ${order.shippingAddress?.city || ''}, ${order.shippingAddress?.state || ''}<br>
              ${order.shippingAddress?.pincode || ''}<br>
              Phone: ${order.shippingAddress?.phone || ''}
            </div>
          </div>
          <div class="text-right">
            <div class="section-title">Shipped From</div>
            <div class="address">
              <strong>Pahnawa Banaras</strong><br>
              Varanasi, Uttar Pradesh<br>
              India - 221001<br>
              contact@pahnawabanaras.com
            </div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th class="text-right">Price</th>
              <th class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map(item => `
              <tr>
                <td>
                  <strong>${item.name}</strong>
                  ${item.selectedSize ? `<br><span style="font-size:11px; color:#888">Size: ${item.selectedSize}</span>` : ''}
                </td>
                <td>${item.quantity}</td>
                <td class="text-right">₹${formatPrice(item.price)}</td>
                <td class="text-right">₹${formatPrice(item.price * item.quantity)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="total-section">
          <div class="total-box">
            <div class="row">
              <span>Subtotal:</span>
              <span>₹${formatPrice(order.subtotal || order.total)}</span>
            </div>
            <div class="row">
              <span>Shipping:</span>
              <span>${order.shipping === 0 ? 'Free' : '₹' + order.shipping}</span>
            </div>
            <div class="row grand-total">
              <span>Total:</span>
              <span>₹${formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        <div class="footer">
          <p>Thank you for shopping with Pahnawa Banaras. This is a computer-generated invoice.</p>
        </div>
      </body>
    </html>
  `);

  printWindow.document.close(); // Necessary for IE >= 10
  printWindow.focus(); // Necessary for IE >= 10

  // Wait for images/styles to load then print
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
};