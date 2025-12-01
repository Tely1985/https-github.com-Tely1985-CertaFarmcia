import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal: React.FC = () => {
    const { isAuthModalOpen, closeAuthModal, login, register } = useAuth();
    const [isLoginView, setIsLoginView] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    if (!isAuthModalOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            let success;
            if (isLoginView) {
                success = await login(formData.email, formData.password);
                if (!success) setError('E-mail ou senha inválidos.');
            } else {
                success = await register(formData.name, formData.email, formData.password);
                if (!success) setError('Este e-mail já está cadastrado.');
            }

            if (success) {
                closeAuthModal();
                setFormData({ name: '', email: '', password: '' });
            }
        } catch (err) {
            setError('Ocorreu um erro. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[200] flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative flex flex-col">
                
                {/* Close Button */}
                <button 
                    onClick={closeAuthModal}
                    className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition text-gray-600 z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="bg-certa-blue p-8 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-2">
                            {isLoginView ? 'Bem-vindo de volta!' : 'Crie sua conta'}
                        </h2>
                        <p className="text-certa-light opacity-90">
                            {isLoginView 
                                ? 'Acesse seus pedidos e receitas salvas.' 
                                : 'Junte-se a nós para ofertas exclusivas.'}
                        </p>
                    </div>
                    {/* Decorative Circle */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-certa-orange rounded-full opacity-20 blur-xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-certa-accent rounded-full opacity-20 blur-xl"></div>
                </div>

                {/* Form */}
                <div className="p-8">
                    {/* Tabs */}
                    <div className="flex mb-6 bg-gray-100 p-1 rounded-xl">
                        <button 
                            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${isLoginView ? 'bg-white text-certa-blue shadow-sm' : 'text-gray-500 hover:text-certa-blue'}`}
                            onClick={() => { setIsLoginView(true); setError(''); }}
                        >
                            Login
                        </button>
                        <button 
                            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${!isLoginView ? 'bg-white text-certa-blue shadow-sm' : 'text-gray-500 hover:text-certa-blue'}`}
                            onClick={() => { setIsLoginView(false); setError(''); }}
                        >
                            Criar Conta
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLoginView && (
                            <div className="relative group">
                                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-certa-orange transition" />
                                <input 
                                    type="text" 
                                    placeholder="Nome Completo"
                                    required={!isLoginView}
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-certa-orange focus:ring-1 focus:ring-certa-orange outline-none transition"
                                />
                            </div>
                        )}

                        <div className="relative group">
                            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-certa-orange transition" />
                            <input 
                                type="email" 
                                placeholder="Seu E-mail"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-certa-orange focus:ring-1 focus:ring-certa-orange outline-none transition"
                            />
                        </div>

                        <div className="relative group">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-certa-orange transition" />
                            <input 
                                type="password" 
                                placeholder="Sua Senha"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-certa-orange focus:ring-1 focus:ring-certa-orange outline-none transition"
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg border border-red-100">
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full bg-certa-orange text-white py-3 rounded-xl font-bold hover:bg-opacity-90 transition transform active:scale-95 flex items-center justify-center shadow-lg hover:shadow-xl"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    {isLoginView ? 'Entrar' : 'Cadastrar'}
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </>
                            )}
                        </button>
                    </form>
                    
                    {isLoginView && (
                        <p className="mt-4 text-center text-xs text-gray-400">
                            Dica: Use <span className="font-mono bg-gray-100 p-1 rounded">teste@certa.com</span> / <span className="font-mono bg-gray-100 p-1 rounded">123456</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
