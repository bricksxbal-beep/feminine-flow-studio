import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { storage } from '@/lib/storage';
import { cn } from '@/lib/utils';
import onboarding1 from '@/assets/onboarding-1.jpg';
import onboarding2 from '@/assets/onboarding-2.jpg';
import onboardingHero from '@/assets/onboarding-hero.jpg';

const slides = [
  {
    image: onboarding1,
    title: 'Acompanhe seu Ciclo',
    description: 'Registre e monitore seu ciclo menstrual de forma simples e intuitiva',
  },
  {
    image: onboarding2,
    title: 'Preveja sua Ovulação',
    description: 'Identifique seus dias férteis e planeje sua vida com mais segurança',
  },
  {
    image: onboardingHero,
    title: 'Cuide de Você',
    description: 'Registre sintomas, humor e tenha controle total da sua saúde feminina',
  },
];

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      storage.setOnboardingCompleted();
      navigate('/cycle-input');
    }
  };

  const handleSkip = () => {
    storage.setOnboardingCompleted();
    navigate('/cycle-input');
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-md animate-fade-in">
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-soft mb-8">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {slides[currentSlide].description}
            </p>
          </div>

          <div className="flex justify-center gap-2 mb-8">
            {slides.map((_, index) => (
              <div
                key={index}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  index === currentSlide
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-border'
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 max-w-md mx-auto w-full space-y-3">
        <Button
          onClick={handleNext}
          className="w-full bg-gradient-pink hover:opacity-90 text-white rounded-full h-14 text-lg font-semibold shadow-soft"
        >
          {currentSlide === slides.length - 1 ? 'Começar' : 'Próximo'}
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>

        {currentSlide < slides.length - 1 && (
          <Button
            onClick={handleSkip}
            variant="ghost"
            className="w-full text-muted-foreground"
          >
            Pular
          </Button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
