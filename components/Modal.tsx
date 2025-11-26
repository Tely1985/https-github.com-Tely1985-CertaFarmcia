import React from 'react';

interface ModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full transform transition-all duration-300 animate-fadeIn">
                <h4 className="text-xl font-bold mb-3 text-certa-blue">{title}</h4>
                <p className="text-gray-700 mb-6">{message}</p>
                <button 
                    onClick={onClose}
                    className="w-full bg-certa-orange text-white py-2 rounded-full font-semibold hover:bg-opacity-90 transition duration-150"
                >
                    Fechar
                </button>
            </div>
        </div>
    );
};

export default Modal;