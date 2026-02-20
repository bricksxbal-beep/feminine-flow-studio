import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Calendar, Droplets, Clock } from 'lucide-react';
import { storage } from '@/lib/storage';
import { toast } from 'sonner';
import { useLanguage } from '@/i18n/LanguageContext';
import bgCalendar from '@/assets/bg-calendar.jpg';

const CycleInput = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const existingData = storage.getCycleData();

  const [formData, setFormData] = useState({
    lastPeriodDate: existingData?.lastPeriodDate || new Date().toISOString().split('T')[0],
    cycleLength: existingData?.cycleLength || 28,
    periodLength: existingData?.periodLength || 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.lastPeriodDate) {
      toast.error(t('cycleInputDateError'));
      return;
    }
    storage.saveCycleData(formData);
    toast.success(t('cycleInputSuccess'));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen pb-20 relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <img src={bgCalendar} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/50" />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-6 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('cycleInputTitle')}</h1>
          <p className="text-muted-foreground">{t('cycleInputSubtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
          <Card className="p-6 shadow-card border-0 bg-card/85 backdrop-blur-md">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="lastPeriod" className="flex items-center gap-2 text-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  {t('cycleInputLastPeriod')}
                </Label>
                <Input
                  id="lastPeriod"
                  type="date"
                  value={formData.lastPeriodDate}
                  onChange={(e) => setFormData({ ...formData, lastPeriodDate: e.target.value })}
                  className="border-0 bg-muted/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cycleLength" className="flex items-center gap-2 text-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  {t('cycleInputCycleLength')}
                </Label>
                <Input
                  id="cycleLength"
                  type="number"
                  min="21"
                  max="45"
                  value={formData.cycleLength}
                  onChange={(e) => setFormData({ ...formData, cycleLength: parseInt(e.target.value) })}
                  className="border-0 bg-muted/50"
                  required
                />
                <p className="text-xs text-muted-foreground">{t('cycleInputCycleLengthAvg')}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="periodLength" className="flex items-center gap-2 text-foreground">
                  <Droplets className="w-4 h-4 text-primary" />
                  {t('cycleInputPeriodLength')}
                </Label>
                <Input
                  id="periodLength"
                  type="number"
                  min="2"
                  max="10"
                  value={formData.periodLength}
                  onChange={(e) => setFormData({ ...formData, periodLength: parseInt(e.target.value) })}
                  className="border-0 bg-muted/50"
                  required
                />
                <p className="text-xs text-muted-foreground">{t('cycleInputPeriodLengthAvg')}</p>
              </div>
            </div>
          </Card>

          <Button
            type="submit"
            className="w-full bg-gradient-pink hover:opacity-90 text-white rounded-full h-14 text-lg font-semibold shadow-soft"
          >
            {t('cycleInputSave')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CycleInput;
