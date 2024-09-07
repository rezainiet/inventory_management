import { useState } from 'react';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';

// Sample data for suppliers
const supplierData = [
    {
        id: 1,
        name: 'Tech Supplies Inc.',
        contact: 'John Doe',
        email: 'john@techsupplies.com',
        phone: '123-456-7890',
        address: '123 Tech Road, Silicon Valley, CA'
    },
    {
        id: 2,
        name: 'Gadget World LLC',
        contact: 'Jane Smith',
        email: 'jane@gadgetworld.com',
        phone: '234-567-8901',
        address: '456 Gadget Lane, New York, NY'
    },
    {
        id: 3,
        name: 'Hardware Hub',
        contact: 'Alice Johnson',
        email: 'alice@hardwarehub.com',
        phone: '345-678-9012',
        address: '789 Hardware Blvd, Austin, TX'
    },
    // Add more supplier data as needed
];

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState(supplierData);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter suppliers based on the search term
    const filteredSuppliers = suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.phone.includes(searchTerm)
    );

    return (
        <div>
            <Breadcrumb pageName="Supplier List" />
            <div className="max-w-5xl mx-auto p-6 bg-white rounded-md shadow-md dark:bg-boxdark">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-6">
                    Supplier List
                </h2>

                <div className="mb-6">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search by name, email, or phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md dark:border-strokedark dark:bg-boxdark dark:text-white"
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredSuppliers.map((supplier) => (
                        <div key={supplier.id} className="bg-white dark:bg-boxdark border border-gray-200 rounded-lg shadow-md p-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{supplier.name}</h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Contact: {supplier.contact}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Email: {supplier.email}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Phone: {supplier.phone}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Address: {supplier.address}</p>

                            <div className="mt-4 flex justify-end">
                                <button
                                    className="px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md"
                                    onClick={() => alert(`Edit supplier ${supplier.name}`)} // Replace with actual edit functionality
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SupplierList;
