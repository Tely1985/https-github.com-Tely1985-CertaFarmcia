
import React from 'react';
import { MapPin, Play } from 'lucide-react';

const NewUnitSection: React.FC = () => {
    return (
        <section className="py-16 bg-white mb-12">
            <div className="text-center mb-10">
                <span className="text-certa-orange font-bold text-xs uppercase tracking-widest">Nossas Lojas</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-certa-blue mt-2">Conheça nossa Nova Unidade</h2>
                <p className="text-gray-500 max-w-2xl mx-auto mt-3">
                    Um espaço moderno, amplo e acolhedor, pensado exclusivamente para o seu bem-estar e conforto.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch h-full">
                {/* Video Block - Link to YouTube */}
                <a 
                    href="https://www.youtube.com/watch?v=DbTFd6UZ1_w&t=2s" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative rounded-2xl overflow-hidden shadow-xl bg-black min-h-[300px] lg:min-h-[400px] group block"
                >
                    <img 
                        src="https://img.youtube.com/vi/DbTFd6UZ1_w/maxresdefault.jpg" 
                        alt="Tour Nova Unidade" 
                        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition duration-500"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/800x600/0A3350/ffffff?text=Video+Tour';
                        }}
                    />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/30 group-hover:scale-110 transition duration-300">
                             <div className="bg-certa-orange text-white p-4 rounded-full shadow-2xl">
                                <Play className="w-8 h-8 fill-current translate-x-1" />
                             </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        <span className="text-certa-orange font-bold text-xs uppercase tracking-wider mb-1 block">Assista Agora</span>
                        <h3 className="text-white text-2xl font-bold group-hover:underline decoration-certa-orange underline-offset-4 decoration-2">Tour pela Nova Farmácia</h3>
                    </div>
                </a>

                {/* Image & CTA Block */}
                <div className="flex flex-col space-y-6">
                    <div className="relative flex-grow rounded-2xl overflow-hidden shadow-xl min-h-[250px]">
                        <img 
                            src="https://i.postimg.cc/Prkbvx63/interior.webp" 
                            alt="Interior da Nova Unidade" 
                            className="w-full h-full object-cover transition transform hover:scale-105 duration-700 absolute inset-0" 
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-certa-blue/90 to-transparent p-6 pt-20">
                            <h3 className="text-white text-xl font-bold">Laboratórios de Ponta</h3>
                            <p className="text-gray-200 text-sm">Tecnologia avançada para garantir a qualidade do seu manipulado.</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center">
                            <div className="bg-white p-3 rounded-full shadow-sm text-certa-orange mr-4">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-certa-blue">Venha nos visitar</h4>
                                <p className="text-sm text-gray-500">Rua XV de Novembro, 3358 - Centro</p>
                            </div>
                        </div>
                        <a 
                            href="https://www.google.com/maps/search/?api=1&query=Rua+XV+de+Novembro,+3358+São+José+do+Rio+Preto" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-6 py-3 bg-certa-blue text-white rounded-xl font-bold hover:bg-opacity-90 transition flex items-center justify-center shadow-lg hover:shadow-xl"
                        >
                            Ver no Mapa
                            <MapPin className="w-4 h-4 ml-2" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewUnitSection;
