import React from 'react';
import { Dumbbell, Scale, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { TabId } from '../types';

interface CategoryNavProps {
    onSelectCategory: (tab: TabId) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ onSelectCategory }) => {
    const categories = [
        {
            id: 'massa' as TabId,
            label: 'GANHO DE MASSA',
            icon: Dumbbell,
            gradient: 'from-[#6366f1] to-[#a855f7]', // Roxo/Violeta
            shadowColor: 'shadow-indigo-200'
        },
        {
            id: 'emagrecimento' as TabId,
            label: 'EMAGRECIMENTO',
            icon: Scale,
            gradient: 'from-[#fbbf24] to-[#f97316]', // Laranja/Amarelo
            shadowColor: 'shadow-orange-200'
        },
        {
            id: 'vitaminas' as TabId,
            label: 'IMUNIDADE',
            icon: Shield,
            gradient: 'from-[#34d399] to-[#10b981]', // Verde/Esmeralda
            shadowColor: 'shadow-emerald-200'
        },
        {
            id: 'cuidados' as TabId,
            label: 'PELE E CABELO',
            icon: Sparkles,
            gradient: 'from-[#f472b6] to-[#ec4899]', // Rosa
            shadowColor: 'shadow-pink-200'
        }
    ];

    return (
        <section className="mb-16 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 px-2">
                <div>
                    <h3 className="text-certa-orange text-xs font-bold uppercase tracking-widest mb-2">NAVEGUE POR CATEGORIA</h3>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-certa-blue">Qual seu objetivo hoje?</h2>
                </div>
                <button 
                    onClick={() => onSelectCategory('massa')}
                    className="hidden md:flex items-center text-gray-500 hover:text-certa-orange transition font-medium text-sm mt-4 md:mt-0"
                >
                    Ver todas as categorias <ArrowRight className="w-4 h-4 ml-1" />
                </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <div 
                        key={cat.id}
                        onClick={() => onSelectCategory(cat.id)}
                        className={`group cursor-pointer rounded-2xl bg-white shadow-xl hover:shadow-2xl hover:${cat.shadowColor} transition-all duration-300 overflow-hidden transform hover:-translate-y-2`}
                    >
                        {/* Parte colorida superior com ícone */}
                        <div className={`h-40 bg-gradient-to-br ${cat.gradient} flex items-center justify-center relative overflow-hidden`}>
                             {/* Formas decorativas sutis no fundo */}
                             <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition duration-500"></div>
                             <div className="absolute top-4 left-4 w-16 h-16 bg-white opacity-5 rounded-full blur-xl"></div>
                             
                             <cat.icon className="w-16 h-16 text-white transform group-hover:scale-110 group-hover:rotate-3 transition duration-500 ease-out" strokeWidth={1.5} />
                        </div>
                        
                        {/* Parte branca inferior com texto */}
                        <div className="p-5 text-center bg-white border-b-4 border-transparent group-hover:border-certa-orange/10 transition-colors">
                            <h4 className="font-bold text-certa-blue text-sm uppercase tracking-wider group-hover:text-certa-orange transition duration-300">{cat.label}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoryNav;