
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Calendar as CalendarIcon, FileText, Plus, Download, X, Check } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { events } from '../mocks/eventsMocks';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';

const CipaEvents = () => {
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState<Date | undefined>(new Date());
  const [numberOfCodes, setNumberOfCodes] = useState(10);
  const [eventsList, setEventsList] = useState(events);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const handleCreateEvent = () => {
    if (!eventName || !eventDescription || !eventDate) {
      toast({
        title: "Erro ao criar evento",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Generate codes
    const dateCode = format(eventDate, 'ddMM');
    const eventPrefix = eventName.substring(0, 2).toUpperCase();
    const codes = Array.from({ length: numberOfCodes }, (_, i) => 
      `${eventPrefix}${dateCode}-${(i + 1).toString().padStart(3, '0')}`
    );

    // Create new event
    const newEvent = {
      id: `event${eventsList.length + 1}`,
      name: eventName,
      description: eventDescription,
      date: format(eventDate, 'yyyy-MM-dd'),
      codes: codes,
      createdBy: "cipa1",
      createdAt: new Date().toISOString()
    };

    // Add to events list
    setEventsList([...eventsList, newEvent]);

    // Reset form
    setEventName('');
    setEventDescription('');
    setEventDate(new Date());
    setNumberOfCodes(10);
    setIsCreatingEvent(false);

    toast({
      title: "Evento criado com sucesso!",
      description: `O evento "${eventName}" foi criado com ${numberOfCodes} códigos.`
    });
  };

  const handleExportCodes = (eventId: string) => {
    const event = eventsList.find(e => e.id === eventId);
    if (!event) return;

    const codesText = event.codes.join('\n');
    const blob = new Blob([codesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `codigos_${event.name.replace(/\s/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Códigos exportados",
      description: "Os códigos do evento foram exportados com sucesso."
    });
  };

  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      <main className="container mx-auto pt-24 px-4">
        <h1 className="text-center mb-4">Gestão de Eventos CIPA</h1>
        <p className="text-center text-muted-foreground mb-8">
          Crie e gerencie eventos e seus códigos de participação
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="pixel-card animate-pixel-fade-in">
              {!isCreatingEvent ? (
                <div className="text-center py-6">
                  <FileText className="w-12 h-12 text-game-purple mx-auto mb-4" />
                  <h2 className="text-lg mb-2">Criar Novo Evento</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Crie um novo evento e gere códigos de participação automaticamente
                  </p>
                  <button
                    onClick={() => setIsCreatingEvent(true)}
                    className="pixel-button flex items-center justify-center gap-2 mx-auto"
                  >
                    <Plus className="w-4 h-4" /> Novo Evento
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-pixel">Criação de Evento</h2>
                    <button 
                      onClick={() => setIsCreatingEvent(false)}
                      className="text-white/60 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-1" htmlFor="event-name">
                        Nome do Evento *
                      </label>
                      <Input 
                        id="event-name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        placeholder="Ex: Workshop de Segurança"
                        className="border-game-purple"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1" htmlFor="event-description">
                        Descrição *
                      </label>
                      <textarea
                        id="event-description"
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        className="w-full h-24 rounded-md border border-game-purple bg-game-darkPurple/30 px-4 py-2 text-white"
                        placeholder="Descreva o evento..."
                        required
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1">
                        Data do Evento *
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="flex h-10 w-full rounded-md border border-game-purple bg-game-darkPurple/30 px-3 py-2 text-sm text-left">
                            {eventDate ? (
                              format(eventDate, "PPP", { locale: ptBR })
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={eventDate}
                            onSelect={setEventDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            locale={ptBR}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1" htmlFor="number-of-codes">
                        Quantidade de Códigos
                      </label>
                      <Input 
                        id="number-of-codes"
                        type="number"
                        min={1}
                        max={100}
                        value={numberOfCodes}
                        onChange={(e) => setNumberOfCodes(parseInt(e.target.value) || 10)}
                        className="border-game-purple"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button
                        onClick={handleCreateEvent}
                        className="pixel-button w-full flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" /> Criar Evento
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="pixel-card animate-pixel-fade-in">
              <h2 className="text-lg font-pixel mb-4">Eventos Cadastrados</h2>
              
              <div className="space-y-4">
                {eventsList.map((event) => (
                  <div 
                    key={event.id} 
                    className={`border rounded-md overflow-hidden ${
                      selectedEvent === event.id 
                        ? 'border-game-purple bg-game-purple/10' 
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div 
                      className="p-4 cursor-pointer"
                      onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium">{event.name}</h3>
                        <span className="text-sm text-white/70">
                          {format(new Date(event.date), 'dd/MM/yyyy')}
                        </span>
                      </div>
                      
                      <p className="text-sm text-white/70 mt-1">{event.description}</p>
                    </div>
                    
                    {selectedEvent === event.id && (
                      <div className="border-t border-game-purple/30 p-4 bg-game-darkPurple/20">
                        <div className="mb-3">
                          <h4 className="text-sm font-medium mb-2">Códigos de Participação</h4>
                          <div className="bg-game-darkPurple rounded-md p-3 max-h-32 overflow-y-auto">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {event.codes.map((code, index) => (
                                <div key={index} className="text-xs font-mono px-2 py-1 bg-game-darkPurple/70 rounded">
                                  {code}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleExportCodes(event.id)}
                            className="pixel-button bg-game-darkPurple flex items-center gap-2 text-sm"
                          >
                            <Download className="w-4 h-4" />
                            Exportar Códigos
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {eventsList.length === 0 && (
                  <div className="text-center py-8 border border-dashed border-white/20 rounded-md">
                    <FileText className="w-10 h-10 text-white/20 mx-auto mb-2" />
                    <p className="text-white/50">Nenhum evento cadastrado</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CipaEvents;
