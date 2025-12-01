import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

const EducationSection: React.FC = () => {
    return (
        <section className="py-12 mt-12 mb-8 border-t border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <span className="inline-block bg-blue-50 text-certa-blue text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                        Educação & Saúde
                    </span>
                    <h2 className="text-4xl font-extrabold text-certa-blue mb-1">
                        CERTA Explica:
                    </h2>
                    <h3 className="text-3xl text-gray-400 font-light mb-6 leading-tight">
                        Onde a ciência encontra sua saúde
                    </h3>
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                        Tire suas dúvidas com nossos Farmacêuticos especialistas. Assista a tutoriais, guias e dicas de saúde baseadas em evidências científicas.
                    </p>

                    <div className="space-y-4 mb-8">
                        {[
                            "Guias completos de suplementação",
                            "Dicas de manipulação personalizada",
                            "Entrevistas com profissionais de saúde"
                        ].map((item, index) => (
                            <div key={index} className="flex items-center bg-gray-50 p-4 rounded-xl border border-gray-100 transition hover:shadow-md hover:border-blue-100">
                                <div className="bg-certa-orange text-white rounded-full p-1 mr-4 flex-shrink-0">
                                    <Check className="w-4 h-4" strokeWidth={3} />
                                </div>
                                <span className="font-semibold text-certa-blue">{item}</span>
                            </div>
                        ))}
                    </div>

                    <button className="flex items-center text-certa-orange font-bold text-lg hover:underline group">
                        Acessar todos os vídeos e artigos
                        <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition" />
                    </button>
                </div>
                
                {/* Imagem Ilustrativa */}
                <div className="relative h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                    <img 
                        src="https://placehold.co/600x800/0A3350/ffffff?text=CERTA+Explica" 
                        alt="CERTA Explica" 
                        className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-certa-blue/90 via-transparent to-transparent flex items-end p-8">
                         <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                             <p className="text-white font-medium text-sm">Conteúdo verificado por farmacêuticos.</p>
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EducationSection;