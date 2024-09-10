import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Sample data for export reports
const exportData = [
    {
        reportId: 'EXP001',
        reportType: 'Sales Report',
        generatedOn: 'Sep 01, 2024',
        fileType: 'PDF',
    },
    {
        reportId: 'EXP002',
        reportType: 'Inventory Report',
        generatedOn: 'Sep 02, 2024',
        fileType: 'Excel',
    },
    {
        reportId: 'EXP003',
        reportType: 'Order Report',
        generatedOn: 'Sep 03, 2024',
        fileType: 'PDF',
    },
    {
        reportId: 'EXP004',
        reportType: 'Supplier Report',
        generatedOn: 'Sep 04, 2024',
        fileType: 'Excel',
    },
];

const ExportReports = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Filter export data based on date range
    const filteredExports = exportData.filter(item => {
        const generatedOn = new Date(item.generatedOn);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return (
            (!startDate || generatedOn >= start) &&
            (!endDate || generatedOn <= end)
        );
    });

    // Export as PDF
    const exportAsPDF = () => {
        const doc = new jsPDF();
        const exportTime = new Date().toLocaleString();

        doc.text('Koel Modish Apparels', 10, 10);
        doc.text('Company Address: House No: 31, Road No: 17, Sector 13, Uttara, Dhaka - 1230, Bangladesh', 10, 20);
        doc.text(`Exported on: ${exportTime}`, 10, 30);

        const tableData = filteredExports.map(item => [
            item.reportId,
            item.reportType,
            item.generatedOn,
            item.fileType,
        ]);

        doc.autoTable({
            head: [['Report ID', 'Report Type', 'Generated On', 'File Type']],
            body: tableData,
            startY: 40,
        });

        doc.save('ExportReports.pdf');
    };

    // Export as Excel
    const exportAsExcel = () => {
        const exportTime = new Date().toLocaleString();
        const ws = XLSX.utils.json_to_sheet(filteredExports, {
            header: ['reportId', 'reportType', 'generatedOn', 'fileType'],
        });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Export Reports');

        XLSX.utils.sheet_add_aoa(ws, [
            ['Koel Modish Apparels'],
            ['Company Address: House No: 31, Road No: 17, Sector 13, Uttara, Dhaka - 1230, Bangladesh'],
            [`Exported on: ${exportTime}`],
            [],
        ], { origin: 'A1' });

        XLSX.writeFile(wb, 'ExportReports.xlsx');
    };

    return (
        <div>
            <Breadcrumb pageName="Export Reports" />
            <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg dark:bg-boxdark">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                    Export Reports
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
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse dark:border-strokedark">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-meta-4">
                                <th className="py-4 px-6 font-medium text-left text-gray-800 dark:text-white">
                                    Report ID
                                </th>
                                <th className="py-4 px-6 font-medium text-left text-gray-800 dark:text-white">
                                    Report Type
                                </th>
                                <th className="py-4 px-6 font-medium text-center text-gray-800 dark:text-white">
                                    Generated On
                                </th>
                                <th className="py-4 px-6 font-medium text-center text-gray-800 dark:text-white">
                                    File Type
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredExports.length > 0 ? (
                                filteredExports.map((item, index) => (
                                    <tr key={index} className="border-b dark:border-strokedark">
                                        <td className="py-4 px-6 text-gray-800 dark:text-white">
                                            {item.reportId}
                                        </td>
                                        <td className="py-4 px-6 text-gray-800 dark:text-white">
                                            {item.reportType}
                                        </td>
                                        <td className="py-4 px-6 text-center text-gray-800 dark:text-white">
                                            {item.generatedOn}
                                        </td>
                                        <td className="py-4 px-6 text-center text-gray-800 dark:text-white">
                                            {item.fileType}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-4 px-6 text-center text-gray-800 dark:text-white">
                                        No reports available for the selected date range.
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

export default ExportReports;
