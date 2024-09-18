import React, { useState, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineEye, AiOutlineDelete, AiOutlinePrinter } from 'react-icons/ai';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import Pagination from '../../Pagination/Pagination';
import CustomModal from '../../CustomModal';
import { deleteOrder, getAllOrders, updateOrderStatus } from '../../../utils/apiUtils';
import { handlePrintInvoice } from './handlePrint';

const TrackFulfillment = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [status, setStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchOrders();
    }, [searchTerm, startDate, endDate, currentPage]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await getAllOrders({
                search: searchTerm,
                startDate,
                endDate,
                page: currentPage,
                limit: 5  // Set limit here to match your API default
            });
            if (response.orders) {
                setOrders(response.orders);
                setTotalPages(response.totalPages || 1);
            } else {
                setOrders([]);
                setTotalPages(1);
            }
        } catch (err) {
            setError('Failed to fetch orders');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
    };

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

    return (
        <div className="container mx-auto p-6 bg-white rounded-md shadow-md dark:bg-boxdark">
            <Breadcrumb pageName="Track Fulfillment" />
            <div className="flex flex-col space-y-6">
                {/* Search and Date Filters */}
                <div className="flex flex-wrap gap-4 mb-6">
                    {/* Search Input */}
                    <div className="relative w-full md:w-1/2 lg:w-1/3">
                        <input
                            type="text"
                            placeholder="Search by Order Number or Customer Name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm dark:border-strokedark dark:bg-boxdark dark:text-white w-full"
                        />
                        <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={20} />
                    </div>

                    {/* Date Filters */}
                    <div className="flex space-x-4 w-full md:w-1/2 lg:w-1/3">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="pl-4 pr-4 py-2 border border-gray-300 rounded-md shadow-sm dark:border-strokedark dark:bg-boxdark dark:text-white w-full"
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="pl-4 pr-4 py-2 border border-gray-300 rounded-md shadow-sm dark:border-strokedark dark:bg-boxdark dark:text-white w-full"
                        />
                    </div>
                </div>

                {/* Orders Table */}
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse dark:border-strokedark">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-meta-4">
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-white">Order Number</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-white">Customer Name</th>
                                <th className="py-3 px-4 text-center text-sm font-medium text-gray-700 dark:text-white">Total Amount</th>
                                <th className="py-3 px-4 text-center text-sm font-medium text-gray-700 dark:text-white">Order Date</th>
                                <th className="py-3 px-4 text-center text-sm font-medium text-gray-700 dark:text-white">Status</th>
                                <th className="py-3 px-4 text-center text-sm font-medium text-gray-700 dark:text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-4 text-gray-500 dark:text-gray-300">Loading...</td>
                                </tr>
                            ) : orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order._id} className="border-b dark:border-strokedark">
                                        <td className="py-4 px-4 text-sm font-medium text-gray-700 dark:text-white">{order.orderNumber}</td>
                                        <td className="py-4 px-4 text-sm font-medium text-gray-700 dark:text-white">{order.customerName}</td>
                                        <td className="py-4 px-4 text-sm text-center text-gray-700 dark:text-white">
                                            {order.totalAmount} <small>BDT</small>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-center text-gray-700 dark:text-white">
                                            {new Date(order.orderDate).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-center">
                                            <span
                                                className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${order.fulfillmentStatus === 'Pending'
                                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100'
                                                    : order.fulfillmentStatus === 'Shipped'
                                                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-600 dark:text-blue-100'
                                                        : 'bg-green-100 text-green-800 dark:bg-green-600 dark:text-green-100'
                                                    }`}
                                            >
                                                {order.fulfillmentStatus}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-center flex justify-center space-x-2">
                                            <AiOutlineEye
                                                className="text-blue-600 dark:text-blue-300 cursor-pointer"
                                                onClick={() => openModal(order)}
                                            />
                                            <AiOutlineDelete
                                                className="text-red-600 dark:text-red-300 cursor-pointer"
                                                onClick={() => handleDelete(order._id)}
                                            />
                                            <AiOutlinePrinter
                                                className="text-green-600 dark:text-green-300 cursor-pointer"
                                                onClick={() => handlePrintInvoice(order)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-4 text-gray-500 dark:text-gray-300">No orders found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Component */}
                <Pagination
                    page={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
            </div>

            {/* Order Detail Modal */}
            {modalOpen && (
                <CustomModal onClose={closeModal}>
                    <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Update Order Status</h3>
                        <div className="mt-4">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm dark:border-strokedark dark:bg-boxdark dark:text-white"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                        <div className="flex justify-end mt-4 space-x-2">
                            <button
                                type="button"
                                onClick={handleStatusChange}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </CustomModal>
            )}
        </div>
    );
};

export default TrackFulfillment;
