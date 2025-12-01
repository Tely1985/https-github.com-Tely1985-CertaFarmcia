
import React, { useState } from 'react';
import { ArrowLeft, Minus, Plus, ShoppingCart, Truck, ShieldCheck, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailsProps {
    product: Product;
    onBack: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onBack }) => {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [cep, setCep] = useState('');
    const [shippingCost, setShippingCost] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<'desc' | 'nutri'>('desc');

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const handleAddToCart = () => {
        // Adiciona o produto N vezes
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
    };

    const calculateShipping = (e: React.FormEvent) => {
        e.preventDefault();
        if (cep.length >= 8) {
            // Simulação de frete
            setShippingCost(15.90);
        }
    };

    return (
        <div className="animate-fadeIn pb-12">
            {/* Breadcrumb / Back */}
            <div className="mb-6 flex items-center text-sm text-gray-500">
                <button onClick={onBack} className="flex items-center hover:text-certa-orange transition">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Voltar para a loja
                </button>
                <span className="mx-2">/</span>
                <span className="capitalize">{product.category}</span>
                <span className="mx-2">/</span>
                <span className="font-semibold text-certa-blue truncate max-w-xs">{product.name}</span>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    
                    {/* Coluna da Imagem */}
                    <div className="p-8 lg:p-12 bg-gray-50 flex items-center justify-center relative group">
                        <div className="bg-white p-4 rounded-2xl shadow-sm w-full max-w-md aspect-square flex items-center justify-center overflow-hidden relative">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-110" 
                            />
                            {product.tag && (
                                <span className="absolute top-4 left-4 bg-certa-orange text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                                    {product.tag}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Coluna de Informações */}
                    <div className="p-8 lg:p-12 flex flex-col">
                        <div className="mb-1">
                            <span className="text-gray-500 text-sm font-medium uppercase tracking-wide">{product.brand}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-certa-blue mb-4 leading-tight">
                            {product.name}
                        </h1>

                        {/* Rating Fake */}
                        <div className="flex items-center mb-6 space-x-2">
                            <div className="flex text-yellow-400">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-5 h-5 fill-current" />
                                ))}
                            </div>
                            <span className="text-sm text-gray-400">(42 avaliações)</span>
                        </div>

                        <div className="mb-8">
                            <span className="text-4xl font-bold text-certa-orange block">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                            </span>
                            <span className="text-gray-500 text-sm">
                                ou até 6x de {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price / 6)} sem juros
                            </span>
                        </div>

                        {/* Controles de Ação */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            {/* Seletor de Qtd */}
                            <div className="flex items-center border border-gray-300 rounded-full w-max">
                                <button 
                                    onClick={() => handleQuantityChange(-1)}
                                    className="p-3 text-gray-500 hover:text-certa-blue transition"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-10 text-center font-bold text-lg">{quantity}</span>
                                <button 
                                    onClick={() => handleQuantityChange(1)}
                                    className="p-3 text-gray-500 hover:text-certa-blue transition"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <button 
                                onClick={handleAddToCart}
                                className="flex-1 bg-certa-orange text-white py-3 px-8 rounded-full font-bold text-lg shadow-lg hover:bg-opacity-90 hover:shadow-xl transition transform active:scale-95 flex items-center justify-center"
                            >
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                Adicionar ao Carrinho
                            </button>
                        </div>

                        {/* Simulador de Frete */}
                        <div className="bg-blue-50 p-4 rounded-xl mb-6">
                            <h4 className="flex items-center text-certa-blue font-bold mb-3 text-sm">
                                <Truck className="w-4 h-4 mr-2" />
                                Calcular Frete e Prazo
                            </h4>
                            <form onSubmit={calculateShipping} className="flex gap-2">
                                <input 
                                    type="text" 
                                    placeholder="00000-000"
                                    maxLength={9}
                                    value={cep}
                                    onChange={(e) => setCep(e.target.value)}
                                    className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-certa-blue w-32"
                                />
                                <button type="submit" className="text-sm font-semibold text-certa-blue underline hover:text-certa-orange">
                                    Calcular
                                </button>
                            </form>
                            {shippingCost !== null && (
                                <div className="mt-3 text-sm text-green-700 font-medium animate-fadeIn">
                                    Frete Fixo: R$ {shippingCost.toFixed(2).replace('.', ',')} — Chega em até 3 dias úteis.
                                </div>
                            )}
                        </div>

                        <div className="mt-auto flex items-center text-xs text-gray-500 space-x-4">
                            <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-1 text-green-500" /> Compra 100% Segura</span>
                            <span className="flex items-center"><Truck className="w-4 h-4 mr-1 text-certa-blue" /> Envio Imediato</span>
                        </div>
                    </div>
                </div>

                {/* Tabs de Detalhes */}
                <div className="border-t border-gray-100">
                    <div className="flex border-b border-gray-100">
                        <button 
                            onClick={() => setActiveTab('desc')}
                            className={`flex-1 py-4 text-center font-bold text-sm uppercase tracking-wider transition ${activeTab === 'desc' ? 'border-b-2 border-certa-orange text-certa-orange bg-orange-50/50' : 'text-gray-500 hover:text-certa-blue'}`}
                        >
                            Descrição do Produto
                        </button>
                        <button 
                            onClick={() => setActiveTab('nutri')}
                            className={`flex-1 py-4 text-center font-bold text-sm uppercase tracking-wider transition ${activeTab === 'nutri' ? 'border-b-2 border-certa-orange text-certa-orange bg-orange-50/50' : 'text-gray-500 hover:text-certa-blue'}`}
                        >
                            Tabela Nutricional
                        </button>
                    </div>
                    <div className="p-8 lg:p-12 text-gray-600 leading-relaxed">
                        {activeTab === 'desc' ? (
                            <div className="space-y-4 max-w-4xl mx-auto">
                                <p>O <strong>{product.name}</strong> da marca <strong>{product.brand}</strong> foi desenvolvido com matérias-primas de altíssima qualidade para garantir os melhores resultados para sua saúde e desempenho.</p>
                                <p>Ideal para quem busca qualidade de vida, este produto passa por rigorosos testes de controle de qualidade CERTA Farmácia, assegurando pureza e eficácia.</p>
                                <h4 className="font-bold text-certa-blue mt-6">Benefícios Principais:</h4>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Matéria-prima importada de alto grau de pureza.</li>
                                    <li>Auxilia na manutenção da saúde e bem-estar diário.</li>
                                    <li>Fórmula otimizada para melhor absorção pelo organismo.</li>
                                    <li>Produto manipulado seguindo as boas práticas da ANVISA.</li>
                                </ul>
                                <p className="mt-4 text-sm italic">* Consulte sempre seu médico ou nutricionista antes de iniciar o uso de suplementos.</p>
                            </div>
                        ) : (
                            <div className="max-w-2xl mx-auto">
                                <table className="w-full text-sm text-left">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <th className="py-3 px-4 font-bold text-certa-blue">Componente</th>
                                            <th className="py-3 px-4 font-bold text-certa-blue text-right">Quantidade por Porção</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        <tr>
                                            <td className="py-3 px-4">Valor Energético</td>
                                            <td className="py-3 px-4 text-right">0 kcal</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4">Carboidratos</td>
                                            <td className="py-3 px-4 text-right">0g</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4">Proteínas</td>
                                            <td className="py-3 px-4 text-right">0g</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4">Gorduras Totais</td>
                                            <td className="py-3 px-4 text-right">0g</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className="mt-4 text-xs text-gray-400 text-center">Informação nutricional de referência. Pode variar conforme o lote.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
