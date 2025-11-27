
export type TabId = 'massa' | 'emagrecimento' | 'vitaminas' | 'cuidados' | 'fale' | 'admin';

export interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    category: string;
    tag?: string;
}

export interface FilterOption {
    id: string;
    label: string;
    count?: number;
}

export interface SectionData {
    id: TabId;
    title: string;
    hero: {
        title: string;
        subtitle: string;
        image: string;
        bgColor: string;
        buttonText: string;
        buttonIcon: string;
        textColorClass: string; 
    };
    filters: FilterOption[];
    products: Product[];
}
