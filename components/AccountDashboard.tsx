import React from 'react';
import { LogOut, Package, MapPin, CreditCard, Settings, UserCircle, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AccountDashboard: React.FC = () => {
    const { user, logout } = useAuth();

    if (!user) return null;

    const navItems = [
        { icon: Package, label: 'Meus Pedidos', desc: 'Rastreie e visualize histórico' },
        { icon: FileText, label: 'Minhas Receitas', desc: 'Gerencie suas receitas médicas' },
        { icon: MapPin, label: 'Endereços', desc: 'Gerencie seus locais de entrega' },
        { icon: CreditCard, label: 'Cartões', desc: 'Seus métodos de pagamento' },
        { icon: Settings, label: 'Dados Pessoais', desc: 'Alterar senha e informações' },
    ];

    return (
        <div className="animate-fadeIn pb-12">
            {/* User Header */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 flex flex-col md:flex-row items-center justify-between border-l-4 border-certa-blue">
                <div className="flex items-center mb-4 md:mb-0">
                    <div className="w-20 h-20 bg-certa-blue rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg mr-6">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Olá, {user.name}</h2>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                </div>
                <button 
                    onClick={logout}
                    className="flex items-center px-6 py-2 border border-red-200 text-red-600 rounded-full hover:bg-red-50 transition"
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair da Conta
                </button>
            </div>

            {/* Dashboard Grid */}
            <h3 className="text-xl font-bold text-certa-blue mb-6">Minha Área</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {navItems.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer group border border-transparent hover:border-certa-orange">
                        <div className="flex items-center mb-4">
                            <div className="p-3 bg-blue-50 text-certa-blue rounded-lg group-hover:bg-certa-orange group-hover:text-white transition duration-300">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-lg ml-3 text-gray-800">{item.label}</h4>
                        </div>
                        <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity Placeholder */}
            <div className="mt-12">
                 <h3 className="text-xl font-bold text-certa-blue mb-6">Pedidos Recentes</h3>
                 <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-8 text-center text-gray-400">
                        <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Você ainda não realizou pedidos recentes.</p>
                        <button className="mt-4 text-certa-orange font-semibold hover:underline">Ir para a loja</button>
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default AccountDashboard;
