import { useState, useEffect } from 'react';
import { createOrder, getProducts, createSteadfastOrder } from '../../../utils/apiUtils';
import { X, Plus, Minus, ShoppingCart, User, CreditCard, FileText, Search } from 'lucide-react';

const CreateOrder = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', email: '', address: '' });
    const [totalAmount, setTotalAmount] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [tax, setTax] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [notes, setNotes] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('products');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productData = await getProducts();
                setProducts(productData);
                setFilteredProducts(productData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const total = orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setTotalAmount(total);
        setFinalAmount(total - discount + tax);
    }, [orderItems, discount, tax]);

    const handleQuantityChange = (productId, change) => {
        setOrderItems((prevOrderItems) =>
            prevOrderItems.map(item =>
                item._id === productId
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const addProductToOrder = (product) => {
        if (!orderItems.some(item => item._id === product._id)) {
            setOrderItems([...orderItems, { ...product, quantity: 1 }]);
        }
    };

    const removeProductFromOrder = (productId) => {
        setOrderItems(orderItems.filter(item => item._id !== productId));
    };

    const handleSubmitOrder = async () => {
        if (!customerInfo.name || !customerInfo.phone || !customerInfo.address || orderItems.length === 0 || !paymentMethod) {
            alert('Please fill all required fields and select products');
            return;
        }

        const orderData = {
            orderNumber: `ORD-${Date.now()}`,
            customerName: customerInfo.name,
            customerPhone: customerInfo.phone,
            customerEmail: customerInfo.email,
            products: orderItems.map(item => ({
                product: item._id,
                quantity: item.quantity,
                price: item.price,
            })),
            totalAmount,
            discount,
            tax,
            finalAmount,
            shippingAddress: customerInfo.address,
            paymentMethod,
            notes,
            fulfillmentStatus: 'Pending',
        };

        const steadfastData = {
            invoice: orderData.orderNumber,
            recipient_name: customerInfo.name,
            recipient_phone: customerInfo.phone,
            recipient_address: customerInfo.address,
            cod_amount: finalAmount,
            note: notes,
        };

        try {
            const successOrder = await createOrder(orderData);
            console.log(successOrder);

            if (paymentMethod === 'SteadFast') {
                const apiResponse = await createSteadfastOrder(steadfastData);
                console.log(apiResponse);
            }

            alert('Order successfully created!');
            resetForm();
        } catch (error) {
            alert(error.response?.data?.message || 'Error creating order');
        }
    };

    const resetForm = () => {
        setOrderItems([]);
        setCustomerInfo({ name: '', phone: '', email: '', address: '' });
        setDiscount(0);
        setTax(0);
        setPaymentMethod('');
        setNotes('');
        setTotalAmount(0);
        setFinalAmount(0);
    };

    const handleSearchChange = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(term) ||
            product.sku.toLowerCase().includes(term) ||
            product.price.toLowerCase().includes(term)
        );
        setFilteredProducts(filtered);
    };
    return (
        <div className="max-w-7xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">Create Order</h2>

            <div className="flex mb-6 space-x-4">
                {['products', 'customer', 'payment'].map((tab) => (
                    <button
                        key={tab}
                        className={`flex-1 py-3 px-4 rounded-t-lg transition duration-300 ${activeTab === tab
                            ? 'bg-indigo-500 text-white'
                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === 'products' && <ShoppingCart className="inline-block mr-2" />}
                        {tab === 'customer' && <User className="inline-block mr-2" />}
                        {tab === 'payment' && <CreditCard className="inline-block mr-2" />}
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <div className="flex h-[calc(100vh-250px)]">
                <div className="w-2/3 pr-6 overflow-y-auto">
                    {activeTab === 'products' && (
                        <>
                            <div className="mb-6 relative ml-1 mt-1">
                                <input
                                    type="text"
                                    placeholder="Search by product name or SKU"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="w-full px-4 py-2 pl-10 border border-slate-300 rounded-md   dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredProducts.map(product => (
                                    <div key={product._id} className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg flex flex-col justify-between h-48">
                                        <div>
                                            <h3 className="font-semibold text-slate-800 dark:text-white">{product.name}</h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">SKU: {product.sku}</p>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">Stock: {product.stock}</p>
                                            <p className="text-sm font-medium text-slate-800 dark:text-white">Price: ৳{product.price}</p>
                                        </div>
                                        <button
                                            className="mt-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition duration-300"
                                            onClick={() => addProductToOrder(product)}
                                        >
                                            Add to Order
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {activeTab === 'customer' && (
                        <div className="space-y-4 ml-1">
                            {['name', 'phone', 'email'].map((field) => (
                                <div key={field} className="flex flex-col">
                                    <label htmlFor={field} className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                    <input
                                        type={field === 'email' ? 'email' : 'text'}
                                        id={field}
                                        value={customerInfo[field]}
                                        onChange={(e) => setCustomerInfo({ ...customerInfo, [field]: e.target.value })}
                                        className="px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-400 transition-all ease-in-out duration-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                    />
                                </div>
                            ))}
                            <div className="flex flex-col">
                                <label htmlFor="address" className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    value={customerInfo.address}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                                    rows={4}
                                    className="px-4 py-2 border border-slate-300 rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'payment' && (
                        <div className="space-y-6 ml-1">
                            <div className="flex flex-col">
                                <label htmlFor="paymentMethod" className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Payment Method
                                </label>
                                <select
                                    id="paymentMethod"
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="px-4 py-2 border border-slate-300 rounded-md   dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                >
                                    <option value="">Select payment method</option>
                                    <option value="Cash">Cash</option>
                                    <option value="SteadFast">SteadFast</option>
                                </select>
                            </div>
                            {['discount', 'tax'].map((field) => (
                                <div key={field} className="flex flex-col">
                                    <label htmlFor={field} className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                    <input
                                        type="number"
                                        id={field}
                                        min="0"
                                        value={field === 'discount' ? discount : tax}
                                        onChange={(e) => field === 'discount' ? setDiscount(parseFloat(e.target.value) || 0) : setTax(parseFloat(e.target.value) || 0)}
                                        className="px-4 py-2 border border-slate-300 rounded-md   dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                    />
                                </div>
                            ))}
                            <div className="flex flex-col">
                                <label htmlFor="notes" className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Notes
                                </label>
                                <textarea
                                    id="notes"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={4}
                                    className="px-4 py-2 border border-slate-300 rounded-md   dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-1/3 bg-slate-50 dark:bg-slate-700 p-4 rounded-lg overflow-y-auto">
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Order Summary</h3>
                    {orderItems.map(item => (
                        <div key={item._id} className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-600">
                            <div className="flex-1">
                                <p className="font-medium text-slate-800 dark:text-white">{item.name}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-300">Price: ৳{item.price}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button onClick={() => handleQuantityChange(item._id, -1)} className="p-1 bg-slate-200 dark:bg-slate-600 rounded">
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-medium">{item.quantity}</span>
                                <button onClick={() => handleQuantityChange(item._id, 1)} className="p-1 bg-slate-200 dark:bg-slate-600 rounded">
                                    <Plus className="w-4 h-4" />
                                </button>
                                <button onClick={() => removeProductFromOrder(item._id)} className="p-1 bg-red-500 text-white rounded">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4 space-y-2">
                        <p className="text-lg font-semibold text-slate-800 dark:text-white">Subtotal: ৳{totalAmount.toFixed(2)}</p>
                        <p className="text-slate-600 dark:text-slate-300">Discount: ৳{discount.toFixed(2)}</p>
                        <p className="text-slate-600 dark:text-slate-300">Tax: ৳{tax.toFixed(2)}</p>
                        <p className="text-xl font-bold text-slate-800 dark:text-white">Total: ৳{finalAmount.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleSubmitOrder}
                    className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition duration-300 flex items-center"
                >
                    <FileText className="mr-2" />
                    Submit Order
                </button>
            </div>
        </div>
    );
};

export default CreateOrder;