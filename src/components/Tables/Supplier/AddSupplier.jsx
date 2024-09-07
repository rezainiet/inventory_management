import { useState } from 'react';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';

const AddSupplier = () => {
    const [supplier, setSupplier] = useState({
        name: '',
        contact: '',
        email: '',
        phone: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier({
            ...supplier,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement form submission logic here (e.g., send data to an API or update state)
        alert('Supplier added successfully');
        setSupplier({
            name: '',
            contact: '',
            email: '',
            phone: '',
            address: ''
        });
    };

    return (
        <div>
            <Breadcrumb pageName="Add Supplier" />
            <div className="max-w-5xl mx-auto p-6 bg-white rounded-md shadow-md dark:bg-boxdark">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-6">
                    Supplier Information
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Supplier Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={supplier.name}
                                    onChange={handleChange}
                                    placeholder="Supplier Name"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Contact Person
                                </label>
                                <input
                                    type="text"
                                    name="contact"
                                    value={supplier.contact}
                                    onChange={handleChange}
                                    placeholder="Contact Person"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={supplier.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={supplier.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Address
                                </label>
                                <textarea
                                    name="address"
                                    value={supplier.address}
                                    onChange={handleChange}
                                    placeholder="Address"
                                    rows="4"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                    required
                                />
                            </div>

                            <div className="flex justify-end mt-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
                                >
                                    Add Supplier
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSupplier;
