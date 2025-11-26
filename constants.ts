import { SectionData } from './types';

export const SECTIONS: Record<string, SectionData> = {
    massa: {
        id: 'massa',
        title: 'Ganho de Massa',
        hero: {
            title: 'Conquiste seu Máximo: Suplementos para Ganho de Massa',
            subtitle: 'Os melhores Wheys, Creatinas e Aminoácidos selecionados pelos nossos especialistas.',
            image: 'https://placehold.co/300x300/0A3350/ffffff?text=Potência+e+Volume',
            bgColor: '#1C75BC',
            buttonText: 'Ver todos os produtos',
            buttonIcon: 'dumbbell',
            textColorClass: 'text-certa-blue'
        },
        filters: [
            { id: 'proteinas', label: 'Proteínas', count: 32 },
            { id: 'creatina', label: 'Creatina', count: 16 },
            { id: 'aminoacidos', label: 'Aminoácidos', count: 20 },
            { id: 'pretreino', label: 'Pré-Treino', count: 12 },
        ],
        products: [
            { id: 'm5', name: 'Dado de Creatina Caramelo (30un)', brand: 'CERTA Pharma', price: 64.90, category: 'creatina', image: 'https://placehold.co/200x200/F0F9FF/0A3350?text=Dado+Caramelo', tag: 'LANÇAMENTO' },
            { id: 'm1', name: 'Whey Protein Concentrado Premium (1kg)', brand: 'MaxiMuscle', price: 159.90, category: 'proteinas', image: 'https://placehold.co/200x200/F0F9FF/0A3350?text=Whey+Protein' },
            { id: 'm2', name: 'Creatina Monoidratada Micronizada (300g)', brand: 'PuraForça', price: 79.90, category: 'creatina', image: 'https://placehold.co/200x200/F0F9FF/0A3350?text=Creatina' },
            { id: 'm3', name: 'BCAA 2:1:1 de Alto Grau (120 cápsulas)', brand: 'CERTA Pharma', price: 95.00, category: 'aminoacidos', image: 'https://placehold.co/200x200/F0F9FF/0A3350?text=BCAA', tag: 'MANIPULADO' },
            { id: 'm4', name: 'Pré-Treino Xtreme Focus (30 doses)', brand: 'Energy Boost', price: 145.00, category: 'pretreino', image: 'https://placehold.co/200x200/F0F9FF/0A3350?text=Pre-Treino' },
        ]
    },
    emagrecimento: {
        id: 'emagrecimento',
        title: 'Emagrecimento',
        hero: {
            title: 'Emagrecimento Saudável e Definitivo',
            subtitle: 'Fórmulas manipuladas, termogênicos e nutracêuticos para acelerar seu metabolismo.',
            image: 'https://placehold.co/300x300/F0FDF4/059669?text=Saúde+e+Leveza',
            bgColor: '#059669',
            buttonText: 'Ver ofertas especiais',
            buttonIcon: 'flame',
            textColorClass: 'text-certa-green'
        },
        filters: [
            { id: 'termogenicos', label: 'Termogênicos' },
            { id: 'bloqueadores', label: 'Bloqueadores' },
            { id: 'inibidores', label: 'Inibidores' },
            { id: 'chas', label: 'Chás' },
        ],
        products: [
            { id: 'e1', name: 'Thermo Burn Extreme (60 caps)', brand: 'BurnX', price: 89.90, category: 'termogenicos', image: 'https://placehold.co/200x200/F0F9FF/059669?text=Termo+Burn' },
            { id: 'e2', name: 'Morosil 500mg - Redução Abdominal', brand: 'CERTA Pharma', price: 120.00, category: 'inibidores', image: 'https://placehold.co/200x200/F0F9FF/059669?text=Morosil', tag: 'MANIPULADO' },
            { id: 'e3', name: 'Chá Verde Solúvel Detox (200g)', brand: 'NatureLife', price: 45.50, category: 'chas', image: 'https://placehold.co/200x200/F0F9FF/059669?text=Cha+Verde' },
            { id: 'e4', name: 'Faseolamina 500mg (Bloqueador)', brand: 'BioTech', price: 68.90, category: 'bloqueadores', image: 'https://placehold.co/200x200/F0F9FF/059669?text=Faseolamina' },
        ]
    },
    vitaminas: {
        id: 'vitaminas',
        title: 'Vitaminas & Minerais',
        hero: {
            title: 'Imunidade e Bem-Estar: Vitaminas e Minerais Essenciais',
            subtitle: 'Fórmulas de alta absorção para fortalecer sua saúde diária.',
            image: 'https://placehold.co/300x300/F0F9FF/1C75BC?text=Imunidade+Saúde',
            bgColor: '#1C75BC',
            buttonText: 'Ver o catálogo completo',
            buttonIcon: 'heart',
            textColorClass: 'text-certa-accent'
        },
        filters: [
            { id: 'vitaminac', label: 'Vitamina C' },
            { id: 'omega3', label: 'Ômega 3' },
            { id: 'complexob', label: 'Complexo B' },
            { id: 'minerais', label: 'Minerais' },
            { id: 'saudeossea', label: 'Saúde Óssea' },
        ],
        products: [
            { id: 'v1', name: 'Vitamina C 1000mg (60 comprimidos)', brand: 'ImunoMax', price: 55.90, category: 'vitaminac', image: 'https://placehold.co/200x200/F0F9FF/1C75BC?text=Vitamina+C' },
            { id: 'v2', name: 'Ômega 3 EPA/DHA Concentrado (120 cápsulas)', brand: 'CERTA Pharma', price: 110.00, category: 'omega3', image: 'https://placehold.co/200x200/F0F9FF/1C75BC?text=Omega+3', tag: 'OFERTA' },
            { id: 'v3', name: 'Complexo B Concentrado (60 doses)', brand: 'HealthDaily', price: 85.00, category: 'complexob', image: 'https://placehold.co/200x200/F0F9FF/1C75BC?text=Complexo+B' },
            { id: 'v4', name: 'Vitamina D3 2000UI em Cápsulas (90 un)', brand: 'OsteoCare', price: 39.90, category: 'saudeossea', image: 'https://placehold.co/200x200/F0F9FF/1C75BC?text=Vitamina+D' },
        ]
    },
    cuidados: {
        id: 'cuidados',
        title: 'Cuidados Especiais',
        hero: {
            title: 'Cuidados Especiais: Dermocosméticos e Fórmulas Exclusivas',
            subtitle: 'A saúde que você precisa, da pele ao bem-estar íntimo.',
            image: 'https://placehold.co/300x300/F0F9FF/0A3350?text=Beleza+e+Saúde',
            bgColor: '#0A3350',
            buttonText: 'Ver todos os Cuidados',
            buttonIcon: 'heart-handshake',
            textColorClass: 'text-certa-blue'
        },
        filters: [
            { id: 'dermocosmeticos', label: 'Dermocosméticos' },
            { id: 'cabelounhas', label: 'Cabelo & Unhas' },
            { id: 'fitoterapicos', label: 'Fitoterápicos' },
            { id: 'saudehomem', label: 'Saúde do Homem' },
            { id: 'saudeintima', label: 'Saúde Íntima' },
        ],
        products: [
            { id: 'c1', name: 'Sérum Facial Ácido Hialurônico 5%', brand: 'DermoSkin', price: 135.00, category: 'dermocosmeticos', image: 'https://placehold.co/200x200/F0F9FF/0A3350?text=Acido+Hialuronico' },
            { id: 'c2', name: 'Colágeno Hidrolisado Verisol (30 sachês)', brand: 'BeautyFirma', price: 179.90, category: 'cabelounhas', image: 'https://placehold.co/200x200/F0F9FF/0A3350?text=Colageno' },
            { id: 'c3', name: 'Minoxidil 5% Loção Capilar (60ml)', brand: 'CERTA Pharma', price: 75.00, category: 'cabelounhas', image: 'https://placehold.co/200x200/F0F9FF/0A3350?text=Minoxidil', tag: 'MANIPULADO' },
            { id: 'c4', name: 'Maca Peruana Pura (120 cápsulas)', brand: 'NaturalEssence', price: 99.90, category: 'fitoterapicos', image: 'https://placehold.co/200x200/F0F9FF/0A3350?text=Maca+Peruana' },
        ]
    }
};