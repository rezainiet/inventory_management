import { useState } from 'react';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';

// Sample data for products in stock
const productStockData = [
    {
        id: 1,
        name: 'Apple Watch Series 7',
        sku: 'AW-203',
        stock: 20,
        threshold: 10, // Low stock threshold
    },
    {
        id: 2,
        name: 'Macbook Pro M1',
        sku: 'MBP-543',
        stock: 5,
        threshold: 10,
    },
    {
        id: 3,
        name: 'Dell Inspiron 15',
        sku: 'DI-786',
        stock: 2,
        threshold: 5,
    },
    {
        id: 4,
        name: 'HP Probook 450',
        sku: 'HPB-920',
        stock: 0,
        threshold: 5,
    },
];

const StockTracking = () => {
    const [stockData, setStockData] = useState(productStockData);
    const [adjustmentAmount, setAdjustmentAmount] = useState({}); // Track adjustment amounts

    const handleStockChange = (id, amount) => {
        setStockData(stockData.map((product) =>
            product.id === id
                ? {
                    ...product,
                    stock: product.stock + amount >= 0 ? product.stock + amount : 0,
                }
                : product
        ));
    };

    const handleAmountChange = (id, value) => {
        setAdjustmentAmount({
            ...adjustmentAmount,
            [id]: value,
        });
    };

    const getStockStatus = (product) => {
        if (product.stock === 0) {
            return 'Out of Stock';
        } else if (product.stock <= product.threshold) {
            return 'Low Stock';
        } else {
            return 'In Stock';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Stock':
                return 'bg-green-100 text-green-600';
            case 'Low Stock':
                return 'bg-yellow-100 text-yellow-600';
            case 'Out of Stock':
                return 'bg-red-100 text-red-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div>
            <Breadcrumb pageName="Stock Tracking" />
            <div className="max-w-5xl mx-auto p-6 bg-white rounded-md shadow-md dark:bg-boxdark">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-6">
                    Stock Tracking
                </h2>

                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-meta-4">
                                <th className="py-4 px-6 font-medium text-left text-black dark:text-white">
                                    Product Name
                                </th>
                                <th className="py-4 px-6 font-medium text-left text-black dark:text-white">
                                    SKU
                                </th>
                                <th className="py-4 px-6 font-medium text-center text-black dark:text-white">
                                    Current Stock
                                </th>
                                <th className="py-4 px-6 font-medium text-center text-black dark:text-white">
                                    Stock Status
                                </th>
                                <th className="py-4 px-6 font-medium text-center text-black dark:text-white">
                                    Adjust Stock
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {stockData.map((product) => (
                                <tr key={product.id} className="border-b dark:border-strokedark">
                                    <td className="py-4 px-6 text-black dark:text-white">
                                        {product.name}
                                    </td>
                                    <td className="py-4 px-6 text-black dark:text-white">
                                        {product.sku}
                                    </td>
                                    <td className="py-4 px-6 text-center text-black dark:text-white">
                                        {product.stock}
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                                getStockStatus(product)
                                            )}`}
                                        >
                                            {getStockStatus(product)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            {/* Input field for adjustment amount */}
                                            <input
                                                type="number"
                                                value={adjustmentAmount[product.id] || ''}
                                                onChange={(e) => handleAmountChange(product.id, Number(e.target.value))}
                                                min="0"
                                                className="w-24 px-2 py-1 text-center border border-gray-300 rounded-md dark:border-strokedark"
                                                placeholder="Amount"
                                            />
                                            {/* Decrease Stock Button */}
                                            <button
                                                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                                                onClick={() => handleStockChange(product.id, -(adjustmentAmount[product.id] || 0))}
                                            >
                                                -
                                            </button>

                                            {/* Increase Stock Button */}
                                            <button
                                                className="px-3 py-1 bg-primary hover:bg-blue-600 text-white rounded-md"
                                                onClick={() => handleStockChange(product.id, adjustmentAmount[product.id] || 0)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StockTracking;
