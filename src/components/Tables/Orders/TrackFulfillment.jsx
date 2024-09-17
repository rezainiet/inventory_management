import React, { useState, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineEye, AiOutlineDelete, AiOutlinePrinter } from 'react-icons/ai';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import { deleteOrder, getAllOrders, updateOrderStatus } from '../../../utils/apiUtils'; // Ensure updateOrderStatus function is available
import { handlePrintInvoice } from './handlePrint';
import CustomModal from '../../CustomModal';
import Pagination from '../../Pagination/Pagination';

const TrackFulfillment = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [status, setStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
    };

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await getAllOrders({ search: searchTerm, page: currentPage });
            if (Array.isArray(response.orders)) {
                setOrders(response.orders);
                setTotalPages(response.totalPages);
            } else {
                setOrders([]);
            }
        } catch (err) {
            setError('Failed to fetch orders');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [searchTerm, currentPage]);

    const handleDelete = async (orderId) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await deleteOrder(orderId);
                setOrders(orders.filter(order => order._id !== orderId));
            } catch (err) {
                alert('Failed to delete the order');
                console.error(err);
            }
        }
    };

    const handleStatusChange = async () => {
        if (selectedOrder && status !== selectedOrder.fulfillmentStatus) {
            try {
                await updateOrderStatus(selectedOrder._id, { status });
                setOrders(orders.map(order => order._id === selectedOrder._id ? { ...order, fulfillmentStatus: status } : order));
                setModalOpen(false);
            } catch (err) {
                alert('Failed to update order status');
                console.error(err);
            }
        }
    };

    const openModal = (order) => {
        setSelectedOrder(order);
        setStatus(order.fulfillmentStatus);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <Breadcrumb pageName="Track Fulfillment" />
            <div className="max-w-5xl mx-auto p-6 bg-white rounded-md shadow-md dark:bg-boxdark">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-6">
                    Track specific order by ID.
                </h2>

                <div className="mb-4 flex items-center justify-between border rounded">
                    <div></div>
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search by Order ID"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8 pr-4 py-2 border border-gray-300 rounded-md shadow-sm dark:border-strokedark dark:bg-boxdark dark:text-white w-full"
                        />
                        <AiOutlineSearch className="absolute left-2 top-2 text-gray-500 dark:text-gray-400" size={20} />
                    </div>
                </div>

                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto border-collapse dark:border-strokedark">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-meta-4">
                                <th className="py-4 px-6 font-medium text-left text-black dark:text-white">Order ID</th>
                                <th className="py-4 px-6 font-medium text-left text-black dark:text-white">Customer Name</th>
                                <th className="py-4 px-6 font-medium text-center text-black dark:text-white">Total Amount</th>
                                <th className="py-4 px-6 font-medium text-center text-black dark:text-white">Order Date</th>
                                <th className="py-4 px-6 font-medium text-center text-black dark:text-white">Status</th>
                                <th className="py-4 px-6 font-medium text-center text-black dark:text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order._id} className="border-b dark:border-strokedark">
                                        <td className="py-4 px-6 text-black dark:text-white">{order.orderNumber}</td>
                                        <td className="py-4 px-6 text-black dark:text-white">{order.customerName}</td>
                                        <td className="py-4 px-6 text-center text-black dark:text-white">
                                            {order.totalAmount} <small>BDT</small>
                                        </td>
                                        <td className="py-4 px-6 text-center text-black dark:text-white">
                                            {new Date(order.orderDate).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <span
                                                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${order.fulfillmentStatus === 'Pending'
                                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100'
                                                    : order.fulfillmentStatus === 'Shipped'
                                                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-600 dark:text-blue-100'
                                                        : 'bg-green-100 text-green-800 dark:bg-green-600 dark:text-green-100'
                                                    }`}
                                            >
                                                {order.fulfillmentStatus}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-center flex">
                                            <AiOutlineEye
                                                className="text-blue-600 dark:text-blue-300 cursor-pointer"
                                                onClick={() => openModal(order)}
                                            />
                                            <AiOutlineDelete
                                                className="text-red-600 dark:text-red-300 cursor-pointer ml-4"
                                                onClick={() => handleDelete(order._id)}
                                            />
                                            <AiOutlinePrinter
                                                className="text-green-600 dark:text-green-300 cursor-pointer ml-4"
                                                onClick={() => handlePrintInvoice(order)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="py-4 px-6 text-center text-gray-500 dark:text-gray-400"
                                    >
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>

            {selectedOrder && (
                <CustomModal isOpen={modalOpen} onClose={closeModal}>
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-4 dark:border-slate-600 dark:text-white">Order Details</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Order ID:</span>
                            <span className="text-gray-900 dark:text-gray-100">{selectedOrder.orderNumber}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Customer Name:</span>
                            <span className="text-gray-900 dark:text-gray-100">{selectedOrder.customerName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Total Amount:</span>
                            <span className="text-gray-900 dark:text-gray-100">{selectedOrder.totalAmount} <span>BDT</span></span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Order Date:</span>
                            <span className="text-gray-900 dark:text-gray-100">{new Date(selectedOrder.orderDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Status:</span>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md bg-white dark:bg-slate-600 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Shipping Address:</span>
                            <span className="text-gray-900 dark:text-gray-100">{selectedOrder.shippingAddress}</span>
                        </div>
                        {/* Add more details if needed */}
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleStatusChange}
                            disabled={status === selectedOrder.fulfillmentStatus}
                            className={`px-4 py-2 rounded-md text-white ${status === selectedOrder.fulfillmentStatus ? 'bg-gray-500 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-600'}`}
                        >
                            Submit Changes
                        </button>
                    </div>
                </CustomModal>
            )}
        </div>
    );
};

export default TrackFulfillment;