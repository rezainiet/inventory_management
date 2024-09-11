import { useState, useEffect } from 'react';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import { createOrder, getProducts } from '../../../utils/apiUtils';

const CreateOrder = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({ name: '', address: '' });
    const [totalAmount, setTotalAmount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch available products from the inventory
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productData = await getProducts();
                setProducts(productData);
                setFilteredProducts(productData); // Initially show all products
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Calculate total amount whenever orderItems changes
    useEffect(() => {
        const total = orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setTotalAmount(total);
    }, [orderItems]);

    // Handle product quantity changes
    const handleQuantityChange = (productId, quantity) => {
        setOrderItems((prevOrderItems) =>
            prevOrderItems.map(item =>
                item._id === productId ? { ...item, quantity: quantity } : item
            )
        );
    };

    // Handle adding a product to the order
    const addProductToOrder = (product) => {
        if (!orderItems.some(item => item._id === product._id)) {
            setOrderItems([...orderItems, { ...product, quantity: 1 }]);
        }
    };

    // Handle order submission
    const handleSubmitOrder = async () => {
        if (!customerInfo.name || !customerInfo.address || orderItems.length === 0) {
            alert('Please fill all customer info and select products');
            return;
        }

        const orderData = {
            orderNumber: `ORD-${Date.now()}`,  // Generate a unique order number
            customerName: customerInfo.name,
            products: orderItems.map(item => ({
                product: item._id,
                quantity: item.quantity,
                price: item.price,
            })),
            totalAmount,
            shippingAddress: customerInfo.address,
            fulfillmentStatus: 'Pending',  // Default status
        };

        try {
            await createOrder(orderData);
            alert('Order successfully created!');

            // Reset form after successful submission
            setOrderItems([]);
            setCustomerInfo({ name: '', address: '' });
            setTotalAmount(0);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    // Handle search term input and filter products
    const handleSearchChange = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(term) ||
            product.sku.toLowerCase().includes(term)
        );
        setFilteredProducts(filtered);
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-md shadow-md dark:bg-boxdark">
            <Breadcrumb pageName="Create Order" />
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-6">Create Order</h2>

            {/* Product Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by product name or SKU"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md dark:border-strokedark dark:bg-boxdark dark:text-white"
                />
            </div>

            {/* Select Products */}
            <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 dark:text-white mb-4">Select Products</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.map(product => (
                        <div key={product._id} className="bg-gray-100 dark:bg-meta-4 p-4 rounded-md flex justify-between items-center">
                            <div className="flex-1">
                                <p className="font-medium text-gray-800 dark:text-white">{product.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">SKU: {product.sku}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Stock: {product.stock}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Price: ${product.price}</p>
                            </div>
                            <button
                                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
                                onClick={() => addProductToOrder(product)}
                            >
                                Add to Order
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order Summary */}
            {orderItems.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-700 dark:text-white mb-4">Order Summary</h3>
                    <div className="space-y-4">
                        {orderItems.map(item => (
                            <div key={item._id} className="flex justify-between items-center bg-gray-100 dark:bg-meta-4 p-4 rounded-md">
                                <p className="font-medium text-gray-800 dark:text-white">{item.name}</p>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                                        className="w-20 p-2 bg-gray-100 border border-gray-300 rounded-md text-center dark:border-strokedark dark:bg-boxdark dark:text-white"
                                    />
                                    <p className="text-gray-700 dark:text-white">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-right text-lg font-medium text-gray-700 dark:text-white">
                        Total Amount: ${totalAmount.toFixed(2)}
                    </div>
                </div>
            )}

            {/* Customer Information */}
            <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 dark:text-white mb-4">Customer Information</h3>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Customer Name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md dark:border-strokedark dark:bg-boxdark dark:text-white"
                    />
                    <input
                        type="text"
                        placeholder="Shipping Address"
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md dark:border-strokedark dark:bg-boxdark dark:text-white"
                    />
                </div>
            </div>

            <div className="mt-6">
                <button
                    onClick={handleSubmitOrder}
                    className="w-full px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-600"
                >
                    Submit Order
                </button>
            </div>
        </div>
    );
};

export default CreateOrder;
