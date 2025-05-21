
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Image, Upload, Check } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const FeedbackSubmission = () => {
  const [description, setDescription] = useState('');
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileSelected(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fileSelected) {
      toast({
        title: "Erro ao enviar feedback",
        description: "Por favor, selecione uma imagem para enviar",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulando upload
    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);
      
      toast({
        title: "Feedback enviado!",
        description: "Seu feedback foi enviado com sucesso."
      });
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setDescription('');
        setFileSelected(null);
        setPreviewUrl(null);
        setIsSuccess(false);
      }, 2000);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      <main className="container mx-auto pt-24 px-4">
        <h1 className="text-center mb-8">Envio de Feedbacks</h1>
        
        <div className="max-w-2xl mx-auto">
          <div className="pixel-card animate-pixel-fade-in">
            <div className="flex justify-center mb-6">
              <div className="bg-game-darkPurple rounded-full w-20 h-20 flex items-center justify-center">
                <Image className="w-10 h-10 text-game-lightPurple" />
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h2 className="text-xl mb-2">Enviar Prints de Feedbacks</h2>
              <p className="text-muted-foreground">Compartilhe feedbacks e elogios que recebeu de clientes ou colegas</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="description" className="block mb-2 font-pixel text-sm">
                  Descrição do Feedback
                </label>
                <textarea
                  id="description"
                  className="w-full h-24 rounded-md border border-game-purple bg-game-darkPurple/30 px-4 py-2 text-white"
                  placeholder="Descreva brevemente o contexto do feedback..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="block mb-2 font-pixel text-sm">
                  Imagem do Feedback
                </label>
                <div className="border-2 border-dashed border-game-purple rounded-md p-8 text-center cursor-pointer hover:bg-game-darkPurple/20 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="feedback-image"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="feedback-image" className="cursor-pointer">
                    {previewUrl ? (
                      <div className="flex flex-col items-center">
                        <img 
                          src={previewUrl} 
                          alt="Preview" 
                          className="max-h-48 mb-4 rounded-md"
                        />
                        <p className="text-sm text-game-lightPurple">Clique para mudar a imagem</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="w-12 h-12 text-game-purple mb-4" />
                        <p className="text-sm">Clique para selecionar uma imagem</p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG ou JPEG (máx. 5MB)</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={isUploading || isSuccess || !fileSelected}
                className={`pixel-button w-full flex items-center justify-center gap-2 ${
                  (isUploading || isSuccess || !fileSelected) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-game-yellow rounded-full border-t-transparent"></div>
                    <span>Enviando...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Feedback Enviado!</span>
                  </>
                ) : (
                  "Enviar Feedback"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeedbackSubmission;
