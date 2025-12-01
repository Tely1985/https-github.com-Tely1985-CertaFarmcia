import React, { useState } from 'react';
import { Product, FilterOption } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
    id: string;
    filters: FilterOption[];
    products: Product[];
    accentColorClass: string; 
    buttonColorClass: string; 
}

const ProductGrid: React.FC<ProductGridProps> = ({ id, filters, products, accentColorClass, buttonColorClass }) => {
    const [activeFilter, setActiveFilter] = useState<string>('all');

    // Derived state: Calculates filtered products on the fly during render.
    // This eliminates the need for useEffect to sync state, fixing potential "Error 153" issues.
    const filteredProducts = activeFilter === 'all' 
        ? products 
        : products.filter(p => p.category === activeFilter);

    const getButtonStyle = (filterId: string) => {
        const isActive = activeFilter === filterId;
        
        if (isActive) {
            return `${buttonColorClass} text-white shadow-md`;
        }
        return `bg-white text-certa-blue border border-gray-200 hover:${accentColorClass}`;
    };

    return (
        <div id={id}>
            {/* Filters */}
            <section className="mb-12">
                <h3 className="text-2xl font-bold text-certa-blue mb-4">Refinar Busca</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                    <button 
                        onClick={() => setActiveFilter('all')}
                        className={`py-3 px-4 rounded-xl font-semibold transition duration-200 ${getButtonStyle('all')}`}
                    >
                        Todos
                    </button>
                    {filters.map(filter => (
                        <button 
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`py-3 px-4 rounded-xl font-semibold transition duration-200 ${getButtonStyle(filter.id)}`}
                        >
                            {filter.label} 
                            {filter.count && <span className="text-xs opacity-75 ml-1">({filter.count})</span>}
                        </button>
                    ))}
                </div>
            </section>

            {/* Grid */}
            <section className="mb-12">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
                    {filteredProducts.map(product => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            accentColorClass={accentColorClass}
                            buttonColorClass={buttonColorClass}
                        />
                    ))}
                    {filteredProducts.length === 0 && (
                        <div className="col-span-full text-center py-10 text-gray-500">
                            Nenhum produto encontrado nesta categoria.
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ProductGrid;