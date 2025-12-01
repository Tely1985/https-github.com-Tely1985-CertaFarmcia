
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ContactSection from './components/ContactSection';
import Modal from './components/Modal';
import CartSidebar from './components/CartSidebar';
import AuthModal from './components/AuthModal';
import AccountDashboard from './components/AccountDashboard';
import CategoryNav from './components/CategoryNav';
import EducationSection from './components/EducationSection';
import NewUnitSection from './components/NewUnitSection';
import InstitutionalSection from './components/InstitutionalSection';
import FAQSection from './components/FAQSection';
import ProductDetails from './components/ProductDetails';
import AllCategoriesSection from './components/AllCategoriesSection';
import { SECTIONS } from './constants';
import { TabId, Product } from './types';
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('massa');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [modalInfo, setModalInfo] = useState<{isOpen: boolean, message: string}>({isOpen: false, message: ''});
    const { isAuthenticated } = useAuth();

    // Reset to home if user logs out while on account page
    useEffect(() => {
        if (activeTab === 'conta' && !isAuthenticated) {
            setActiveTab('massa');
        }
    }, [isAuthenticated, activeTab]);

    // Scroll top on tab change or product selection
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeTab, selectedProduct]);

    // When changing tabs, clear selected product to show list view
    const handleTabChange = (tab: TabId) => {
        // If clicking the same tab, scroll to top manually since useEffect [activeTab] won't trigger
        if (tab === activeTab && !selectedProduct) {
             window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setActiveTab(tab);
        setSelectedProduct(null);
    };

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
    };

    // Helper to extract styling classes based on active tab for consistency
    const getTabColorClasses = (tab: TabId) => {
        switch(tab) {
            case 'massa': return { accent: 'border-certa-orange', button: 'bg-certa-orange' };
            case 'emagrecimento': return { accent: 'border-certa-green', button: 'bg-certa-green' };
            case 'vitaminas': return { accent: 'border-certa-accent', button: 'bg-certa-accent' };
            case 'cuidados': return { accent: 'border-certa-blue', button: 'bg-certa-blue' };
            default: return { accent: 'border-certa-orange', button: 'bg-certa-orange' };
        }
    };

    const currentSection = activeTab === 'conta' || activeTab === 'faq' ? null : SECTIONS[activeTab];
    const colorClasses = getTabColorClasses(activeTab);

    const handleHeroButtonClick = () => {
        const gridElement = document.getElementById(`grid-${activeTab}`);
        if (gridElement) {
            gridElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Renderiza o conteúdo principal baseado na tab e seleção de produto
    const renderContent = () => {
        if (activeTab === 'fale') {
            return <ContactSection />;
        }
        
        if (activeTab === 'conta') {
             return <AccountDashboard />;
        }

        if (activeTab === 'faq') {
            return <FAQSection />;
        }

        // Se um produto estiver selecionado, exibe detalhes ao invés do grid
        if (selectedProduct) {
            return (
                <ProductDetails 
                    product={selectedProduct} 
                    onBack={() => setSelectedProduct(null)} 
                />
            );
        }

        // Seções de produtos padrão (Lista)
        return currentSection && (
            <div className="animate-fadeIn" key={activeTab}>
                <Hero 
                    title={currentSection.hero.title}
                    subtitle={currentSection.hero.subtitle}
                    image={currentSection.hero.image}
                    bgColor={currentSection.hero.bgColor}
                    buttonText={currentSection.hero.buttonText}
                    buttonIconName={currentSection.hero.buttonIcon}
                    textColorClass={currentSection.hero.textColorClass}
                    onButtonClick={handleHeroButtonClick}
                />

                <CategoryNav onSelectCategory={handleTabChange} />
                
                <ProductGrid 
                    id={`grid-${activeTab}`}
                    filters={currentSection.filters}
                    products={currentSection.products}
                    accentColorClass={colorClasses.accent}
                    buttonColorClass={colorClasses.button}
                    onProductClick={handleProductClick}
                />

                <AllCategoriesSection onSelectCategory={handleTabChange} />
            </div>
        );
    };

    const getBreadcrumbLabel = () => {
        if (activeTab === 'fale') return 'Fale com o Farmacêutico';
        if (activeTab === 'conta') return 'Minha Conta';
        if (activeTab === 'faq') return 'Dúvidas Frequentes';
        if (selectedProduct) return 'Detalhes do Produto';
        return currentSection?.title;
    };

    return (
        <div className="min-h-screen flex flex-col font-sans relative">
            <Header activeTab={activeTab} setActiveTab={handleTabChange} />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 w-full">
                
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
                    <ol className="list-none p-0 inline-flex items-center">
                        <li className="flex items-center">
                            <button onClick={() => handleTabChange('massa')} className="hover:text-certa-orange">Início</button>
                            <ChevronRight className="w-4 h-4 mx-2" />
                        </li>
                        <li>
                            <span className="text-certa-blue font-semibold">
                                {getBreadcrumbLabel()}
                            </span>
                        </li>
                    </ol>
                </nav>

                {/* Main Content Area */}
                {renderContent()}

                {/* Shared Sections for Home/Product Pages */}
                {activeTab !== 'conta' && activeTab !== 'fale' && activeTab !== 'faq' && !selectedProduct && (
                    <>
                        <EducationSection />
                        <InstitutionalSection />
                        <NewUnitSection />
                    </>
                )}

            </main>

            <Footer onNavigate={handleTabChange} />

            <CartSidebar />
            <AuthModal />

            <Modal 
                isOpen={modalInfo.isOpen} 
                title="Informação" 
                message={modalInfo.message} 
                onClose={() => setModalInfo({isOpen: false, message: ''})} 
            />
        </div>
    );
};

export default App;
