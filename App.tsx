import React, { useState } from 'react';
import { ChevronRight, ArrowRight, Play } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ContactSection from './components/ContactSection';
import Modal from './components/Modal';
import { SECTIONS } from './constants';
import { TabId } from './types';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('massa');
    const [modalInfo, setModalInfo] = useState<{isOpen: boolean, message: string}>({isOpen: false, message: ''});

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

    const currentSection = SECTIONS[activeTab];
    const colorClasses = getTabColorClasses(activeTab);

    return (
        <div className="min-h-screen flex flex-col font-sans">
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
                                {activeTab === 'fale' ? 'Fale com o Farmacêutico' : currentSection?.title}
                            </span>
                        </li>
                    </ol>
                </nav>

                {/* Main Content Area */}
                {activeTab === 'fale' ? (
                    <ContactSection />
                ) : (
                    currentSection && (
                        <div className="animate-fadeIn">
                            <Hero 
                                title={currentSection.hero.title}
                                subtitle={currentSection.hero.subtitle}
                                image={currentSection.hero.image}
                                bgColor={currentSection.hero.bgColor}
                                buttonText={currentSection.hero.buttonText}
                                buttonIconName={currentSection.hero.buttonIcon}
                                textColorClass={currentSection.hero.textColorClass}
                            />
                            
                            <ProductGrid 
                                id={`grid-${activeTab}`}
                                filters={currentSection.filters}
                                products={currentSection.products}
                                accentColorClass={colorClasses.accent}
                                buttonColorClass={colorClasses.button}
                            />
                        </div>
                    )
                )}

                {/* Common Authority Section */}
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
                        <div className="md:w-1/2 relative rounded-xl overflow-hidden shadow-xl group cursor-pointer" 
                             onClick={() => setModalInfo({isOpen: true, message: 'A reprodução do vídeo está indisponível na demonstração.'})}>
                            <img src="https://placehold.co/600x350/0A3350/ffffff?text=Video+Capa+-+Dicas+de+Saúde" alt="Capa do vídeo" className="w-full h-auto object-cover transition duration-300 group-hover:scale-105" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-20 transition duration-300">
                                <button className="w-16 h-16 bg-certa-orange text-white rounded-full flex items-center justify-center transform group-hover:scale-110 transition duration-300">
                                    <Play className="w-8 h-8 fill-current ml-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

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