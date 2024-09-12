import { useState, useEffect } from 'react';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
import { getOrders, deleteOrder, updateOrderStatus } from '../../../utils/apiUtils';
import Pagination from '../../Pagination/Pagination';
import CustomModal from '../../CustomModal';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState(null); // Added state for selected order
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Fetch orders from API with search, pagination, and date filtering
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const { orders, totalPages } = await getOrders({
                    search: searchQuery,
                    page,
                    limit: 5,
                    startDate,
                    endDate
                });
                setOrders(orders);
                setTotalPages(totalPages);
            } catch (error) {
                setError('Failed to fetch orders');
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [searchQuery, page, startDate, endDate]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        if (name === 'startDate') {
            setStartDate(value);
        } else {
            setEndDate(value);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const openModal = (order) => {
        setSelectedOrder(order); // Set the selected order
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedOrder(null); // Clear selected order when closing modal
    };

    const handleDeleteOrder = async (orderId) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await deleteOrder(orderId);
                // Refresh orders after deletion
                const { orders, totalPages } = await getOrders({
                    search: searchQuery,
                    page,
                    limit: 5,
                    startDate,
                    endDate
                });
                setOrders(orders);
                setTotalPages(totalPages);
            } catch (error) {
                console.error('Error deleting order:', error);
            }
        }
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            // Call API to update order status
            const result = await updateOrderStatus(orderId, { fulfillmentStatus: newStatus });
            console.log(result);
            alert('Order status updated successfully!');
            // Refresh orders after updating
            const { orders, totalPages } = await getOrders({
                search: searchQuery,
                page,
                limit: 5,
                startDate,
                endDate
            });
            setOrders(orders);
            setTotalPages(totalPages);
            closeModal(); // Close the modal after updating
        } catch (error) {
            console.error('Failed to update order status:', error);
            alert('Failed to update order status');
        }
    };



    if (loading) {
        return <p>Loading orders...</p>;
    }

    if (error) {
        return <p className='text-red-400'><strong>{error}</strong></p>;
    }

    return (
        <>
            <Breadcrumb pageName="Order List" />

            {/* Search and Filters */}
            <div className="mb-4 flex flex-wrap gap-4">
                <input
                    type="text"
                    placeholder="Search by Order Number or Customer Name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="px-4 py-2 border border-gray-300 rounded-md dark:border-strokedark dark:bg-boxdark dark:text-white"
                />

                <input
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={handleDateChange}
                    className="px-4 py-2 border border-gray-300 rounded-md dark:border-strokedark dark:bg-boxdark dark:text-white"
                />

                <input
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={handleDateChange}
                    className="px-4 py-2 border border-gray-300 rounded-md dark:border-strokedark dark:bg-boxdark dark:text-white"
                />
            </div>

            {/* Orders Table */}
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 ">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Order Number
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Customer Name
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Total Amount
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Order Date
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Status
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {order.orderNumber}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {order.customerName}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {order.totalAmount.toFixed(2)} <small>BDT</small>
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {new Date(order.orderDate).toLocaleDateString()}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p
                                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${order.fulfillmentStatus === 'Shipped'
                                                ? 'bg-success text-success'
                                                : order.fulfillmentStatus === 'Pending'
                                                    ? 'bg-warning text-warning'
                                                    : order.fulfillmentStatus === 'Delivered'
                                                        ? 'bg-info text-info'
                                                        : 'bg-danger text-danger'
                                                }`}
                                        >
                                            {order.fulfillmentStatus}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <button className="hover:text-primary" onClick={() => openModal(order)}>
                                                <FaEye className="w-5 h-5 text-gray-500" />
                                            </button>
                                            <button className="hover:text-primary">
                                                <FaEdit className="w-5 h-5 text-gray-500" />
                                            </button>
                                            <button className="hover:text-primary" onClick={() => handleDeleteOrder(order._id)}>
                                                <FaTrashAlt className="w-5 h-5 text-gray-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Component */}
                <Pagination page={page} totalPages={totalPages} handlePageChange={handlePageChange} />
            </div>

            {/* Order Summary Custom Modal */}
            {selectedOrder && (
                <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center">
                            <FaEye className="mr-2 text-blue-500" /> Order Summary
                        </h2>
                        <div className="space-y-4">
                            <div className="border-b pb-3">
                                <p className="flex items-center">
                                    <span className="font-semibold w-32">Order Number:</span>
                                    {selectedOrder.orderNumber}
                                </p>
                                <p className="flex items-center">
                                    <span className="font-semibold w-32">Customer Name:</span>
                                    {selectedOrder.customerName}
                                </p>
                            </div>
                            <div className="border-b pb-3">
                                <p className="flex items-center">
                                    <span className="font-semibold w-32">Total Amount:</span>
                                    ${selectedOrder.totalAmount.toFixed(2)}
                                </p>
                                <p className="flex items-center">
                                    <span className="font-semibold w-32">Order Date:</span>
                                    {new Date(selectedOrder.orderDate).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="pt-3">
                                <p className="flex items-center">
                                    <span className="font-semibold w-32">Status:</span>
                                    <span className={`rounded-full py-1 px-3 ${selectedOrder.fulfillmentStatus === 'Shipped' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                        {selectedOrder.fulfillmentStatus}
                                    </span>
                                </p>
                                {/* Update Status Dropdown */}
                                <div className="mt-3">
                                    <label htmlFor="statusUpdate" className="font-semibold w-32">Update Status:</label>
                                    <select
                                        id="statusUpdate"
                                        value={selectedOrder.fulfillmentStatus} // default to current status
                                        onChange={(e) => setSelectedOrder({ ...selectedOrder, fulfillmentStatus: e.target.value })} // update state
                                        className="ml-2 border border-gray-300 rounded-md px-4 py-2"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>

                            {/* Save Changes Button */}
                            <div className="mt-4">
                                <button
                                    onClick={() => handleUpdateOrderStatus(selectedOrder._id, selectedOrder.fulfillmentStatus)} // trigger update
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </CustomModal>

            )}
        </>
    );
};

export default OrderList;
