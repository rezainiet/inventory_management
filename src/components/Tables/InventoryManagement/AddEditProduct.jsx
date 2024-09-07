import { useState } from 'react';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';

const AddEditProduct = () => {
    const [isEditMode, setIsEditMode] = useState(false); // Add/Edit mode toggle

    // Initial state for the form
    const [productData, setProductData] = useState({
        name: '',
        sku: '',
        stock: 0,
        price: 0.0,
        category: '',
        status: 'In Stock',
        image: null,
    });

    // Handles form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    // Handles form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            // Logic for updating an existing product
            console.log('Product updated:', productData);
        } else {
            // Logic for adding a new product
            console.log('Product added:', productData);
        }
    };

    return (
        <div>
            <Breadcrumb pageName="Add/Edit Product" />
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md dark:bg-boxdark">
                {/* Toggle buttons for Add or Edit */}
                <div className="flex justify-center mb-6">
                    <button
                        className={`px-6 py-2 mx-2 rounded-md font-semibold text-sm focus:outline-none transition-colors duration-200 ${!isEditMode
                            ? 'bg-indigo-500 text-white'
                            : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white'
                            }`}
                        onClick={() => setIsEditMode(false)}
                    >
                        Add Product
                    </button>
                    <button
                        className={`px-6 py-2 mx-2 rounded-md font-semibold text-sm focus:outline-none transition-colors duration-200 ${isEditMode
                            ? 'bg-indigo-500 text-white'
                            : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white'
                            }`}
                        onClick={() => setIsEditMode(true)}
                    >
                        Edit Product
                    </button>
                </div>

                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                    {isEditMode ? 'Edit Product' : 'Add Product'}
                </h2>

                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                Product Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={productData.name}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                                placeholder="Enter product name"
                            />
                        </div>

                        {/* SKU */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                SKU
                            </label>
                            <input
                                type="text"
                                name="sku"
                                value={productData.sku}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                                placeholder="Enter SKU"
                            />
                        </div>

                        {/* Stock */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                Stock
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={productData.stock}
                                onChange={handleInputChange}
                                min="0"
                                required
                                className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                                placeholder="Enter stock quantity"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={productData.price}
                                onChange={handleInputChange}
                                min="0.00"
                                step="0.01"
                                required
                                className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                                placeholder="Enter product price"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                Category
                            </label>
                            <select
                                name="category"
                                value={productData.category}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                            >
                                <option value="">Select Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Computers">Computers</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Home">Home</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                Status
                            </label>
                            <select
                                name="status"
                                value={productData.status}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                            >
                                <option value="In Stock">In Stock</option>
                                <option value="Low Stock">Low Stock</option>
                                <option value="Out of Stock">Out of Stock</option>
                            </select>
                        </div>

                        {/* Product Image */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                Product Image
                            </label>
                            <input
                                type="file"
                                name="image"
                                onChange={(e) => setProductData({ ...productData, image: e.target.files[0] })}
                                accept="image/*"
                                className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-600"
                        >
                            {isEditMode ? 'Update Product' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditProduct;
