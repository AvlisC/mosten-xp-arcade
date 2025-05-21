
import React, { useState, useRef } from 'react';
import Navigation from '../components/Navigation';
import { events } from '../mocks/eventsMocks';
import { Event } from '../types';
import { Input } from '@/components/ui/input';
import { CalendarDays, FileText, Tag, Download, Plus, Check, Copy, X } from 'lucide-react';
import { toast } from 'sonner';

const CipaEvents = () => {
  const [eventsList, setEventsList] = useState<Event[]>(events);
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  // Event form state
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState(''); // New field for end date
  const [codesCount, setCodesCount] = useState(3);
  const [generatedCodes, setGeneratedCodes] = useState<string[]>([]);
  
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Generate random code for event
  const generateCode = (prefix: string) => {
    const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `${prefix}-${randomPart}`;
  };

  // Generate multiple codes for an event
  const generateEventCodes = (date: string, count: number) => {
    const datePrefix = date.replace(/-/g, '').substring(2, 8); // Format YYMMDD
    const codes = [];
    
    for (let i = 0; i < count; i++) {
      codes.push(generateCode(datePrefix));
    }
    
    return codes;
  };

  // Handle event form submission
  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!eventName || !eventDescription || !eventDate || !eventEndDate) {
      toast.error("Preencha todos os campos obrigatórios", {
        description: "Nome, descrição e datas são obrigatórios."
      });
      return;
    }
    
    // Validate end date is on or after start date
    if (eventEndDate < eventDate) {
      toast.error("Data inválida", {
        description: "A data de término deve ser igual ou posterior à data de início."
      });
      return;
    }

    const codes = generateEventCodes(eventDate, codesCount);
    setGeneratedCodes(codes);

    const newEvent: Event = {
      id: `event${Date.now()}`,
      name: eventName,
      description: eventDescription,
      date: eventDate,
      endDate: eventEndDate, // Include end date
      codes,
      createdBy: "cipa1", // Replace with actual user ID
      createdAt: new Date().toISOString().split('T')[0]
    };

    setEventsList([...eventsList, newEvent]);
    
    toast.success("Evento criado com sucesso!", {
      description: `${codesCount} códigos foram gerados para o evento.`
    });
  };

  // Reset form fields
  const resetForm = () => {
    setEventName('');
    setEventDescription('');
    setEventDate('');
    setEventEndDate('');
    setCodesCount(3);
    setGeneratedCodes([]);
    setIsAddingEvent(false);
  };

  // Export codes to a text file
  const exportCodes = (eventId: string) => {
    const event = eventsList.find(e => e.id === eventId);
    if (!event) return;

    const content = event.codes.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.name.replace(/\s+/g, '_')}_codes.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Códigos exportados", {
      description: "Os códigos foram exportados com sucesso."
    });
  };

  // Copy all codes to clipboard
  const copyAllCodes = (codes: string[]) => {
    const text = codes.join('\n');
    navigator.clipboard.writeText(text);
    
    toast.success("Códigos copiados", {
      description: "Todos os códigos foram copiados para a área de transferência."
    });
  };

  // Copy a single code to clipboard
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    
    toast.success("Código copiado", {
      description: `O código ${code} foi copiado para a área de transferência.`
    });
  };

  // Format date for display
  const formatDate = (date: string, endDate?: string) => {
    if (!date) return '';
    
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric'
    };
    
    const formattedStartDate = new Date(date).toLocaleDateString('pt-BR', options);
    
    if (endDate && endDate !== date) {
      const formattedEndDate = new Date(endDate).toLocaleDateString('pt-BR', options);
      return `${formattedStartDate} até ${formattedEndDate}`;
    }
    
    return formattedStartDate;
  };

  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      <main className="container mx-auto pt-24 px-4">
        <h1 className="text-center mb-8">Eventos CIPA</h1>
        
        {!isAddingEvent ? (
          <div className="flex justify-end mb-6">
            <button
              className="pixel-button flex items-center gap-2"
              onClick={() => setIsAddingEvent(true)}
            >
              <Plus className="w-4 h-4" /> Criar Evento
            </button>
          </div>
        ) : (
          <div className="pixel-card mb-8 animate-pixel-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-pixel">Criar Novo Evento</h2>
              <button
                className="text-white/70 hover:text-white"
                onClick={resetForm}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateEvent}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="event-name" className="block mb-1 text-sm">
                    Nome do Evento *
                  </label>
                  <Input
                    id="event-name"
                    value={eventName}
                    onChange={e => setEventName(e.target.value)}
                    placeholder="Ex: Workshop de Segurança"
                    className="border-game-purple"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="event-description" className="block mb-1 text-sm">
                    Descrição *
                  </label>
                  <textarea
                    id="event-description"
                    value={eventDescription}
                    onChange={e => setEventDescription(e.target.value)}
                    placeholder="Descreva o evento..."
                    className="w-full h-24 rounded-md border border-game-purple bg-game-darkPurple/30 px-4 py-2 text-white"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="event-date" className="block mb-1 text-sm">
                      Data de Início *
                    </label>
                    <Input
                      id="event-date"
                      type="date"
                      value={eventDate}
                      onChange={e => setEventDate(e.target.value)}
                      className="border-game-purple"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="event-end-date" className="block mb-1 text-sm">
                      Data de Término *
                    </label>
                    <Input
                      id="event-end-date"
                      type="date"
                      value={eventEndDate}
                      onChange={e => setEventEndDate(e.target.value)}
                      className="border-game-purple"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="codes-count" className="block mb-1 text-sm">
                    Quantidade de Códigos
                  </label>
                  <Input
                    id="codes-count"
                    type="number"
                    min={1}
                    max={100}
                    value={codesCount}
                    onChange={e => setCodesCount(parseInt(e.target.value) || 3)}
                    className="border-game-purple"
                  />
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="pixel-button w-full flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" /> Criar Evento e Gerar Códigos
                  </button>
                </div>
              </div>
            </form>
            
            {generatedCodes.length > 0 && (
              <div className="mt-8">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-md font-pixel">Códigos Gerados</h3>
                  <button
                    className="text-sm text-white/70 hover:text-white flex items-center gap-1"
                    onClick={() => copyAllCodes(generatedCodes)}
                  >
                    <Copy className="w-3.5 h-3.5" /> Copiar Todos
                  </button>
                </div>
                
                <textarea
                  ref={textAreaRef}
                  value={generatedCodes.join('\n')}
                  readOnly
                  className="w-full h-32 rounded-md border border-game-purple bg-game-darkPurple/30 px-4 py-2 text-white mb-4"
                />
                
                <div className="flex justify-between">
                  <button
                    className="text-white/70 hover:text-white flex items-center gap-1 text-sm"
                    onClick={resetForm}
                  >
                    <X className="w-3.5 h-3.5" /> Fechar
                  </button>
                  
                  <button
                    className="text-white/70 hover:text-white flex items-center gap-1 text-sm"
                    onClick={() => exportCodes(eventsList[eventsList.length - 1].id)}
                  >
                    <Download className="w-3.5 h-3.5" /> Exportar como TXT
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="space-y-6">
          {eventsList.length === 0 ? (
            <div className="text-center py-12 pixel-card animate-pixel-fade-in">
              <CalendarDays className="w-12 h-12 text-white/30 mx-auto mb-3" />
              <p className="text-white/70">Nenhum evento criado ainda</p>
            </div>
          ) : (
            eventsList.map(event => (
              <div key={event.id} className="pixel-card animate-pixel-fade-in">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-pixel mb-1">{event.name}</h3>
                    <p className="text-sm text-white/70 mb-3">{event.description}</p>
                    
                    <div className="flex gap-4 text-sm text-white/50">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {formatDate(event.date, event.endDate)}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {event.codes.length} códigos
                      </div>
                    </div>
                  </div>
                  
                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      className="pixel-button text-xs py-1 px-3 flex items-center gap-1"
                      onClick={() => exportCodes(event.id)}
                    >
                      <Download className="w-3.5 h-3.5" /> Exportar Códigos
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-sm mb-2">Códigos de Participação:</p>
                  <div className="flex flex-wrap gap-2">
                    {event.codes.map((code, index) => (
                      <div 
                        key={code} 
                        className="bg-game-darkPurple/50 px-3 py-1 rounded flex items-center gap-1"
                      >
                        <span className="text-xs">{code}</span>
                        <button
                          className="text-white/50 hover:text-white"
                          onClick={() => copyCode(code)}
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default CipaEvents;
