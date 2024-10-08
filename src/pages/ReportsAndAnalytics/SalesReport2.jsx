import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CSVLink } from 'react-csv'; // For exporting CSV
import * as XLSX from 'xlsx'; // For exporting Excel
import jsPDF from 'jspdf'; // For exporting PDF
import 'jspdf-autotable'; // For PDF table support

// Sample data for sales reports
const salesData = [
    {
        orderId: 'ORD001',
        customerName: 'John Doe',
        totalAmount: 150.0,
        orderDate: 'Sep 01, 2024',
    },
    {
        orderId: 'ORD002',
        customerName: 'Jane Smith',
        totalAmount: 200.0,
        orderDate: 'Sep 02, 2024',
    },
    {
        orderId: 'ORD003',
        customerName: 'Alice Johnson',
        totalAmount: 250.0,
        orderDate: 'Sep 03, 2024',
    },
    {
        orderId: 'ORD004',
        customerName: 'Bob Brown',
        totalAmount: 300.0,
        orderDate: 'Sep 04, 2024',
    },
    {
        orderId: 'ORD005',
        customerName: 'Waliul Hasan Raju',
        totalAmount: 500.0,
        orderDate: 'Sep 07, 2024',
    },
];

const SalesReport = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Filter sales data based on date range
    const filteredSales = salesData.filter(sale => {
        const saleDate = new Date(sale.orderDate);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return (
            (!startDate || saleDate >= start) &&
            (!endDate || saleDate <= end)
        );
    });

    // Export to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredSales);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'SalesReport');
        XLSX.writeFile(workbook, 'SalesReport.xlsx');
    };

    // Export to PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Order ID', 'Customer Name', 'Total Amount', 'Order Date']],
            body: filteredSales.map(sale => [
                sale.orderId,
                sale.customerName,
                `$${sale.totalAmount}`,
                sale.orderDate,
            ]),
        });
        doc.save('SalesReport.pdf');
    };

    return (
        <div>
            <Breadcrumb pageName="Sales Report" />
            <div className="max-w-full p-8 bg-white rounded-lg shadow-lg dark:bg-boxdark">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                    Sales Report
                </h2>

                <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="relative w-full sm:w-1/2">
                        <label htmlFor="startDate" className="block text-gray-700 dark:text-white mb-2">
                            Start Date
                        </label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="MMM d, yyyy"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm dark:border-strokedark dark:bg-boxdark dark:text-white"
                            placeholderText="Select Start Date"
                        />
                    </div>
                    <div className="relative w-full sm:w-1/2">
                        <label htmlFor="endDate" className="block text-gray-700 dark:text-white mb-2">
                            End Date
                        </label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="MMM d, yyyy"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm dark:border-strokedark dark:bg-boxdark dark:text-white"
                            placeholderText="Select End Date"
                        />
                    </div>
                </div>

                {/* Export buttons */}
                <div className="mb-6 flex items-center gap-4">
                    <CSVLink
                        data={filteredSales}
                        headers={[
                            { label: 'Order ID', key: 'orderId' },
                            { label: 'Customer Name', key: 'customerName' },
                            { label: 'Total Amount', key: 'totalAmount' },
                            { label: 'Order Date', key: 'orderDate' },
                        ]}
                        filename={'SalesReport.csv'}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
                    >
                        Export CSV
                    </CSVLink>
                    <button
                        onClick={exportToExcel}
                        className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600"
                    >
                        Export Excel
                    </button>
                    <button
                        onClick={exportToPDF}
                        className="px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600"
                    >
                        Export PDF
                    </button>
                </div>

                {/* Sales Table */}
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse dark:border-strokedark">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-meta-4">
                                <th className="py-4 px-6 font-medium text-left text-gray-800 dark:text-white">
                                    Order ID
                                </th>
                                <th className="py-4 px-6 font-medium text-left text-gray-800 dark:text-white">
                                    Customer Name
                                </th>
                                <th className="py-4 px-6 font-medium text-center text-gray-800 dark:text-white">
                                    Total Amount
                                </th>
                                <th className="py-4 px-6 font-medium text-center text-gray-800 dark:text-white">
                                    Order Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSales.length > 0 ? (
                                filteredSales.map((sale, index) => (
                                    <tr key={index} className="border-b dark:border-strokedark">
                                        <td className="py-4 px-6 text-gray-800 dark:text-white">
                                            {sale.orderId}
                                        </td>
                                        <td className="py-4 px-6 text-gray-800 dark:text-white">
                                            {sale.customerName}
                                        </td>
                                        <td className="py-4 px-6 text-center text-gray-800 dark:text-white">
                                            ${sale.totalAmount}
                                        </td>
                                        <td className="py-4 px-6 text-center text-gray-800 dark:text-white">
                                            {sale.orderDate}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-4 px-6 text-center text-gray-800 dark:text-white">
                                        No sales data available for the selected date range.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SalesReport;
