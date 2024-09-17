import { logoBase64 } from './logoBase64';

export const handlePrintInvoice = (order) => {
    const printWindow = window.open('', '', 'width=900,height=700');

    const invoiceHTML = `
        <html>
        <head>
            <title>Invoice - Order ${order.orderNumber}</title>
            <style>
                @page {
                    size: A4;
                    margin: 20mm;
                }
                body {
                    font-family: 'Helvetica Neue', 'Arial', sans-serif;
                    color: #333;
                    margin: 0;
                    padding: 0;
                    -webkit-print-color-adjust: exact;
                }
                .invoice-box {
                    width: 100%;
                    max-width: 800px;
                    margin: auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    font-size: 14px;
                    line-height: 1.1;
                    color: #555;
                    background: #f9f9f9;
                }
                .order_info {
                    text-align: end;
                    flex-direction: row;
                    gap: 7px;
                }
                .invoice_subheading {
                    color: #6c757d;
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 15px;
                }
                .email_span {
                    text-decoration: none;
                    color: #007bff;
                }
                h1 {
                    color: #007bff;
                    font-size: 24px;
                    font-weight: 700;
                    margin: 0 0 15px 0;
                }
                .invoice-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 12px;
                }
                .invoice-header img {
                    width: 100px;
                }
                .company-info {
                    text-align: right;
                }
                .invoice-title {
                    text-transform: uppercase;
                    font-size: 18px;
                    color: #007bff;
                    margin-bottom: 10px;
                }
                .details-table, .summary-table {
                    width: 100%;
                    margin-bottom: 10px;
                    border-collapse: collapse;
                }
                .details-table th, .details-table td, 
                .summary-table th, .summary-table td {
                    padding: 6px;
                    border: none;
                }
                .summary-table th, .details-table th {
                    background-color: #f4f4f4;
                    font-weight: 600;
                }
                .summary-table td {
                    text-align: right;
                }
                .footer {
                    margin-top: 15px;
                    text-align: center;
                    font-size: 10px;
                    color: #777;
                }
                .billing-info {
                    display: flex;
                    justify-content: space-between;
                }
                .billing-info .bill-to, .billing-info .company-info {
                    width: 48%;
                }
                .bg-dark-blue {
                    background-color: #007bff;
                }
                .text-white {
                    color: #fff;
                }
                @media (max-width: 768px) {
                    .billing-info {
                        flex-direction: column;
                    }
                    .billing-info .bill-to, .billing-info .company-info {
                        width: 100%;
                    }
                }
            </style>
        </head>
        <body>
            <div class="invoice-box">
                <div class="invoice-header">
                    <div>
                        <h1>Invoice</h1>
                        <h3 class="invoice_subheading"># Client Copy</h3>
                        <h2>Order Number: ${order.orderNumber}</h2>
                        <p>Order Date: ${new Date(order.orderDate).toLocaleDateString()}</p>
                    </div>
                    <div class="company-info">
                        <img src="data:image/png;base64,${logoBase64}" alt="Koel Shop">
                        <p><strong>Koel Shop</strong></p>
                        <p>House #31, Road #17, Sector #13</p>
                        <p>Uttara, Dhaka</p>
                        <p>Email: sales@koelgroupbd.com</p>
                    </div>
                </div>
                <div class="billing-info">
                    <div class="bill-to">
                        <h3 class="invoice-title">Bill To</h3>
                        <p><strong>${order.customerName}</strong></p>
                        <p>${order.shippingAddress}</p>
                        <p>Email: ${order.customerEmail}</p>
                        <p>Phone: ${order.customerPhone}</p>
                    </div>
                    <div class="company-info">
                        <h3 class="invoice-title">Company Info</h3>
                        <p><strong>Koel Shop</strong></p>
                        <p>House #31, Road #17, Sector #13</p>
                        <p>Uttara, Dhaka</p>
                        <p>Email: sales@koelgroupbd.com</p>
                    </div>
                </div>
                <h3 class="invoice-title">Order Details</h3>
                <table class="details-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Unit Price (BDT)</th>
                            <th>Total (BDT)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.products.map(product => `
                            <tr>
                                <td>${product.product.name}</td>
                                <td>${product.quantity}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>${(product.quantity * product.price).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <table class="summary-table">
                    <tbody>
                        <tr>
                            <th>Subtotal (BDT):</th>
                            <td>${order.totalAmount.toFixed(2)}</td>
                        </tr>
                        ${order.discount ? `
                        <tr>
                            <th>Discount (BDT):</th>
                            <td>- ${order.discount.toFixed(2)}</td>
                        </tr>
                        ` : ''}
                        ${order.tax ? `
                        <tr>
                            <th>Tax (BDT):</th>
                            <td>${order.tax.toFixed(2)}</td>
                        </tr>
                        ` : ''}
                        <tr>
                            <th>Final Amount (BDT):</th>
                            <td><strong>${order.finalAmount.toFixed(2)}</strong></td>
                        </tr>
                    </tbody>
                </table>
                <p class="footer">
                    Thank you for your order! For any questions or concerns regarding this invoice, please contact us at 
                    <span class="email_span">+8801791000000</span> or 
                    <span class="email_span">sales@koelgroupbd.com</span>.
                </p>
            </div>
            <div class="invoice-box">
                <div class="invoice-header">
                    <div>
                        <h1>Invoice</h1>
                        <h3 class="invoice_subheading"># Office Copy</h3>
                        <h2>Order Number: ${order.orderNumber}</h2>
                        <p>Order Date: ${new Date(order.orderDate).toLocaleDateString()}</p>
                    </div>
                    <div class="company-info">
                        <img src="data:image/png;base64,${logoBase64}" alt="Koel Shop">
                        <p><strong>Koel Shop</strong></p>
                        <p>House #31, Road #17, Sector #13</p>
                        <p>Uttara, Dhaka</p>
                        <p>Email: sales@koelgroupbd.com</p>
                    </div>
                </div>
                <div class="billing-info">
                    <div class="bill-to">
                        <h3 class="invoice-title">Bill To</h3>
                        <p><strong>${order.customerName}</strong></p>
                        <p>${order.shippingAddress}</p>
                        <p>Email: ${order.customerEmail}</p>
                        <p>Phone: ${order.customerPhone}</p>
                    </div>
                    <div class="company-info">
                        <h3 class="invoice-title">Company Info</h3>
                        <p><strong>Koel Shop</strong></p>
                        <p>House #31, Road #17, Sector #13</p>
                        <p>Uttara, Dhaka</p>
                        <p>Email: sales@koelgroupbd.com</p>
                    </div>
                </div>
                <h3 class="invoice-title">Order Details</h3>
                <table class="details-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Unit Price (BDT)</th>
                            <th>Total (BDT)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.products.map(product => `
                            <tr>
                                <td>${product.product.name}</td>
                                <td>${product.quantity}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>${(product.quantity * product.price).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <table class="summary-table">
                    <tbody>
                        <tr>
                            <th>Subtotal (BDT):</th>
                            <td>${order.totalAmount.toFixed(2)}</td>
                        </tr>
                        ${order.discount ? `
                        <tr>
                            <th>Discount (BDT):</th>
                            <td>- ${order.discount.toFixed(2)}</td>
                        </tr>
                        ` : ''}
                        ${order.tax ? `
                        <tr>
                            <th>Tax (BDT):</th>
                            <td>${order.tax.toFixed(2)}</td>
                        </tr>
                        ` : ''}
                        <tr>
                            <th>Final Amount (BDT):</th>
                            <td><strong>${order.finalAmount.toFixed(2)}</strong></td>
                        </tr>
                    </tbody>
                </table>
                <p class="footer">
                    Thank you for your order! For any questions or concerns regarding this invoice, please contact us at 
                    <span class="email_span">+8801791000000</span> or 
                    <span class="email_span">sales@koelgroupbd.com</span>.
                </p>
            </div>
        </body>
        </html>
    `;

    printWindow.document.open();
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();

    printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        setTimeout(() => printWindow.close(), 500); // Close the print window after printing
    };
};
