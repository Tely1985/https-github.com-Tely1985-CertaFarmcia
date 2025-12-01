import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Modal from './Modal';

const CartSidebar: React.FC = () => {
    const { isCartOpen, setIsCartOpen, items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

    if (!isCartOpen) return null;

    const handleCheckout = () => {
        setIsCheckoutModalOpen(true);
        clearCart();
        setIsCartOpen(false); 
    };

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-[100] transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar */}
            <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-[101] flex flex-col transform transition-transform duration-300 ease-in-out">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-certa-blue text-white">
                    <h2 className="text-xl font-bold flex items-center">
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        Seu Carrinho
                    </h2>
                    <button 
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 hover:bg-white/10 rounded-full transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="text-center py-10 opacity-60">
                            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <p className="text-lg text-gray-500 font-medium">Seu carrinho está vazio.</p>
                            <button 
                                onClick={() => setIsCartOpen(false)}
                                className="mt-6 text-certa-orange font-semibold hover:underline"
                            >
                                Começar a comprar
                            </button>
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="flex items-start space-x-4 border-b border-gray-100 pb-4 last:border-0">
                                <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-certa-blue line-clamp-2 mb-1">{item.name}</h4>
                                    <p className="text-xs text-gray-500 mb-2">{item.brand}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="font-bold text-certa-orange">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                                        </p>
                                        
                                        <div className="flex items-center border border-gray-200 rounded-lg">
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 px-2 hover:bg-gray-100 text-gray-600"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-sm font-semibold w-8 text-center">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 px-2 hover:bg-gray-100 text-gray-600"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-gray-400 hover:text-red-500 p-1"
                                    title="Remover"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-6 bg-gray-50 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="text-xl font-bold text-certa-blue">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal)}
                            </span>
                        </div>
                        <button 
                            onClick={handleCheckout}
                            className="w-full bg-certa-orange text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-opacity-90 transition transform active:scale-95 flex items-center justify-center"
                        >
                            Finalizar Compra
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                    </div>
                )}
            </div>

            <Modal 
                isOpen={isCheckoutModalOpen} 
                title="Pedido Realizado!" 
                message="Obrigado pela preferência. Seu pedido foi processado com sucesso e em breve você receberá os detalhes por e-mail." 
                onClose={() => setIsCheckoutModalOpen(false)} 
            />
        </>
    );
};

export default CartSidebar;