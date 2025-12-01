
import React from 'react';
import { Award, Target, Eye, Heart } from 'lucide-react';

const InstitutionalSection: React.FC = () => {
    return (
        <section className="py-12 bg-gray-50 rounded-3xl mb-12 shadow-sm border border-gray-100">
            <div className="px-6 lg:px-12">
                <div className="text-center mb-12">
                    <span className="text-certa-orange font-bold text-xs uppercase tracking-widest">Quem Somos</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-certa-blue mt-2">Nossa Essência e Compromisso</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Política de Qualidade - Destaque */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl border-l-8 border-certa-orange relative overflow-hidden group">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-orange-100 rounded-full opacity-50 blur-xl group-hover:scale-150 transition duration-700"></div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center mb-6">
                                <div className="bg-orange-50 p-3 rounded-full mr-4 border border-orange-100">
                                    <Award className="w-8 h-8 text-certa-orange" />
                                </div>
                                <h3 className="text-2xl font-bold text-certa-blue">Política de Qualidade</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-lg italic">
                                "Estimular e implantar ativamente a atualização e o desenvolvimento de todos os processos produtivos e de atendimento. Superar a expectativa de nossos clientes, aviando medicamentos e cosméticos terapêuticos qualificados, assegurando confiabilidade e fortalecendo o nosso compromisso com a saúde."
                            </p>
                        </div>
                    </div>

                    {/* Missão, Visão, Valores - Lista */}
                    <div className="space-y-8">
                        {/* Missão */}
                        <div className="flex items-start group">
                             <div className="bg-blue-50 p-3 rounded-xl mr-5 mt-1 flex-shrink-0 group-hover:bg-certa-blue group-hover:text-white transition duration-300">
                                <Target className="w-6 h-6 text-certa-blue group-hover:text-white transition duration-300" />
                             </div>
                             <div>
                                 <h4 className="text-xl font-bold text-certa-blue mb-2">Missão</h4>
                                 <p className="text-gray-600 leading-relaxed">Promover saúde, bem estar e qualidade de vida através de produtos, serviços e informações, com a permanência em Qualificação, Respeito e Ética.</p>
                             </div>
                        </div>

                        {/* Visão */}
                        <div className="flex items-start group">
                             <div className="bg-blue-50 p-3 rounded-xl mr-5 mt-1 flex-shrink-0 group-hover:bg-certa-blue group-hover:text-white transition duration-300">
                                <Eye className="w-6 h-6 text-certa-blue group-hover:text-white transition duration-300" />
                             </div>
                             <div>
                                 <h4 className="text-xl font-bold text-certa-blue mb-2">Visão</h4>
                                 <p className="text-gray-600 leading-relaxed">Sermos referência de excelência em Farmácia de Manipulação em São José do Rio Preto, Catanduva, e Região Noroeste Paulista.</p>
                             </div>
                        </div>

                        {/* Valores */}
                        <div className="flex items-start group">
                             <div className="bg-blue-50 p-3 rounded-xl mr-5 mt-1 flex-shrink-0 group-hover:bg-certa-blue group-hover:text-white transition duration-300">
                                <Heart className="w-6 h-6 text-certa-blue group-hover:text-white transition duration-300" />
                             </div>
                             <div>
                                 <h4 className="text-xl font-bold text-certa-blue mb-2">Valores</h4>
                                 <p className="text-gray-600 leading-relaxed">Proporcionar a melhoria contínua de nossos produtos e procedimentos internos, através de investimentos em tecnologia e capacitação.</p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InstitutionalSection;
