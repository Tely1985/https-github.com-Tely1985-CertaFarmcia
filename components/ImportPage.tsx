
import React, { useState, useRef } from 'react';
import { Upload, FileSpreadsheet, Play, AlertCircle, CheckCircle, Download, RefreshCw, Terminal, AlertTriangle } from 'lucide-react';

interface LogEntry {
    id: number;
    timestamp: string;
    status: 'success' | 'error' | 'info';
    message: string;
}

interface ProcessedItem {
    original: any;
    status: string;
    reason?: string;
}

const ImportPage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [csvData, setCsvData] = useState<string[][]>([]);
    const [headers, setHeaders] = useState<string[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [stats, setStats] = useState({ total: 0, success: 0, errors: 0 });
    const [finished, setFinished] = useState(false);
    const [processedItems, setProcessedItems] = useState<ProcessedItem[]>([]);
    
    const logsEndRef = useRef<HTMLDivElement>(null);

    // Utilitário simples para parsear CSV (considerando vírgula como separador)
    const parseCSV = (text: string) => {
        const lines = text.split('\n').map(line => line.trim()).filter(line => line);
        if (lines.length < 2) return { headers: [], body: [] };
        
        // Assume primeira linha como cabeçalho
        const headers = lines[0].split(',').map(h => h.trim());
        const body = lines.slice(1).map(line => {
            // Regex básico para lidar com vírgulas dentro de aspas, se houver
            const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
            return line.split(regex).map(cell => cell.replace(/^"|"$/g, '').trim());
        });
        
        return { headers, body };
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setFinished(false);
            setLogs([]);
            setStats({ total: 0, success: 0, errors: 0 });
            
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target?.result as string;
                const { headers, body } = parseCSV(text);
                setHeaders(headers);
                setCsvData(body);
                setStats({ total: body.length, success: 0, errors: 0 });
                addLog('info', `Arquivo carregado: ${selectedFile.name} (${body.length} linhas)`);
            };
            reader.readAsText(selectedFile);
        }
    };

    const addLog = (status: 'success' | 'error' | 'info', message: string) => {
        const newLog = {
            id: Date.now() + Math.random(),
            timestamp: new Date().toLocaleTimeString(),
            status,
            message
        };
        setLogs(prev => [...prev.slice(-100), newLog]); // Mantém apenas os últimos 100 logs na UI
        
        // Scroll automático
        if (logsEndRef.current) {
            logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const startImport = async () => {
        if (!csvData.length) return;
        
        setIsProcessing(true);
        setFinished(false);
        setProcessedItems([]);
        addLog('info', 'Iniciando automação de cadastro...');

        const results: ProcessedItem[] = [];
        let successCount = 0;
        let errorCount = 0;

        for (let i = 0; i < csvData.length; i++) {
            const row = csvData[i];
            const rowObj: any = {};
            headers.forEach((h, index) => { rowObj[h] = row[index] || ''; });

            // Atualiza progresso
            setProgress(Math.round(((i + 1) / csvData.length) * 100));

            try {
                // Simula delay de rede (respeitoso, como pedido)
                const delay = Math.floor(Math.random() * 800) + 200; // 200ms a 1000ms
                await sleep(delay);

                // Simulação de Validação/Erro aleatório (15% de chance de erro)
                if (Math.random() < 0.15 || !rowObj.nome) {
                    throw new Error(rowObj.nome ? "Timeout na API do Sistema" : "Nome do produto obrigatório");
                }

                // Simulação de validação de negócio
                if (parseFloat(rowObj.preco_venda) <= 0) {
                    throw new Error("Preço de venda inválido");
                }

                successCount++;
                addLog('success', `[${rowObj.codigo || 'N/A'}] ${rowObj.nome} cadastrado com sucesso.`);
                results.push({ original: rowObj, status: 'SUCESSO' });

            } catch (error: any) {
                errorCount++;
                addLog('error', `[${rowObj.codigo || 'N/A'}] Falha: ${error.message}`);
                results.push({ original: rowObj, status: 'ERRO', reason: error.message });
            }

            setStats({ total: csvData.length, success: successCount, errors: errorCount });
        }

        setProcessedItems(results);
        setIsProcessing(false);
        setFinished(true);
        addLog('info', 'Processamento finalizado.');
    };

    const downloadCSV = (type: 'success' | 'error') => {
        const items = type === 'success' 
            ? processedItems.filter(i => i.status === 'SUCESSO')
            : processedItems.filter(i => i.status === 'ERRO');
            
        if (items.length === 0) return;

        // Monta CSV
        const csvHeaders = headers.join(',') + (type === 'error' ? ',MOTIVO_ERRO' : '');
        const csvRows = items.map(item => {
            const originalValues = headers.map(h => item.original[h]);
            if (type === 'error') originalValues.push(item.reason || 'Desconhecido');
            return originalValues.join(',');
        });

        const csvContent = [csvHeaders, ...csvRows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', type === 'success' ? 'cadastrados_com_sucesso.csv' : 'erros_cadastro.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-8 pb-12 animate-fadeIn">
            {/* Header da Área */}
            <div className="bg-certa-blue rounded-xl p-8 text-white shadow-lg flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Automação de Cadastros</h2>
                    <p className="opacity-80">Importação em massa para sistema legado via API Simulada</p>
                </div>
                <div className="bg-white/10 p-3 rounded-full">
                    <RefreshCw className="w-8 h-8 animate-pulse-slow" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Coluna Esquerda: Upload e Status */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Card de Upload */}
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                        <h3 className="font-bold text-gray-700 mb-4 flex items-center">
                            <Upload className="w-5 h-5 mr-2 text-certa-orange" />
                            1. Carregar CSV
                        </h3>
                        
                        {!file ? (
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <FileSpreadsheet className="w-8 h-8 mb-3 text-gray-400" />
                                    <p className="text-sm text-gray-500"><span className="font-semibold">Clique para enviar</span> ou arraste</p>
                                    <p className="text-xs text-gray-500">produtos.csv</p>
                                </div>
                                <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
                            </label>
                        ) : (
                            <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
                                <div className="flex items-center overflow-hidden">
                                    <FileSpreadsheet className="w-8 h-8 text-certa-blue mr-3 flex-shrink-0" />
                                    <div className="truncate">
                                        <p className="font-semibold text-sm text-certa-blue truncate">{file.name}</p>
                                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setFile(null)} 
                                    disabled={isProcessing}
                                    className="text-red-500 text-xs hover:underline ml-2"
                                >
                                    Trocar
                                </button>
                            </div>
                        )}

                        <div className="mt-6">
                            <button
                                onClick={startImport}
                                disabled={!file || isProcessing || (finished && stats.total > 0)}
                                className={`w-full py-3 rounded-lg font-bold flex items-center justify-center transition-all ${
                                    !file || isProcessing 
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-certa-orange text-white hover:bg-opacity-90 shadow-lg transform hover:-translate-y-1'
                                }`}
                            >
                                {isProcessing ? (
                                    <>
                                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" /> Processando...
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-5 h-5 mr-2" /> Iniciar Automação
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Card de Estatísticas */}
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                        <h3 className="font-bold text-gray-700 mb-4">Progresso Geral</h3>
                        
                        <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
                            <div 
                                className="bg-certa-blue h-4 rounded-full transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-sm font-semibold text-gray-600 mb-6">
                            <span>0%</span>
                            <span>{progress}%</span>
                            <span>100%</span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="p-2 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500">Total</p>
                                <p className="text-xl font-bold text-gray-700">{stats.total}</p>
                            </div>
                            <div className="p-2 bg-green-50 rounded-lg">
                                <p className="text-xs text-green-600">Sucesso</p>
                                <p className="text-xl font-bold text-green-600">{stats.success}</p>
                            </div>
                            <div className="p-2 bg-red-50 rounded-lg">
                                <p className="text-xs text-red-600">Falhas</p>
                                <p className="text-xl font-bold text-red-600">{stats.errors}</p>
                            </div>
                        </div>
                    </div>

                    {/* Downloads */}
                    {finished && (
                        <div className="animate-fadeIn space-y-3">
                            {stats.success > 0 && (
                                <button 
                                    onClick={() => downloadCSV('success')}
                                    className="w-full flex items-center justify-between p-4 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
                                >
                                    <span className="flex items-center"><CheckCircle className="w-5 h-5 mr-2" /> Relatório de Sucesso</span>
                                    <Download className="w-5 h-5" />
                                </button>
                            )}
                            {stats.errors > 0 && (
                                <button 
                                    onClick={() => downloadCSV('error')}
                                    className="w-full flex items-center justify-between p-4 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition"
                                >
                                    <span className="flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> Relatório de Erros</span>
                                    <Download className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Coluna Direita: Terminal */}
                <div className="lg:col-span-2">
                    <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[600px] border border-gray-700">
                        <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2 border-b border-gray-700">
                            <Terminal className="w-4 h-4 text-gray-400" />
                            <span className="text-xs text-gray-300 font-mono">certa-cli — automation worker</span>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto font-mono text-sm space-y-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
                            {logs.length === 0 && (
                                <div className="text-gray-500 italic">Aguardando início do processo...</div>
                            )}
                            {logs.map((log) => (
                                <div key={log.id} className="flex items-start">
                                    <span className="text-gray-500 mr-2">[{log.timestamp}]</span>
                                    {log.status === 'success' && <span className="text-green-400 mr-2">✔ SUCCESS</span>}
                                    {log.status === 'error' && <span className="text-red-400 mr-2">✖ ERROR  </span>}
                                    {log.status === 'info' && <span className="text-blue-400 mr-2">ℹ INFO   </span>}
                                    <span className="text-gray-300">{log.message}</span>
                                </div>
                            ))}
                            {isProcessing && (
                                <div className="animate-pulse text-certa-orange">_</div>
                            )}
                            <div ref={logsEndRef} />
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-500 flex items-start">
                         <AlertCircle className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                         <p>Este painel simula a execução de um script Python em background. Nenhum dado real é enviado para um servidor externo nesta demonstração.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportPage;
