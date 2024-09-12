import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Pagination = ({ page, totalPages, handlePageChange }) => {
    return (
        <div className="mt-4 flex items-center justify-between mb-5">
            {/* Previous Button */}
            <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className={`flex items-center px-4 py-2 rounded-md transition-all duration-300 ease-in-out 
                ${page === 1 ? "bg-gray-300 cursor-not-allowed text-gray-500 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white dark:disabled:text-gray-500 border" : "bg-teal-500 hover:bg-teal-600 text-white dark:bg-teal-700 dark:hover:bg-teal-800 dark:text-white dark:disabled:text-gray-500"}`}
            >
                <FaArrowLeft className="mr-2" />
                Previous
            </button>

            {/* Page Indicator */}
            <span className="text-gray-700 dark:text-white font-semibold">
                Page {page} of {totalPages}
            </span>

            {/* Next Button */}
            <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className={`flex items-center px-4 py-2 rounded-md transition-all duration-300 ease-in-out 
                ${page === totalPages ? "bg-gray-300 cursor-not-allowed text-gray-500 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white dark:disabled:text-gray-500 border" : "bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-700 dark:hover:bg-blue-800 dark:text-white dark:disabled:text-gray-500"}`}
            >
                Next
                <FaArrowRight className="ml-2" />
            </button>
        </div>
    );
};

export default Pagination;
