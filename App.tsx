import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight, Play, X } from 'lucide-react';
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
import { SECTIONS } from './constants';
import { TabId } from './types';
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('massa');
    const [modalInfo, setModalInfo] = useState<{isOpen: boolean, message: string}>({isOpen: false, message: ''});
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const { isAuthenticated, user } = useAuth();

    // Reset to home if user logs out while on account page
    useEffect(() => {
        if (activeTab === 'conta' && !isAuthenticated) {
            setActiveTab('massa');
        }
    }, [isAuthenticated, activeTab]);

    // Handle Escape key to close video modal
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsVideoModalOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

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

    const currentSection = activeTab === 'conta' ? null : SECTIONS[activeTab];
    const colorClasses = getTabColorClasses(activeTab);

    const handleHeroButtonClick = () => {
        const gridElement = document.getElementById(`grid-${activeTab}`);
        if (gridElement) {
            gridElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Renderiza o conteúdo principal baseado na tab
    const renderContent = () => {
        if (activeTab === 'fale') {
            return <ContactSection />;
        }
        
        if (activeTab === 'conta') {
             return <AccountDashboard />;
        }

        // Seções de produtos padrão
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

                <CategoryNav onSelectCategory={setActiveTab} />
                
                <ProductGrid 
                    id={`grid-${activeTab}`}
                    filters={currentSection.filters}
                    products={currentSection.products}
                    accentColorClass={colorClasses.accent}
                    buttonColorClass={colorClasses.button}
                />
            </div>
        );
    };

    const getBreadcrumbLabel = () => {
        if (activeTab === 'fale') return 'Fale com o Farmacêutico';
        if (activeTab === 'conta') return 'Minha Conta';
        return currentSection?.title;
    };

    return (
        <div className="min-h-screen flex flex-col font-sans relative">
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 w-full">
                
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
                    <ol className="list-none p-0 inline-flex items-center">
                        <li className="flex items-center">
                            <button onClick={() => setActiveTab('massa')} className="hover:text-certa-orange">Início</button>
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

                {/* Common Authority Section (Hide on account/contact pages for cleanliness) */}
                {activeTab !== 'conta' && activeTab !== 'fale' && (
                    <section className="mb-12 bg-white p-8 rounded-xl shadow-lg mt-12">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                                <h3 className="text-3xl font-bold text-certa-blue mb-4">CERTA Explica: Onde a ciência encontra sua saúde</h3>
                                <p className="text-gray-600 mb-4">
                                    Tire suas dúvidas com nossos Farmacêuticos especialistas. Assista a tutoriais, guias e dicas de saúde baseadas em evidências.
                                </p>
                                <button 
                                    onClick={() => setModalInfo({isOpen: true, message: 'Esta funcionalidade será implementada em breve. Por favor, use o Fale com o Farmacêutico para suporte.'})}
                                    className="inline-flex items-center text-certa-orange font-semibold hover:underline"
                                >
                                    Acessar Blog e Vídeos
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            </div>
                            <div 
                                className="md:w-1/2 relative rounded-xl overflow-hidden shadow-xl aspect-video cursor-pointer group"
                                onClick={() => setIsVideoModalOpen(true)}
                            >
                                <img 
                                    src="https://img.youtube.com/vi/DbTFd6UZ1_w/maxresdefault.jpg" 
                                    alt="Capa do Vídeo" 
                                    className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition">
                                    <div className="w-20 h-20 bg-certa-orange rounded-full flex items-center justify-center text-white shadow-2xl transform transition duration-300 group-hover:scale-110">
                                        <Play className="w-8 h-8 ml-1" fill="currentColor" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Footer />

            <CartSidebar />
            <AuthModal />

            {/* Video Modal Popup */}
            {isVideoModalOpen && (
                <div 
                    className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-90 p-4 animate-fadeIn backdrop-blur-sm" 
                    onClick={() => setIsVideoModalOpen(false)}
                >
                    <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
                        <button 
                            onClick={(e) => { e.stopPropagation(); setIsVideoModalOpen(false); }}
                            className="absolute top-4 right-4 z-10 text-white bg-black bg-opacity-50 hover:bg-certa-orange p-2 rounded-full transition duration-200"
                            aria-label="Fechar Vídeo"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <iframe 
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/DbTFd6UZ1_w?autoplay=1&start=2&rel=0" 
                            title="Vídeo CERTA Farmácia" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

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