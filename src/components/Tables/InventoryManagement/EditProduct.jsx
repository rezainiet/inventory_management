import { useState, useEffect } from 'react';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';

// Mock function to fetch products, replace with your API call
const fetchProducts = async () => {
    return [
        { _id: 'productId1', name: 'Product 1', colors: ['Red'], sizes: ['M'], description: 'A nice product', stock: 20, price: 100, supplier: 'supplierId1', image: 'https://via.placeholder.com/150' },
        { _id: 'productId2', name: 'Product 2', colors: ['Blue'], sizes: ['L'], description: 'Another nice product', stock: 10, price: 200, supplier: 'supplierId2', image: 'https://via.placeholder.com/150' },
    ];
};

// Mock function to fetch suppliers, replace with your API call
const fetchSuppliers = async () => {
    return [
        { _id: 'supplierId1', name: 'Supplier 1' },
        { _id: 'supplierId2', name: 'Supplier 2' },
    ];
};

const EditProduct = () => {
    const [productData, setProductData] = useState({
        name: '',
        colors: [],
        sizes: [],
        stock: 0,
        price: 0,
        supplier: '',
        image: '',
        description: '',
    });
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [colorInput, setColorInput] = useState('');
    const [sizeInput, setSizeInput] = useState('');

    // Fetch products and suppliers on component mount
    useEffect(() => {
        const loadProductsAndSuppliers = async () => {
            const fetchedProducts = await fetchProducts();
            const fetchedSuppliers = await fetchSuppliers();
            setProducts(fetchedProducts);
            setSuppliers(fetchedSuppliers);
        };
        loadProductsAndSuppliers();
    }, []);

    // Handles product selection change
    const handleProductChange = async (e) => {
        const selectedProductId = e.target.value;
        setSelectedProduct(selectedProductId);
        const product = products.find(p => p._id === selectedProductId);
        if (product) {
            setProductData({
                ...productData,
                name: product.name,
                colors: product.colors,
                sizes: product.sizes,
                stock: product.stock,
                price: product.price,
                supplier: product.supplier,
                image: product.image,
                description: product.description,
            });
        }
    };

    // Handles form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    // Handle color input changes
    const handleColorChange = (e) => {
        setColorInput(e.target.value);
    };

    // Handle size input changes
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
        console.log('Product updated:', productData);
    };

    return (
        <div>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md dark:bg-boxdark">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                    Edit Product
                </h2>

                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6">
                        {/* Select Product */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white">
                                Select Product
                            </label>
                            <select
                                value={selectedProduct}
                                onChange={handleProductChange}
                                required
                                className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400 dark:bg-boxdark dark:border-strokedark dark:focus:ring-indigo-500"
                            >
                                <option value="">Select Product</option>
                                {products.map((product) => (
                                    <option key={product._id} value={product._id}>
                                        {product.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Name */}
                        <div>
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

                        {/* Available Colors */}
                        <div>
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
                        <div>
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
                            Update Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
