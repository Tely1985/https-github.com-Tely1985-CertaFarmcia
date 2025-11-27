
import React, { useState } from 'react';
import { Truck, Handshake, ClipboardCheck, Search, User, ShoppingCart, Menu, MessageCircle, Lock } from 'lucide-react';
import { TabId } from '../types';

interface HeaderProps {
    activeTab: TabId;
    setActiveTab: (tab: TabId) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleTabClick = (tab: TabId) => {
        setActiveTab(tab);
        setMobileMenuOpen(false);
    };

    const getNavClass = (tab: TabId) => {
        if (tab === 'fale') {
            return activeTab === 'fale' 
                ? 'text-certa-orange font-bold border-b-2 border-certa-orange' 
                : 'text-certa-orange font-semibold border-b-2 border-transparent hover:border-certa-orange';
        }
        if (tab === 'admin') {
             return activeTab === 'admin'
                ? 'text-gray-800 font-bold border-b-2 border-gray-800'
                : 'text-gray-500 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-800';
        }
        return activeTab === tab 
            ? 'text-certa-orange font-bold border-b-2 border-certa-orange' 
            : 'text-certa-blue hover:text-certa-orange border-b-2 border-transparent hover:border-certa-orange';
    };

    return (
        <>
            {/* Top Bar */}
            <div className="bg-certa-blue text-white text-xs py-2 px-4">
                <div className="max-w-7xl mx-auto flex justify-around sm:justify-center space-x-4 overflow-x-auto whitespace-nowrap">
                    <span className="flex items-center">
                        <Truck className="w-4 h-4 mr-1" />
                        FRETE GRÁTIS a partir de R$ 199
                    </span>
                    <span className="flex items-center">
                        <Handshake className="w-4 h-4 mr-1" />
                        PARCELAMENTO em até 6x sem juros
                    </span>
                    <span className="flex items-center hidden md:flex">
                        <ClipboardCheck className="w-4 h-4 mr-1" />
                        MANIPULADOS com a qualidade CERTA
                    </span>
                </div>
            </div>

            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div className="flex-shrink-0 cursor-pointer" onClick={() => handleTabClick('massa')}>
                            <h1 className="text-2xl font-bold text-certa-blue">
                                CERTA <span className="text-certa-orange">FARMÁCIA</span>
                            </h1>
                        </div>

                        {/* Desktop Search */}
                        <div className="hidden lg:flex flex-grow max-w-xl mx-8">
                            <input type="search" placeholder="Buscar Creatina, Whey Protein, BCAA..."
                                className="w-full bg-white text-gray-700 placeholder-gray-400 border border-gray-200 focus:border-certa-orange focus:ring-1 focus:ring-certa-orange outline-none rounded-l-lg py-2 px-4 transition duration-150 ease-in-out" />
                            <button className="bg-certa-orange hover:bg-opacity-90 text-white p-3 rounded-r-lg transition duration-150 ease-in-out">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-4">
                            <button className="text-certa-blue hover:text-certa-orange p-2 rounded-full hidden sm:block">
                                <User className="w-6 h-6" />
                                <span className="text-xs block">Conta</span>
                            </button>
                            <button className="text-certa-blue hover:text-certa-orange p-2 rounded-full relative">
                                <ShoppingCart className="w-6 h-6" />
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
                                <span className="text-xs block">Carrinho</span>
                            </button>
                            {/* Mobile Menu Btn */}
                            <button 
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-certa-blue lg:hidden p-2 rounded-full focus:outline-none"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search */}
                    <div className="lg:hidden mt-3 flex px-0 sm:px-0">
                        <input type="search" placeholder="Buscar Creatina, Whey Protein..."
                            className="w-full bg-white text-gray-700 placeholder-gray-400 border border-gray-200 focus:border-certa-orange focus:ring-1 focus:ring-certa-orange outline-none rounded-l-lg py-2 px-4" />
                        <button className="bg-certa-orange hover:bg-opacity-90 text-white p-3 rounded-r-lg">
                            <Search className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex justify-center space-x-8 mt-4 text-sm font-medium">
                        <button onClick={() => handleTabClick('massa')} className={`transition duration-150 py-1 focus:outline-none ${getNavClass('massa')}`}>
                            Ganho de Massa
                        </button>
                        <button onClick={() => handleTabClick('emagrecimento')} className={`transition duration-150 py-1 focus:outline-none ${getNavClass('emagrecimento')}`}>
                            Emagrecimento
                        </button>
                        <button onClick={() => handleTabClick('vitaminas')} className={`transition duration-150 py-1 focus:outline-none ${getNavClass('vitaminas')}`}>
                            Vitaminas & Minerais
                        </button>
                        <button onClick={() => handleTabClick('cuidados')} className={`transition duration-150 py-1 focus:outline-none ${getNavClass('cuidados')}`}>
                            Cuidados Especiais
                        </button>
                        <button onClick={() => handleTabClick('fale')} className={`transition duration-150 py-1 focus:outline-none ${getNavClass('fale')}`}>
                            Fale com o Farmacêutico
                        </button>
                        <button onClick={() => handleTabClick('admin')} className={`transition duration-150 py-1 focus:outline-none flex items-center ${getNavClass('admin')}`}>
                            <Lock className="w-3 h-3 mr-1" />
                            Admin
                        </button>
                    </nav>

                    {/* Mobile Menu Dropdown */}
                    {mobileMenuOpen && (
                        <div className="lg:hidden bg-white border-t border-gray-100 mt-4 px-4 pb-4 shadow-lg absolute w-full left-0 z-40 animate-fadeIn">
                            <nav className="flex flex-col space-y-3 mt-4 text-base font-medium">
                                <button onClick={() => handleTabClick('massa')} className="text-left text-certa-orange bg-orange-50 px-3 py-2 rounded-lg">Ganho de Massa</button>
                                <button onClick={() => handleTabClick('emagrecimento')} className="text-left text-certa-blue hover:text-certa-orange hover:bg-gray-50 px-3 py-2 rounded-lg transition">Emagrecimento</button>
                                <button onClick={() => handleTabClick('vitaminas')} className="text-left text-certa-blue hover:text-certa-orange hover:bg-gray-50 px-3 py-2 rounded-lg transition">Vitaminas & Minerais</button>
                                <button onClick={() => handleTabClick('cuidados')} className="text-left text-certa-blue hover:text-certa-orange hover:bg-gray-50 px-3 py-2 rounded-lg transition">Cuidados Especiais</button>
                                <div className="border-t border-gray-100 my-2 pt-2">
                                    <button onClick={() => handleTabClick('fale')} className="text-left text-certa-orange font-semibold flex items-center px-3 py-2 hover:bg-orange-50 rounded-lg w-full">
                                        <MessageCircle className="w-5 h-5 mr-2" />
                                        Fale com o Farmacêutico
                                    </button>
                                    <button onClick={() => handleTabClick('admin')} className="text-left text-gray-600 font-semibold flex items-center px-3 py-2 hover:bg-gray-50 rounded-lg w-full mt-2">
                                        <Lock className="w-5 h-5 mr-2" />
                                        Área Admin (Importação)
                                    </button>
                                </div>
                            </nav>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
};

export default Header;
