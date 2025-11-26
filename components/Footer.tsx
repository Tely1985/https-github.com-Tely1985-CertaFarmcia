import React from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import Modal from './Modal';

const Footer: React.FC = () => {
    const [modalInfo, setModalInfo] = React.useState<{isOpen: boolean, message: string}>({isOpen: false, message: ''});

    const openModal = (message: string) => setModalInfo({isOpen: true, message});
    const closeModal = () => setModalInfo({isOpen: false, message: ''});

    return (
        <footer className="bg-certa-blue mt-12 pt-10 pb-6 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Column 1 */}
                    <div>
                        <h4 className="text-xl font-bold mb-3 text-certa-orange">CERTA FARMÁCIA</h4>
                        <p className="text-sm mb-2">CNPJ: 00.000.000/0001-00</p>
                        <p className="text-sm mb-2">Atendimento: (44) 9999-9999</p>
                        <p className="text-sm mb-4">Email: contato@certafarmacia.com.br</p>
                        <div className="flex space-x-3">
                            <a href="#" className="hover:text-certa-orange transition"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-certa-orange transition"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-certa-orange transition"><Youtube className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3">Informações</h4>
                        <ul className="space-y-2 text-sm">
                            <li><button onClick={() => openModal('Esta seção "Quem Somos" será implementada em breve.')} className="hover:text-certa-orange transition">Quem Somos</button></li>
                            <li><button onClick={() => openModal('Esta seção "Nossas Lojas" será implementada em breve.')} className="hover:text-certa-orange transition">Nossas Lojas</button></li>
                            <li><button onClick={() => openModal('Esta seção "Política de Troca" será implementada em breve.')} className="hover:text-certa-orange transition">Política de Troca</button></li>
                            <li><button onClick={() => openModal('Esta seção "Política de Privacidade" será implementada em breve.')} className="hover:text-certa-orange transition">Política de Privacidade</button></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3">Ajuda</h4>
                        <ul className="space-y-2 text-sm">
                            <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-certa-orange transition">Voltar ao Topo</button></li>
                            <li><button onClick={() => openModal('Esta seção "Minha Conta" será implementada em breve.')} className="hover:text-certa-orange transition">Minha Conta</button></li>
                            <li><button onClick={() => openModal('Esta seção "Rastrear Pedido" será implementada em breve.')} className="hover:text-certa-orange transition">Rastrear Pedido</button></li>
                            <li><button onClick={() => openModal('Esta seção "Como Comprar" será implementada em breve.')} className="hover:text-certa-orange transition">Como Comprar</button></li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3">Segurança</h4>
                        <div className="flex flex-col space-y-2">
                             <img src="https://placehold.co/100x60/FFFFFF/0A3350?text=Selo+Ebit" alt="Selo Ebit" className="w-24 rounded" />
                             <img src="https://placehold.co/100x60/FFFFFF/0A3350?text=Selo+Google" alt="Selo Google" className="w-24 rounded" />
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs">
                    <p>&copy; 2024 CERTA Farmácia. Todos os direitos reservados.</p>
                    <div className="mt-4">
                        <p className="font-semibold mb-2">Meios de Pagamento:</p>
                        <img src="https://placehold.co/150x20/FF6B00/ffffff?text=Bandeiras+de+Cartões" alt="Bandeiras de Cartões" className="mx-auto rounded" />
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