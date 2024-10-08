import { useState, useEffect } from 'react';
import { getSuppliers } from '../../../utils/apiUtils';
import { Search, Edit, Trash2, Plus, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSuppliers();
                setSuppliers(data);
            } catch (err) {
                setError('Error fetching suppliers');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (field) => {
        if (field === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const handleClickOnAddSupplier = () => {
        navigate('/supplier/add', { replace: true });
    }

    const filteredSuppliers = suppliers
        .filter((supplier) =>
            supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.phone.includes(searchTerm)
        )
        .sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
            if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="w-8 h-8 animate-spin text-indigo-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-4">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Supplier List</h2>
                <button onClick={handleClickOnAddSupplier} className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300 flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Supplier
                </button>
            </div>

            <div className="mb-6 relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search by name, email, or phone"
                    className="w-full px-4 py-2 pl-10 border border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            </div>

            <div className="overflow-x-auto bg-white dark:bg-slate-800 shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-700">
                        <tr>
                            {['Name', 'Contact', 'Email', 'Phone', 'Address', 'Actions'].map((header) => (
                                <th
                                    key={header}
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort(header.toLowerCase())}
                                >
                                    {header}
                                    {sortBy === header.toLowerCase() && (
                                        <span className="ml-1">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200 dark:bg-slate-800 dark:divide-slate-700">
                        {filteredSuppliers.map((supplier) => (
                            <tr key={supplier._id} className="hover:bg-slate-100 dark:hover:bg-slate-700 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-slate-900 dark:text-white">{supplier.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-500 dark:text-slate-300">{supplier.contactPerson}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-500 dark:text-slate-300">{supplier.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-500 dark:text-slate-300">{supplier.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-500 dark:text-slate-300">{supplier.address}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3">
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SupplierList;