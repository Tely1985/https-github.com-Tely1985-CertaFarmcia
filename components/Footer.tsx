import React from 'react';
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail as MailIcon } from 'lucide-react';
import Modal from './Modal';

const Footer: React.FC = () => {
    const [modalInfo, setModalInfo] = React.useState<{isOpen: boolean, message: string}>({isOpen: false, message: ''});

    const openModal = (message: string) => setModalInfo({isOpen: true, message});
    const closeModal = () => setModalInfo({isOpen: false, message: ''});

    return (
        <footer className="bg-certa-blue mt-12 pt-12 pb-8 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Column 1: Brand & Contact */}
                    <div>
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 shadow-md">
                                <span className="text-certa-blue font-bold text-xl">C</span>
                            </div>
                            <h4 className="text-2xl font-bold">CERTA <span className="text-certa-orange">FARMÁCIA</span></h4>
                        </div>
                        
                        <div className="space-y-3 text-sm text-gray-300">
                             <div className="flex items-start">
                                <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-certa-orange" />
                                <p>Rua XV de Novembro, 3358 <br/> São José do Rio Preto - SP</p>
                             </div>
                             <div className="flex items-center">
                                <Phone className="w-4 h-4 mr-2 text-certa-orange" />
                                <p>(17) 2136-6999</p>
                             </div>
                             <div className="flex items-center">
                                <MailIcon className="w-4 h-4 mr-2 text-certa-orange" />
                                <p>contato@certafarmacia.com.br</p>
                             </div>
                        </div>

                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="bg-white/10 hover:bg-certa-orange p-2 rounded-full transition duration-300"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="bg-white/10 hover:bg-certa-orange p-2 rounded-full transition duration-300"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="bg-white/10 hover:bg-certa-orange p-2 rounded-full transition duration-300"><Youtube className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Column 2: Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-white border-b border-gray-700 pb-2 inline-block">Informações</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><button onClick={() => openModal('Esta seção "Quem Somos" será implementada em breve.')} className="hover:text-certa-orange transition">Quem Somos</button></li>
                            <li><button onClick={() => openModal('Esta seção "Nossas Lojas" será implementada em breve.')} className="hover:text-certa-orange transition">Nossas Lojas</button></li>
                            <li><button onClick={() => openModal('Esta seção "Política de Troca" será implementada em breve.')} className="hover:text-certa-orange transition">Política de Troca</button></li>
                            <li><button onClick={() => openModal('Esta seção "Política de Privacidade" será implementada em breve.')} className="hover:text-certa-orange transition">Política de Privacidade</button></li>
                        </ul>
                    </div>

                    {/* Column 3: Help */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-white border-b border-gray-700 pb-2 inline-block">Ajuda</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-certa-orange transition">Voltar ao Topo</button></li>
                            <li><button onClick={() => openModal('Esta seção "Minha Conta" será implementada em breve.')} className="hover:text-certa-orange transition">Minha Conta</button></li>
                            <li><button onClick={() => openModal('Esta seção "Rastrear Pedido" será implementada em breve.')} className="hover:text-certa-orange transition">Rastrear Pedido</button></li>
                            <li><button onClick={() => openModal('Esta seção "Como Comprar" será implementada em breve.')} className="hover:text-certa-orange transition">Como Comprar</button></li>
                        </ul>
                    </div>

                    {/* Column 4: Security */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-white border-b border-gray-700 pb-2 inline-block">Segurança</h4>
                        <div className="flex flex-col space-y-3">
                             <div className="bg-white p-2 rounded w-fit">
                                 <img src="https://placehold.co/100x40/FFFFFF/0A3350?text=Selo+Ebit" alt="Selo Ebit" className="h-8" />
                             </div>
                             <div className="bg-white p-2 rounded w-fit">
                                 <img src="https://placehold.co/100x40/FFFFFF/0A3350?text=Site+Seguro" alt="Site Seguro" className="h-8" />
                             </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Legal & Copyright */}
                <div className="border-t border-gray-700 pt-8 text-center">
                    <div className="text-xs text-gray-400 space-y-2 mb-6 max-w-5xl mx-auto leading-relaxed">
                        <p>Rio Preto Farmácia de Manipulação EIRELI EPP | CNPJ: 67.929.430/0001-63 | Rua XV de Novembro, 3358 – CEP 15015-110</p>
                        <p>Telefone: (17) 2136-6999 – Responsável Técnico: Liliamaura Gonçalves de Lima</p>
                        <p>Inscrições no CRF do RT: 13.368 Cadastro COVISA: 354980501-477-000292-1-1 | AFE expedida pela ANVISA: 0189961 | AE expedida pela ANVISA: 1.33680.9 | CRF SP dos estabelecimento: 16.383</p>
                    </div>

                    <p className="text-xs text-gray-500 mb-6">&copy; {new Date().getFullYear()} CERTA Farmácia. Todos os direitos reservados.</p>
                    
                    <div className="flex flex-col items-center">
                        <p className="text-xs font-semibold mb-2 text-gray-400">Meios de Pagamento</p>
                        <div className="bg-white p-2 rounded-lg inline-block">
                             <img src="https://placehold.co/300x25/ffffff/000000?text=Visa+Master+Elo+Hipercard+Boleto+Pix" alt="Bandeiras de Cartões" className="h-6 opacity-80" />
                        </div>
                    </div>
                </div>
            </div>

            <Modal 
                isOpen={modalInfo.isOpen} 
                onClose={closeModal} 
                title="Informação" 
                message={modalInfo.message} 
            />
        </footer>
    );
};

export default Footer;