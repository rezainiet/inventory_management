import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Sample data for inventory reports
const inventoryData = [
    {
        productId: 'PROD001',
        productName: 'Apple Watch Series 7',
        stockLevel: 20,
        lastUpdated: 'Sep 01, 2024',
    },
    {
        productId: 'PROD002',
        productName: 'Macbook Pro M1',
        stockLevel: 12,
        lastUpdated: 'Sep 02, 2024',
    },
    {
        productId: 'PROD003',
        productName: 'Dell Inspiron 15',
        stockLevel: 5,
        lastUpdated: 'Sep 03, 2024',
    },
    {
        productId: 'PROD004',
        productName: 'HP Probook 450',
        stockLevel: 0,
        lastUpdated: 'Sep 04, 2024',
    },
];

const InventoryReport = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Filter inventory data based on date range
    const filteredInventory = inventoryData.filter(item => {
        const lastUpdated = new Date(item.lastUpdated);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return (
            (!startDate || lastUpdated >= start) &&
            (!endDate || lastUpdated <= end)
        );
    });

    const getCurrentTimestamp = () => {
        return new Date().toLocaleString().replace(/[/,: ]/g, '-');
    };

    // Export as PDF
    const exportAsPDF = () => {
        const doc = new jsPDF();
        const exportTime = new Date().toLocaleString();

        doc.text('Koel Modish Apparels', 10, 10);
        doc.text('Company Address: House No: 31, Road No: 17, Sector 13, Uttara, Dhaka - 1230, Bangladesh', 10, 20);
        doc.text(`Exported on: ${exportTime}`, 10, 30);

        const tableData = filteredInventory.map(item => [
            item.productId,
            item.productName,
            item.stockLevel,
            item.lastUpdated,
        ]);

        doc.autoTable({
            head: [['Product ID', 'Product Name', 'Stock Level', 'Last Updated']],
            body: tableData,
            startY: 40,
        });

        doc.save(`InventoryReport_${getCurrentTimestamp()}.pdf`);
    };

    // Export as Excel
    const exportAsExcel = () => {
        const exportTime = new Date().toLocaleString();
        const ws = XLSX.utils.json_to_sheet(filteredInventory, {
            header: ['productId', 'productName', 'stockLevel', 'lastUpdated'],
        });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Inventory Report');

        // Add company header
        XLSX.utils.sheet_add_aoa(ws, [
            ['Koel Modish Apparels'],
            ['Company Address: House No: 31, Road No: 17, Sector 13, Uttara, Dhaka - 1230, Bangladesh'],
            [`Exported on: ${exportTime}`],
            [],
        ], { origin: 'A1' });

        XLSX.writeFile(wb, `InventoryReport_${getCurrentTimestamp()}.xlsx`);
    };

    // Export as CSV
    const exportAsCSV = () => {
        const exportTime = new Date().toLocaleString();
        const csvData = filteredInventory.map(item => ({
            'Product ID': item.productId,
            'Product Name': item.productName,
            'Stock Level': item.stockLevel,
            'Last Updated': item.lastUpdated,
        }));

        const ws = XLSX.utils.json_to_sheet(csvData);
        const csv = XLSX.utils.sheet_to_csv(ws);

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = `InventoryReport_${getCurrentTimestamp()}.csv`;
        link.click();
    };

    return (
        <div>
            <Breadcrumb pageName="Inventory Report" />
            <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg dark:bg-boxdark">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                    Inventory Report
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

                <div className="mb-6 flex justify-end gap-4">
                    <button
                        onClick={exportAsPDF}
                        className="px-6 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
                    >
                        Export as PDF
                    </button>
                    <button
                        onClick={exportAsExcel}
                        className="px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
                    >
                        Export as Excel
                    </button>
                    <button
                        onClick={exportAsCSV}
                        className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                    >
                        Export as CSV
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse dark:border-strokedark">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-meta-4">
                                <th className="py-4 px-6 font-medium text-left text-gray-800 dark:text-white">
                                    Product ID
                                </th>
                                <th className="py-4 px-6 font-medium text-left text-gray-800 dark:text-white">
                                    Product Name
                                </th>
                                <th className="py-4 px-6 font-medium text-center text-gray-800 dark:text-white">
                                    Stock Level
                                </th>
                                <th className="py-4 px-6 font-medium text-center text-gray-800 dark:text-white">
                                    Last Updated
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInventory.length > 0 ? (
                                filteredInventory.map((item, index) => (
                                    <tr key={index} className="border-b dark:border-strokedark">
                                        <td className="py-4 px-6 text-gray-800 dark:text-white">
                                            {item.productId}
                                        </td>
                                        <td className="py-4 px-6 text-gray-800 dark:text-white">
                                            {item.productName}
                                        </td>
                                        <td className="py-4 px-6 text-center text-gray-800 dark:text-white">
                                            {item.stockLevel}
                                        </td>
                                        <td className="py-4 px-6 text-center text-gray-800 dark:text-white">
                                            {item.lastUpdated}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-4 px-6 text-center text-gray-800 dark:text-white">
                                        No inventory data available for the selected date range.
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

export default InventoryReport;
