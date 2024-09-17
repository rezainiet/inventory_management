import React from 'react';
import ReactDOM from 'react-dom';

const CustomModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-blue-100/5">
            <div className="bg-white dark:text-white dark:bg-slate-500 p-6 rounded-lg shadow-lg relative max-w-lg w-full">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-white hover:text-gray-300 bg-slate-500 w-8 h-8 flex rounded-full items-center justify-center"
                    style={{ fontSize: '1.5rem' }} // Adjust font size here
                >
                    &times;
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default CustomModal;
