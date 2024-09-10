import { useEffect, useState } from 'react';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';

// Mock function to fetch suppliers, replace with your API call
const fetchSuppliers = async () => {
    // Example suppliers, replace with actual data fetching logic
    return [
        { _id: 'supplierId1', name: 'Supplier 1' },
        { _id: 'supplierId2', name: 'Supplier 2' },
    ];
};

const AddProduct = () => {
    const [productData, setProductData] = useState({
        type: '',
        name: '',
        colors: [],
        sizes: [],
        stock: 0,          // Replace quantity with stock
        price: 0,          // Pricing per quantity
        supplier: '',       // Supplier selection
        image: '',          // Image link input
        description: '',
    });

    const [suppliers, setSuppliers] = useState([]);
    const [colorInput, setColorInput] = useState('');
    const [sizeInput, setSizeInput] = useState('');

    // Fetch product types and suppliers on component mount
    useEffect(() => {
        const loadSuppliers = async () => {
            const fetchedSuppliers = await fetchSuppliers();
            setSuppliers(fetchedSuppliers);
        };
        loadSuppliers();
    }, []);

    // Handles form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    // Handles color input changes
    const handleColorChange = (e) => {
        setColorInput(e.target.value);
    };

    // Handles size input changes
    const handleSizeChange = (e) => {
        setSizeInput(e.target.value);
    };

    // Add color to the colors array
    const addColor = () => {
        if (colorInput && !productData.colors.includes(colorInput)) {
            setProductData({
                ...productData,
                colors: [...productData.colors, colorInput],
            });
            setColorInput('');
        }
    };

    // Add size to the sizes array
    const addSize = () => {
        if (sizeInput && !productData.sizes.includes(sizeInput)) {
            setProductData({
                ...productData,
                sizes: [...productData.sizes, sizeInput],
            });
            setSizeInput('');
        }
    };

    // Remove color from the colors array
    const removeColor = (color) => {
        setProductData({
            ...productData,
            colors: productData.colors.filter(c => c !== color),
        });
    };

    // Remove size from the sizes array
    const removeSize = (size) => {
        setProductData({
            ...productData,
            sizes: productData.sizes.filter(s => s !== size),
        });
    };

    // Handles form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Product added:', productData);
    };

    return (
        <div>

            <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md dark:bg-boxdark">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                    Add Product
                </h2>

                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6">
                        <div className='flex items-center justify-center gap-5'>

                            {/* Name */}
                            <div className='w-full'>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Name
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
                            {/* Product Type */}
                            <div className='w-full'>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Product Type
                                </label>
                                <select
                                    name="type"
                                    value={productData.type}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                                >
                                    <option value="">Select Product Type</option>
                                    {/* Example categories */}
                                    <option value="tshirt">T-Shirt</option>
                                    <option value="leather">Leather</option>
                                </select>
                            </div>
                        </div>



                        <div className='flex w-full gap-5'>

                            {/* Available Colors */}
                            <div className='w-full'>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Available Colors
                                </label>
                                <input
                                    type="text"
                                    value={colorInput}
                                    onChange={handleColorChange}
                                    className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                                    placeholder="Enter color"
                                />
                                <button
                                    type="button"
                                    onClick={addColor}
                                    className="mt-2 px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-600"
                                >
                                    Add Color
                                </button>
                                <div className="mt-2">
                                    {productData.colors.map((color) => (
                                        <span key={color} className="inline-flex items-center px-3 py-1 mr-2 text-sm font-medium text-white bg-indigo-500 rounded-full dark:bg-indigo-700">
                                            {color}
                                            <button
                                                type="button"
                                                onClick={() => removeColor(color)}
                                                className="ml-2 text-gray-300 hover:text-white"
                                            >
                                                &times;
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Available Sizes */}
                            <div className='w-full'>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Available Sizes
                                </label>
                                <input
                                    type="text"
                                    value={sizeInput}
                                    onChange={handleSizeChange}
                                    className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                                    placeholder="Enter size"
                                />
                                <button
                                    type="button"
                                    onClick={addSize}
                                    className="mt-2 px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-600"
                                >
                                    Add Size
                                </button>
                                <div className="mt-2">
                                    {productData.sizes.map((size) => (
                                        <span key={size} className="inline-flex items-center px-3 py-1 mr-2 text-sm font-medium text-white bg-indigo-500 rounded-full dark:bg-indigo-700">
                                            {size}
                                            <button
                                                type="button"
                                                onClick={() => removeSize(size)}
                                                className="ml-2 text-gray-300 hover:text-white"
                                            >
                                                &times;
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                        <div className='flex w-full gap-5'>
                            {/* Stock */}
                            <div className='w-full'>
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

                            {/* Price per Quantity */}
                            <div className='w-full'>
                                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Price per Quantity
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={productData.price}
                                    onChange={handleInputChange}
                                    min="0"
                                    required
                                    className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                                    placeholder="Enter price"
                                />
                            </div>
                        </div>

                        {/* Supplier */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                Supplier
                            </label>
                            <select
                                name="supplier"
                                value={productData.supplier}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                            >
                                <option value="">Select Supplier</option>
                                {suppliers.map((supplier) => (
                                    <option key={supplier._id} value={supplier._id}>
                                        {supplier.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Image Link */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                Image Link
                            </label>
                            <input
                                type="text"
                                name="image"
                                value={productData.image}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                                placeholder="Enter image URL"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={productData.description}
                                onChange={handleInputChange}
                                rows="4"
                                className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                                placeholder="Enter product description"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-600"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default AddProduct;