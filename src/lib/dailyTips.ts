import { CyclePhase } from './phaseCalculations';

export interface DailyTip {
  title: string;
  short: string;
  full: string;
  emoji: string;
}

const tips: Record<string, Record<CyclePhase, DailyTip[]>> = {
  pt: {
    menstrual: [
      { title: 'Reponha o ferro', short: 'Consuma alimentos ricos em ferro como espinafre e lentilhas.', full: 'Durante a menstruação, você perde ferro. Invista em folhas escuras, leguminosas, carne vermelha magra e vitamina C para ajudar na absorção. Seu corpo agradece!', emoji: '🥬' },
      { title: 'Hidrate-se', short: 'Beba mais água para reduzir inchaço e fadiga.', full: 'A desidratação piora cólicas e cansaço. Tente beber pelo menos 2L de água por dia. Chás de camomila e gengibre também ajudam muito nessa fase.', emoji: '💧' },
      { title: 'Descanse bem', short: 'Priorize o descanso — seu corpo está trabalhando.', full: 'A progesterona cai, causando fadiga. Durma 7-9h, tire cochilos curtos se possível e não se cobre demais. Essa fase pede gentileza consigo mesma.', emoji: '😴' },
      { title: 'Calor local', short: 'Use bolsa de água quente para aliviar cólicas.', full: 'O calor relaxa os músculos uterinos e melhora a circulação local. Uma bolsa térmica na barriga por 15-20 minutos pode substituir um analgésico leve.', emoji: '🔥' },
      { title: 'Caminhe leve', short: 'Uma caminhada suave pode aliviar a dor.', full: 'Exercícios leves liberam endorfinas, que são analgésicos naturais. Não precisa de academia — 15-20 min de caminhada ao ar livre já faz diferença.', emoji: '🚶‍♀️' },
    ],
    follicular: [
      { title: 'Energia em alta!', short: 'Aproveite a energia crescente para novos projetos.', full: 'O estrogênio sobe após a menstruação, trazendo mais disposição, clareza mental e criatividade. É o melhor momento para iniciar coisas novas!', emoji: '⚡' },
      { title: 'Treine moderado', short: 'Seu corpo responde melhor a exercícios nessa fase.', full: 'Com o estrogênio subindo, seus músculos se recuperam mais rápido. Aproveite para treinar com mais intensidade — musculação, corrida ou dança!', emoji: '💪' },
      { title: 'Planeje e organize', short: 'Foco mental está no auge — planeje sua semana.', full: 'A fase folicular traz clareza e motivação. Use esse período para planejar metas, organizar tarefas importantes e tomar decisões estratégicas.', emoji: '📋' },
      { title: 'Alimente a criatividade', short: 'Estrogênio favorece a criatividade e aprendizado.', full: 'Estudos mostram que a memória e capacidade de aprendizado melhoram nesta fase. Explore hobbies, aprenda algo novo ou resolva problemas criativos.', emoji: '🎨' },
    ],
    ovulation: [
      { title: 'Brilhe socialmente', short: 'Sua energia social está no máximo!', full: 'O pico de estrogênio te deixa mais comunicativa, confiante e carismática. Marque encontros, apresentações e conversas importantes para agora.', emoji: '✨' },
      { title: 'Autoestima elevada', short: 'Você está radiante — aproveite esse glow natural!', full: 'A pele fica mais luminosa, a postura mais confiante. É o momento de se sentir bem consigo mesma. Vista algo que te faça sentir poderosa!', emoji: '💃' },
      { title: 'Fertilidade alta', short: 'Dias mais férteis do ciclo — esteja atenta.', full: 'Se deseja engravidar, este é o momento. Se não, reforce a contracepção. A janela fértil dura cerca de 6 dias, com pico na ovulação.', emoji: '🌟' },
      { title: 'Comunicação plena', short: 'Conversas fluem melhor agora.', full: 'O estrogênio no pico melhora a comunicação verbal. Ideal para negociações, apresentações, resolver conflitos ou ter conversas importantes.', emoji: '💬' },
    ],
    luteal: [
      { title: 'Autocuidado é prioridade', short: 'Desacelere e cuide de você.', full: 'A progesterona sobe e o corpo pede calma. Banhos quentes, skincare, leitura e atividades relaxantes ajudam a equilibrar o humor.', emoji: '🧖‍♀️' },
      { title: 'Reduza cafeína', short: 'Menos café = menos ansiedade nessa fase.', full: 'A cafeína pode intensificar a ansiedade e irritabilidade pré-menstrual. Troque por chás calmantes como camomila, lavanda ou erva-cidreira.', emoji: '☕' },
      { title: 'Priorize o sono', short: 'A progesterona causa sonolência — respeite isso.', full: 'A progesterona é sedativa natural. Durma mais cedo, evite telas antes de dormir e crie um ritual de relaxamento noturno.', emoji: '🌙' },
      { title: 'Cuidado com sal e açúcar', short: 'Evite excessos para reduzir inchaço e TPM.', full: 'O excesso de sódio aumenta a retenção de líquidos e o açúcar pode piorar oscilações de humor. Prefira alimentos naturais e integrais.', emoji: '🍎' },
      { title: 'Magnésio ajuda', short: 'Magnésio reduz cólicas e melhora o humor.', full: 'Alimentos ricos em magnésio (chocolate amargo, banana, castanhas) ajudam a reduzir TPM, cólicas e irritabilidade. Considere também suplementação.', emoji: '🍫' },
    ],
  },
  en: {
    menstrual: [
      { title: 'Replenish iron', short: 'Eat iron-rich foods like spinach and lentils.', full: 'During menstruation you lose iron. Invest in dark leafy greens, legumes, lean red meat and vitamin C to help absorption.', emoji: '🥬' },
      { title: 'Stay hydrated', short: 'Drink more water to reduce bloating and fatigue.', full: 'Dehydration worsens cramps and tiredness. Try drinking at least 2L of water daily. Chamomile and ginger teas also help a lot during this phase.', emoji: '💧' },
      { title: 'Rest well', short: 'Prioritize rest — your body is working hard.', full: 'Progesterone drops cause fatigue. Sleep 7-9 hours, take short naps if possible. This phase calls for gentleness with yourself.', emoji: '😴' },
      { title: 'Apply warmth', short: 'Use a hot water bottle to relieve cramps.', full: 'Heat relaxes uterine muscles and improves local circulation. A heating pad on your belly for 15-20 min can replace mild painkillers.', emoji: '🔥' },
      { title: 'Walk gently', short: 'A gentle walk can ease the pain.', full: 'Light exercise releases endorphins — natural painkillers. 15-20 min of outdoor walking already makes a difference.', emoji: '🚶‍♀️' },
    ],
    follicular: [
      { title: 'Energy is rising!', short: 'Take advantage of growing energy for new projects.', full: 'Estrogen rises after menstruation, bringing more energy, mental clarity and creativity. Best time to start new things!', emoji: '⚡' },
      { title: 'Train harder', short: 'Your body responds better to exercise now.', full: 'With rising estrogen, your muscles recover faster. Take advantage for more intense workouts — weights, running or dancing!', emoji: '💪' },
      { title: 'Plan and organize', short: 'Mental focus is at its peak — plan your week.', full: 'The follicular phase brings clarity and motivation. Use this period to plan goals and make strategic decisions.', emoji: '📋' },
      { title: 'Feed creativity', short: 'Estrogen boosts creativity and learning.', full: 'Studies show memory and learning improve in this phase. Explore hobbies, learn something new or solve creative problems.', emoji: '🎨' },
    ],
    ovulation: [
      { title: 'Shine socially', short: 'Your social energy is at its maximum!', full: 'Peak estrogen makes you more communicative, confident and charismatic. Schedule meetings and important conversations now.', emoji: '✨' },
      { title: 'High self-esteem', short: 'You are radiant — enjoy this natural glow!', full: 'Your skin glows, your posture is more confident. Wear something that makes you feel powerful!', emoji: '💃' },
      { title: 'High fertility', short: 'Most fertile days of the cycle — be aware.', full: 'If trying to conceive, this is the moment. If not, reinforce contraception. The fertile window lasts about 6 days.', emoji: '🌟' },
      { title: 'Full communication', short: 'Conversations flow better now.', full: 'Peak estrogen improves verbal communication. Ideal for negotiations, presentations and important conversations.', emoji: '💬' },
    ],
    luteal: [
      { title: 'Self-care is priority', short: 'Slow down and take care of yourself.', full: 'Progesterone rises and your body asks for calm. Hot baths, skincare, reading and relaxing activities help balance mood.', emoji: '🧖‍♀️' },
      { title: 'Reduce caffeine', short: 'Less coffee = less anxiety in this phase.', full: 'Caffeine can intensify pre-menstrual anxiety and irritability. Switch to calming teas like chamomile or lavender.', emoji: '☕' },
      { title: 'Prioritize sleep', short: 'Progesterone causes drowsiness — respect it.', full: 'Progesterone is a natural sedative. Sleep earlier, avoid screens before bed and create a nightly relaxation ritual.', emoji: '🌙' },
      { title: 'Watch salt and sugar', short: 'Avoid excess to reduce bloating and PMS.', full: 'Excess sodium increases fluid retention and sugar can worsen mood swings. Prefer natural and whole foods.', emoji: '🍎' },
      { title: 'Magnesium helps', short: 'Magnesium reduces cramps and improves mood.', full: 'Magnesium-rich foods (dark chocolate, banana, nuts) help reduce PMS, cramps and irritability.', emoji: '🍫' },
    ],
  },
  es: {
    menstrual: [
      { title: 'Repón el hierro', short: 'Consume alimentos ricos en hierro como espinacas y lentejas.', full: 'Durante la menstruación pierdes hierro. Invierte en hojas verdes, legumbres y vitamina C para ayudar en la absorción.', emoji: '🥬' },
      { title: 'Hidrátate', short: 'Bebe más agua para reducir la hinchazón y la fatiga.', full: 'La deshidratación empeora los cólicos y el cansancio. Intenta beber al menos 2L de agua al día.', emoji: '💧' },
      { title: 'Descansa bien', short: 'Prioriza el descanso — tu cuerpo está trabajando.', full: 'La progesterona baja causa fatiga. Duerme 7-9 horas. Esta fase pide gentileza contigo misma.', emoji: '😴' },
      { title: 'Calor local', short: 'Usa una bolsa de agua caliente para aliviar los cólicos.', full: 'El calor relaja los músculos uterinos. Una almohadilla térmica en el vientre por 15-20 min puede sustituir un analgésico leve.', emoji: '🔥' },
      { title: 'Camina suave', short: 'Una caminata suave puede aliviar el dolor.', full: 'El ejercicio ligero libera endorfinas. 15-20 min de caminata al aire libre ya hace la diferencia.', emoji: '🚶‍♀️' },
    ],
    follicular: [
      { title: '¡Energía en alta!', short: 'Aprovecha la energía creciente para nuevos proyectos.', full: 'El estrógeno sube tras la menstruación, trayendo más disposición y creatividad. ¡Mejor momento para iniciar cosas nuevas!', emoji: '⚡' },
      { title: 'Entrena moderado', short: 'Tu cuerpo responde mejor al ejercicio en esta fase.', full: 'Con el estrógeno subiendo, tus músculos se recuperan más rápido. ¡Aprovecha para entrenar con más intensidad!', emoji: '💪' },
      { title: 'Planifica y organiza', short: 'El enfoque mental está en su mejor momento.', full: 'La fase folicular trae claridad y motivación. Usa este período para planificar metas y tomar decisiones estratégicas.', emoji: '📋' },
      { title: 'Alimenta la creatividad', short: 'El estrógeno favorece la creatividad y el aprendizaje.', full: 'Estudios muestran que la memoria y capacidad de aprendizaje mejoran en esta fase. Explora hobbies y aprende algo nuevo.', emoji: '🎨' },
    ],
    ovulation: [
      { title: 'Brilla socialmente', short: '¡Tu energía social está al máximo!', full: 'El pico de estrógeno te hace más comunicativa y carismática. Agenda encuentros y conversaciones importantes ahora.', emoji: '✨' },
      { title: 'Autoestima elevada', short: '¡Estás radiante — disfruta ese glow natural!', full: 'La piel brilla más, la postura es más segura. ¡Viste algo que te haga sentir poderosa!', emoji: '💃' },
      { title: 'Fertilidad alta', short: 'Días más fértiles del ciclo — estate atenta.', full: 'Si deseas embarazarte, este es el momento. Si no, refuerza la anticoncepción.', emoji: '🌟' },
      { title: 'Comunicación plena', short: 'Las conversaciones fluyen mejor ahora.', full: 'El estrógeno en su pico mejora la comunicación verbal. Ideal para negociaciones y conversaciones importantes.', emoji: '💬' },
    ],
    luteal: [
      { title: 'Autocuidado es prioridad', short: 'Desacelera y cuídate.', full: 'La progesterona sube y el cuerpo pide calma. Baños calientes, skincare y actividades relajantes ayudan a equilibrar el humor.', emoji: '🧖‍♀️' },
      { title: 'Reduce la cafeína', short: 'Menos café = menos ansiedad en esta fase.', full: 'La cafeína puede intensificar la ansiedad premenstrual. Cámbiala por tés calmantes como manzanilla o lavanda.', emoji: '☕' },
      { title: 'Prioriza el sueño', short: 'La progesterona causa somnolencia — respétalo.', full: 'La progesterona es sedante natural. Duerme más temprano y crea un ritual de relajación nocturno.', emoji: '🌙' },
      { title: 'Cuidado con sal y azúcar', short: 'Evita excesos para reducir hinchazón y SPM.', full: 'El exceso de sodio aumenta la retención de líquidos y el azúcar puede empeorar los cambios de humor.', emoji: '🍎' },
      { title: 'El magnesio ayuda', short: 'El magnesio reduce cólicos y mejora el humor.', full: 'Alimentos ricos en magnesio (chocolate oscuro, plátano, nueces) ayudan a reducir el SPM y la irritabilidad.', emoji: '🍫' },
    ],
  },
};

export const getDailyTip = (phase: CyclePhase, lang: string): DailyTip => {
  const l = (lang in tips ? lang : 'en') as keyof typeof tips;
  const phaseTips = tips[l][phase];
  // Rotate based on day of year
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return phaseTips[dayOfYear % phaseTips.length];
};

export const getAllTipsForPhase = (phase: CyclePhase, lang: string): DailyTip[] => {
  const l = (lang in tips ? lang : 'en') as keyof typeof tips;
  return tips[l][phase];
};
