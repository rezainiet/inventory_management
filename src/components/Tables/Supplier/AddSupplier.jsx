import { useState } from 'react';
import { addSupplier } from '../../../utils/apiUtils';

const AddSupplier = () => {
    const [supplier, setSupplier] = useState({
        name: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier({
            ...supplier,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            await addSupplier(supplier);
            setSuccessMessage('Supplier added successfully!');
            setSupplier({
                name: '',
                contactPerson: '',
                email: '',
                phone: '',
                address: ''
            });
        } catch (error) {
            setErrorMessage(error.message || 'Failed to add supplier');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">Add New Supplier</h2>

            {successMessage && (
                <div className="mb-4 p-4 bg-green-100 dark:bg-green-800 border-l-4 border-green-500 text-green-700 dark:text-green-200">
                    <p>{successMessage}</p>
                </div>
            )}

            {errorMessage && (
                <div className="mb-4 p-4 bg-red-100 dark:bg-red-800 border-l-4 border-red-500 text-red-700 dark:text-red-200">
                    <p>{errorMessage}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Supplier Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={supplier.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                            placeholder="Enter supplier name"
                        />
                    </div>
                    <div>
                        <label htmlFor="contactPerson" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Contact Person
                        </label>
                        <input
                            type="text"
                            id="contactPerson"
                            name="contactPerson"
                            value={supplier.contactPerson}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                            placeholder="Enter contact person's name"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={supplier.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                            placeholder="Enter email address"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={supplier.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                            placeholder="Enter phone number"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Address
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        value={supplier.address}
                        onChange={handleChange}
                        required
                        rows="3"
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                        placeholder="Enter supplier's address"
                    ></textarea>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-3 bg-indigo-600 text-white rounded-md font-medium ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-slate-800`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Adding Supplier...
                            </span>
                        ) : (
                            'Add Supplier'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddSupplier;