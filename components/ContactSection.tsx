import React, { useState } from 'react';
import { Mail, Cpu, Send } from 'lucide-react';
import ChatWidget from './ChatWidget';
import Modal from './Modal';

const ContactSection: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsModalOpen(true);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="animate-fadeIn">
            {/* Hero for Contact */}
            <section className="mb-12 rounded-xl overflow-hidden shadow-lg bg-certa-orange">
                <div className="p-8 md:p-16 flex flex-col md:flex-row items-center justify-between">
                    <div className="text-white md:max-w-xl mb-6 md:mb-0">
                        <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mt-2 mb-4">
                            Tire Suas Dúvidas com Nossos Especialistas
                        </h2>
                        <p className="text-lg mb-6 opacity-90">
                            Atendimento personalizado para fórmulas manipuladas, posologia e orientações de uso.
                        </p>
                        <div className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-certa-orange bg-white transition duration-300">
                            Atendimento Humano ou IA Avançada
                            <Cpu className="w-5 h-5 ml-2" />
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <img src="https://placehold.co/300x300/FF6B00/ffffff?text=Farmacêutico+Online" alt="Farmacêutico Online" className="rounded-lg max-w-full h-auto" />
                    </div>
                </div>
            </section>

            <section className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chat Column */}
                <ChatWidget />

                {/* Email Form Column */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-2xl font-bold text-certa-blue mb-4 flex items-center">
                        <Mail className="w-6 h-6 mr-2 text-certa-blue" />
                        Prefere por E-mail?
                    </h3>
                    <p className="text-gray-600 mb-6 text-sm">Nossa equipe responderá em até 24 horas úteis.</p>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="fale-nome" className="block text-sm font-medium text-gray-700 mb-1">Seu Nome Completo</label>
                            <input 
                                type="text" 
                                id="fale-nome" 
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-certa-orange focus:border-transparent transition duration-150 outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="fale-email" className="block text-sm font-medium text-gray-700 mb-1">Seu Melhor E-mail</label>
                            <input 
                                type="email" 
                                id="fale-email" 
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-certa-orange focus:border-transparent transition duration-150 outline-none"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="fale-mensagem" className="block text-sm font-medium text-gray-700 mb-1">Sua Dúvida ou Mensagem</label>
                            <textarea 
                                id="fale-mensagem" 
                                rows={4} 
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-certa-orange focus:border-transparent transition duration-150 outline-none"
                            ></textarea>
                        </div>
                        
                        <button type="submit" className="w-full bg-certa-blue text-white py-3 rounded-full font-semibold hover:bg-opacity-90 transition duration-150 flex items-center justify-center space-x-2">
                            <Send className="w-5 h-5" />
                            <span>Enviar Mensagem</span>
                        </button>
                    </form>
                </div>
            </section>

            <Modal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Sucesso"
                message="Obrigado! Sua mensagem foi enviada com sucesso e será respondida em breve por nossa equipe."
            />
        </div>
    );
};

export default ContactSection;