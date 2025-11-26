import React from 'react';
import { Dumbbell, Flame, Heart, HeartHandshake } from 'lucide-react';

interface HeroProps {
    title: string;
    subtitle: string;
    image: string;
    bgColor: string;
    buttonText: string;
    buttonIconName: string;
    textColorClass: string;
}

const iconMap: Record<string, React.FC<any>> = {
    'dumbbell': Dumbbell,
    'flame': Flame,
    'heart': Heart,
    'heart-handshake': HeartHandshake
};

const Hero: React.FC<HeroProps> = ({ title, subtitle, image, bgColor, buttonText, buttonIconName, textColorClass }) => {
    const Icon = iconMap[buttonIconName] || Heart;

    return (
        <section className="mb-12 rounded-xl overflow-hidden shadow-lg transition-all duration-500 ease-in-out" style={{ backgroundColor: bgColor }}>
            <div className="p-8 md:p-16 flex flex-col md:flex-row items-center justify-between">
                <div className="text-white md:max-w-xl mb-6 md:mb-0">
                    <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mt-2 mb-4 animate-fade-in-up">
                        {title}
                    </h2>
                    <p className="text-lg mb-6 opacity-90">
                        {subtitle}
                    </p>
                    <button className={`inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg bg-white hover:bg-gray-100 transition duration-300 transform hover:scale-105 ${textColorClass}`}>
                        {buttonText}
                        <Icon className="w-5 h-5 ml-2" />
                    </button>
                </div>
                <div className="flex-shrink-0">
                    <img src={image} alt={title} className="rounded-lg max-w-full h-auto shadow-md" />
                </div>
            </div>
        </section>
    );
};

export default Hero;