
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Truck, ShoppingBag, CreditCard, MessageCircle, Phone, Mail, Car, Globe } from 'lucide-react';

const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqItems = [
        {
            title: "Formas de Pagamento",
            icon: CreditCard,
            content: (
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li><strong>Pagamentos via PagSeguro:</strong> Garantia de segurança total para seus dados.</li>
                    <li><strong>Cartões de Crédito:</strong> Aceitamos as principais bandeiras com parcelamento em até 6x sem juros.</li>
                    <li><strong>Débito Bancário:</strong> Para pagamentos à vista.</li>
                    <li><strong>Boleto Bancário:</strong> Processamento em até 2 dias úteis.</li>
                </ul>
            )
        },
        {
            title: "Frete e Devoluções",
            icon: Truck,
            content: (
                <div className="space-y-4 text-gray-600">
                    <p><strong>Cálculo de Frete:</strong> O valor é calculado automaticamente no carrinho ao inserir o seu CEP, baseado no peso dos produtos e local de entrega.</p>
                    <p><strong>Prazo de Entrega:</strong> Exibido no carrinho e confirmado por e-mail após a compra.</p>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <p className="font-bold text-certa-blue mb-2">Política de Troca:</p>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                            <li>Prazo de 7 dias corridos após o recebimento.</li>
                            <li>O produto deve estar lacrado e sem sinais de uso.</li>
                            <li>A restituição ocorre após análise em nosso centro de distribuição.</li>
                            <li>A devolução deve incluir todas as vias da nota fiscal.</li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: "Como Comprar",
            icon: ShoppingBag,
            content: (
                <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                    <li>Navegue pelo site e escolha seus produtos clicando em <strong>COMPRAR</strong>.</li>
                    <li>Adicione quantos itens desejar ao seu carrinho.</li>
                    <li>Clique em "Finalizar Compra" e preencha seu cadastro (ou faça login).</li>
                    <li>Escolha o endereço de entrega e a forma de pagamento.</li>
                    <li>Após a confirmação, você receberá um e-mail com os detalhes e poderá acompanhar tudo na área "Meus Pedidos".</li>
                </ol>
            )
        },
        {
            title: "Entrega",
            icon: MapPin,
            content: (
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li><strong>Recebimento:</strong> Não é obrigatório ser você a receber. Um responsável (porteiro, familiar) pode receber mediante documento com foto.</li>
                    <li><strong>Abrangência:</strong> Realizamos entregas para todo o Brasil.</li>
                    <li><strong>Nota Fiscal:</strong> Enviada fisicamente junto ao pedido e digitalmente por e-mail.</li>
                </ul>
            )
        }
    ];

    return (
        <div className="animate-fadeIn pb-12">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-certa-blue">Central de Ajuda</h2>
                <p className="text-gray-500 mt-2">Tire suas dúvidas e conheça nossos serviços</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: FAQ Accordion */}
                <div className="lg:col-span-2 space-y-4">
                    {faqItems.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <button 
                                onClick={() => toggleAccordion(index)}
                                className={`w-full flex items-center justify-between p-5 text-left transition-colors ${openIndex === index ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                            >
                                <div className="flex items-center">
                                    <div className={`p-2 rounded-full mr-4 ${openIndex === index ? 'bg-certa-orange text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className={`font-bold text-lg ${openIndex === index ? 'text-certa-blue' : 'text-gray-700'}`}>
                                        {item.title}
                                    </span>
                                </div>
                                {openIndex === index ? <ChevronUp className="w-5 h-5 text-certa-orange" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                            </button>
                            
                            {openIndex === index && (
                                <div className="p-6 bg-white border-t border-gray-100 animate-fadeIn">
                                    {item.content}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Right Column: Services & Contact */}
                <div className="space-y-6">
                    {/* Services Cards */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-certa-blue mb-4 flex items-center">
                            <Truck className="w-5 h-5 mr-2 text-certa-orange" />
                            Serviços CERTA
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <Car className="w-4 h-4 mr-2 text-certa-blue mt-1" />
                                <div>
                                    <p className="font-semibold text-sm">Domicílio & Delivery</p>
                                    <p className="text-xs text-gray-500">Retirada de receitas e entrega eficiente.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="w-4 h-4 mr-2 text-certa-blue mt-1" />
                                <div>
                                    <p className="font-semibold text-sm">Estacionamento</p>
                                    <p className="text-xs text-gray-500">Convênio com estacionamentos nas unidades.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Globe className="w-4 h-4 mr-2 text-certa-blue mt-1" />
                                <div>
                                    <p className="font-semibold text-sm">Loja Virtual</p>
                                    <p className="text-xs text-gray-500">loja.certafarmacia.com.br</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-certa-blue text-white rounded-xl shadow-lg p-6">
                        <h3 className="font-bold mb-4 flex items-center">
                            <Phone className="w-5 h-5 mr-2 text-certa-orange" />
                            Canais de Atendimento
                        </h3>
                        
                        <div className="space-y-4 text-sm">
                            <div>
                                <p className="text-certa-orange font-bold text-xs uppercase mb-1">Telefone</p>
                                <p>Rio Preto: (17) 2136-6999</p>
                                <p>Catanduva: (17) 3521-2580</p>
                            </div>
                            
                            <div>
                                <p className="text-certa-orange font-bold text-xs uppercase mb-1">WhatsApp</p>
                                <p className="flex items-center"><MessageCircle className="w-3 h-3 mr-1" /> Rio Preto: (17) 99142-0030</p>
                                <p className="flex items-center"><MessageCircle className="w-3 h-3 mr-1" /> Catanduva: (17) 99142-0011</p>
                            </div>

                            <div>
                                <p className="text-certa-orange font-bold text-xs uppercase mb-1">E-mail para receitas</p>
                                <p className="flex items-center truncate"><Mail className="w-3 h-3 mr-1" /> orcamento@certafarmacia.com.br</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQSection;
