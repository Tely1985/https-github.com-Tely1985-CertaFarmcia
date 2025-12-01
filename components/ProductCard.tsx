import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
    product: Product;
    accentColorClass: string; 
    buttonColorClass: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, accentColorClass, buttonColorClass }) => {
    const { addToCart } = useCart();

    return (
        <div className="bg-white rounded-xl shadow-md p-4 transition duration-300 hover:shadow-lg relative flex flex-col h-full">
            {product.tag && (
                <span className={`absolute top-0 right-0 z-10 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl ${product.tag === 'OFERTA' ? 'bg-certa-orange' : 'bg-certa-accent'}`}>
                    {product.tag}
                </span>
            )}
            <div className="relative pb-[100%] mb-3 rounded-lg overflow-hidden bg-gray-50">
                <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
            </div>
            <p className="text-sm text-gray-500">{product.brand}</p>
            <h4 className="font-semibold text-certa-blue leading-tight mb-2 flex-grow">{product.name}</h4>
            <p className="text-xl font-bold text-certa-orange mb-3">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
            </p>
            <button 
                onClick={() => addToCart(product)}
                className={`w-full text-white py-2 rounded-full hover:bg-opacity-90 transition duration-150 flex items-center justify-center space-x-2 ${buttonColorClass}`}
            >
                <PlusCircle className="w-5 h-5" />
                <span>Comprar</span>
            </button>
        </div>
    );
};

export default ProductCard;