
import React from 'react';
import { Dumbbell, Flame, Pill, Sparkles, Heart, Stethoscope, Baby, Percent } from 'lucide-react';
import { TabId } from '../types';

interface AllCategoriesSectionProps {
    onSelectCategory: (tab: TabId) => void;
}

const AllCategoriesSection: React.FC<AllCategoriesSectionProps> = ({ onSelectCategory }) => {
    const categories = [
        {
            id: 'massa' as TabId,
            label: 'Suplementos Esportivos',
            icon: Dumbbell,
            color: 'bg-blue-100 text-blue-600',
            image: 'https://placehold.co/150x150/e0f2fe/0369a1?text=Esporte'
        },
        {
            id: 'emagrecimento' as TabId,
            label: 'Emagrecimento',
            icon: Flame,
            color: 'bg-orange-100 text-orange-600',
            image: 'https://placehold.co/150x150/ffedd5/c2410c?text=Diet'
        },
        {
            id: 'vitaminas' as TabId,
            label: 'Vitaminas & Minerais',
            icon: Pill,
            color: 'bg-green-100 text-green-600',
            image: 'https://placehold.co/150x150/dcfce7/15803d?text=Saude'
        },
        {
            id: 'cuidados' as TabId,
            label: 'Beleza & Estética',
            icon: Sparkles,
            color: 'bg-pink-100 text-pink-600',
            image: 'https://placehold.co/150x150/fce7f3/be185d?text=Beauty'
        },
        {
            id: 'cuidados' as TabId, // Mapping to cuidados for demo
            label: 'Saúde da Mulher',
            icon: Heart,
            color: 'bg-rose-100 text-rose-600',
            image: 'https://placehold.co/150x150/ffe4e6/e11d48?text=Mulher'
        },
        {
            id: 'cuidados' as TabId, // Mapping to cuidados for demo
            label: 'Saúde do Homem',
            icon: Stethoscope,
            color: 'bg-slate-100 text-slate-600',
            image: 'https://placehold.co/150x150/f1f5f9/475569?text=Homem'
        },
        {
            id: 'cuidados' as TabId, // Mapping generic
            label: 'Mamãe & Bebê',
            icon: Baby,
            color: 'bg-purple-100 text-purple-600',
            image: 'https://placehold.co/150x150/f3e8ff/7e22ce?text=Baby'
        },
        {
            id: 'massa' as TabId, // Mapping generic
            label: 'Ofertas & Kits',
            icon: Percent,
            color: 'bg-yellow-100 text-yellow-600',
            image: 'https://placehold.co/150x150/fef9c3/a16207?text=Ofertas'
        }
    ];

    return (
        <section className="py-12 mb-8">
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-certa-blue">Explore por Departamentos</h2>
                <div className="w-16 h-1 bg-certa-orange mx-auto mt-2 rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((cat, index) => (
                    <div 
                        key={index}
                        onClick={() => onSelectCategory(cat.id)}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col items-center text-center"
                    >
                        <div className={`p-4 rounded-full mb-4 ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                            <cat.icon className="w-8 h-8" />
                        </div>
                        <h3 className="font-semibold text-certa-blue group-hover:text-certa-orange transition-colors">
                            {cat.label}
                        </h3>
                        <span className="text-xs text-gray-400 mt-1">Ver produtos</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AllCategoriesSection;
