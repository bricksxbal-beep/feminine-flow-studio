import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { BottomNav } from '@/components/BottomNav';
import { storage } from '@/lib/storage';
import { CycleData } from '@/types/cycle';
import { Edit, Baby, Bell, Trash2, Info } from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const navigate = useNavigate();
  const [cycleData, setCycleData] = useState<CycleData | null>(null);
  const [isPregnant, setIsPregnant] = useState(false);

  useEffect(() => {
    const data = storage.getCycleData();
    if (data) {
      setCycleData(data);
      setIsPregnant(data.isPregnant || false);
    }
  }, []);

  const handlePregnancyToggle = (checked: boolean) => {
    if (!cycleData) return;

    const updatedData: CycleData = {
      ...cycleData,
      isPregnant: checked,
      pregnancyStartDate: checked ? new Date().toISOString() : undefined,
    };

    storage.saveCycleData(updatedData);
    setCycleData(updatedData);
    setIsPregnant(checked);
    toast.success(checked ? 'Modo gravidez ativado! 🎉' : 'Modo gravidez desativado');
  };

  const handleClearData = () => {
    if (confirm('Tem certeza que deseja apagar todos os dados?')) {
      localStorage.clear();
      toast.success('Dados apagados com sucesso');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft pb-24">
      <div className="max-w-md mx-auto px-6 py-8 space-y-6">
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Configurações
          </h1>
          <p className="text-muted-foreground">
            Personalize seu aplicativo
          </p>
        </div>

        <Card className="p-6 shadow-card border-border animate-slide-up space-y-4">
          <h3 className="font-semibold text-foreground mb-4">Dados do Ciclo</h3>
          
          <button
            onClick={() => navigate('/cycle-input')}
            className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-accent transition-colors"
          >
            <div className="flex items-center gap-3">
              <Edit className="w-5 h-5 text-primary" />
              <span className="text-foreground">Editar Dados do Ciclo</span>
            </div>
            <span className="text-muted-foreground">→</span>
          </button>

          <div className="flex items-center justify-between p-4 rounded-lg bg-accent">
            <div className="flex items-center gap-3">
              <Baby className="w-5 h-5 text-primary" />
              <div>
                <p className="text-foreground font-medium">Modo Gravidez</p>
                <p className="text-xs text-muted-foreground">Acompanhe sua gestação</p>
              </div>
            </div>
            <Switch
              checked={isPregnant}
              onCheckedChange={handlePregnancyToggle}
            />
          </div>
        </Card>

        <Card className="p-6 shadow-card border-border space-y-4">
          <h3 className="font-semibold text-foreground mb-4">Notificações</h3>
          
          <div className="flex items-center justify-between p-4 rounded-lg bg-accent">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <p className="text-foreground font-medium">Lembrete de Período</p>
                <p className="text-xs text-muted-foreground">Notificar 2 dias antes</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-accent">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <p className="text-foreground font-medium">Janela Fértil</p>
                <p className="text-xs text-muted-foreground">Notificar dias férteis</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </Card>

        <Card className="p-6 shadow-card border-border space-y-4">
          <h3 className="font-semibold text-foreground mb-4">Sobre</h3>
          
          <div className="flex items-center gap-3 p-4 rounded-lg bg-accent">
            <Info className="w-5 h-5 text-primary" />
            <div>
              <p className="text-foreground font-medium">BloomPink</p>
              <p className="text-xs text-muted-foreground">Versão 1.0.0</p>
            </div>
          </div>
        </Card>

        <Button
          onClick={handleClearData}
          variant="destructive"
          className="w-full rounded-full h-12"
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
