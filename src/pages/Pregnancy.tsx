import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/BottomNav';
import { storage } from '@/lib/storage';
import { CycleData } from '@/types/cycle';
import { getPregnancyWeek, calculateDueDate, formatDate } from '@/lib/cycleCalculations';
import { Baby, Calendar, Heart, ArrowLeft } from 'lucide-react';
import { differenceInDays } from 'date-fns';

const Pregnancy = () => {
  const navigate = useNavigate();
  const [cycleData, setCycleData] = useState<CycleData | null>(null);

  useEffect(() => {
    const data = storage.getCycleData();
    if (!data || !data.isPregnant || !data.pregnancyStartDate) {
      navigate('/dashboard');
    } else {
      setCycleData(data);
    }
  }, [navigate]);

  if (!cycleData || !cycleData.pregnancyStartDate) return null;

  const pregnancyWeek = getPregnancyWeek(cycleData.pregnancyStartDate);
  const dueDate = calculateDueDate(cycleData.pregnancyStartDate);
  const daysUntilDue = differenceInDays(dueDate, new Date());
  const progressPercentage = Math.min((pregnancyWeek / 40) * 100, 100);

  const weekInfo = [
    { week: 4, info: 'Seu bebê é do tamanho de uma semente de papoula' },
    { week: 8, info: 'Seu bebê é do tamanho de um feijão' },
    { week: 12, info: 'Seu bebê é do tamanho de uma ameixa' },
    { week: 16, info: 'Seu bebê é do tamanho de um abacate' },
    { week: 20, info: 'Seu bebê é do tamanho de uma banana' },
    { week: 24, info: 'Seu bebê é do tamanho de uma espiga de milho' },
    { week: 28, info: 'Seu bebê é do tamanho de um repolho' },
    { week: 32, info: 'Seu bebê é do tamanho de um coco' },
    { week: 36, info: 'Seu bebê é do tamanho de uma melancia' },
    { week: 40, info: 'Seu bebê está pronto para nascer!' },
  ];

  const currentInfo = weekInfo.reverse().find((info) => pregnancyWeek >= info.week);

  return (
    <div className="min-h-screen bg-gradient-soft pb-24">
      <div className="max-w-md mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center gap-4 animate-fade-in">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Minha Gravidez
            </h1>
            <p className="text-muted-foreground">Acompanhe cada momento</p>
          </div>
        </div>

        <Card className="p-8 shadow-card border-border bg-gradient-pink animate-slide-up">
          <div className="text-center text-white mb-6">
            <Baby className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-6xl font-bold mb-2">{pregnancyWeek}</h2>
            <p className="text-2xl font-medium">Semanas</p>
          </div>
          
          <div className="bg-white/20 rounded-full h-3 mb-4 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <p className="text-center text-white/90 text-sm">
            {Math.round(progressPercentage)}% concluído
          </p>
        </Card>

        <Card className="p-6 shadow-card border-border">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Data Provável do Parto</h3>
          </div>
          <div className="bg-accent rounded-lg p-4">
            <p className="text-2xl font-bold text-foreground mb-1">
              {formatDate(dueDate)}
            </p>
            <p className="text-muted-foreground">
              Faltam {daysUntilDue} dias para conhecer seu bebê!
            </p>
          </div>
        </Card>

        {currentInfo && (
          <Card className="p-6 shadow-card border-border">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Desenvolvimento do Bebê</h3>
            </div>
            <p className="text-foreground">{currentInfo.info}</p>
          </Card>
        )}

        <Card className="p-6 shadow-card border-border">
          <h3 className="font-semibold text-foreground mb-4">Dicas para esta Semana</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Continue tomando ácido fólico e vitaminas pré-natais</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Mantenha-se hidratada bebendo bastante água</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Pratique exercícios leves aprovados pelo seu médico</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Descanse sempre que sentir necessidade</span>
            </li>
          </ul>
        </Card>
      </div>
      <BottomNav />
    </div>
  );
};

export default Pregnancy;
