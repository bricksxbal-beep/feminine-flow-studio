import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const TermsOfUse = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">{t('termsTitle')}</h1>
          </div>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4 text-muted-foreground text-sm leading-relaxed">
          <p className="font-semibold text-foreground">{t('termsLastUpdate')}</p>

          <section>
            <h3 className="text-foreground font-semibold text-base">{t('termsSection1Title')}</h3>
            <p>{t('termsSection1Text')}</p>
          </section>

          <section>
            <h3 className="text-foreground font-semibold text-base">{t('termsSection2Title')}</h3>
            <p>{t('termsSection2Text')}</p>
          </section>

          <section>
            <h3 className="text-foreground font-semibold text-base">{t('termsSection3Title')}</h3>
            <p>{t('termsSection3Text')}</p>
          </section>

          <section>
            <h3 className="text-foreground font-semibold text-base">{t('termsSection4Title')}</h3>
            <p>{t('termsSection4Text')}</p>
          </section>

          <section>
            <h3 className="text-foreground font-semibold text-base">{t('termsSection5Title')}</h3>
            <p>{t('termsSection5Text')}</p>
          </section>

          <section>
            <h3 className="text-foreground font-semibold text-base">{t('termsSection6Title')}</h3>
            <p>{t('termsSection6Text')}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
