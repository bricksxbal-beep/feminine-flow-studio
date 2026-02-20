import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { BottomNav } from '@/components/BottomNav';
import { storage } from '@/lib/storage';
import { CycleData } from '@/types/cycle';
import { Edit, Bell, Trash2, Info, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import bgSettings from '@/assets/bg-settings.jpg';

const Settings = () => {
  const navigate = useNavigate();
  const [cycleData, setCycleData] = useState<CycleData | null>(null);

  useEffect(() => {
    const data = storage.getCycleData();
    if (data) {
      setCycleData(data);
    }
  }, []);

  const handleClearData = () => {
    if (confirm('Tem certeza que deseja apagar todos os dados?')) {
      localStorage.clear();
      toast.success('Dados apagados com sucesso');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <img src={bgSettings} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/50" />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-6 py-8 space-y-6">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">Personalização</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Configurações ⚙️
          </h1>
          <p className="text-muted-foreground">
            Personalize seu aplicativo
          </p>
        </div>

        <Card className="p-6 shadow-card border-0 bg-card/80 backdrop-blur-md animate-slide-up space-y-4">
          <h3 className="font-semibold text-foreground mb-4">Dados do Ciclo</h3>
          
          <button
            onClick={() => navigate('/cycle-input')}
            className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-accent/50 transition-all hover:scale-[1.01]"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-pink flex items-center justify-center shadow-soft">
                <Edit className="w-5 h-5 text-white" />
              </div>
              <span className="text-foreground font-medium">Editar Dados do Ciclo</span>
            </div>
            <span className="text-muted-foreground text-lg">→</span>
          </button>
        </Card>

        <Card className="p-6 shadow-card border-0 bg-card/80 backdrop-blur-md space-y-4">
          <h3 className="font-semibold text-foreground mb-4">🔔 Notificações</h3>
          
          <div className="flex items-center justify-between p-4 rounded-2xl bg-accent/30 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-medium">Lembrete de Período</p>
                <p className="text-xs text-muted-foreground">Notificar 2 dias antes</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-accent/30 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-medium">Janela Fértil</p>
                <p className="text-xs text-muted-foreground">Notificar dias férteis</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </Card>

        <Card className="p-6 shadow-card border-0 bg-card/80 backdrop-blur-md space-y-4">
          <h3 className="font-semibold text-foreground mb-4">Sobre</h3>
          
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-accent/30 backdrop-blur-sm">
            <div className="w-11 h-11 rounded-2xl bg-gradient-pink flex items-center justify-center shadow-soft">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-foreground font-medium">BloomPink 🌸</p>
              <p className="text-xs text-muted-foreground">Versão 1.0.0 • Feito com 💕</p>
            </div>
          </div>
        </Card>

        <Button
          onClick={handleClearData}
          variant="destructive"
          className="w-full rounded-full h-12 shadow-soft"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Apagar Todos os Dados
        </Button>
      </div>
      <BottomNav />
    </div>
  );
};

export default Settings;
