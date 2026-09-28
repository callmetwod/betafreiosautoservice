import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Accessibility,
  ArrowRight,
  Award,
  BadgeCheck,
  Building2,
  Calendar,
  Car,
  Check,
  ChevronRight,
  Clock3,
  Disc3,
  ExternalLink,
  Gauge,
  HeartHandshake,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Thermometer,
  Trophy,
  Wrench,
  X,
  Zap,
} from 'lucide-react';

const whatsappNumber = '5511999999999';
const routeUrl = 'https://www.google.com/maps/search/?api=1&query=Beta%20Freios&query_place_id=ChIJlX23Cd9QzpQRsdBT87anszI';
const funilariaUrl = 'https://example.com/funilaria';
const heroVideoUrl = 'https://www.image2url.com/r2/default/videos/1790591868778-82fd1dd7-0e94-47fc-a10f-a25a7e0022d4.mp4';
const heroVideoPoster = 'https://images.pexels.com/videos/14514790/pexels-photo-14514790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

const serviceImages = {
  brakes: 'https://images.pexels.com/photos/6870299/pexels-photo-6870299.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  suspension: 'https://images.pexels.com/photos/37175105/pexels-photo-37175105.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  alignment: 'https://images.pexels.com/photos/38324578/pexels-photo-38324578.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  diagnostics: 'https://images.pexels.com/photos/12271950/pexels-photo-12271950.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  air: 'https://images.pexels.com/photos/7540410/pexels-photo-7540410.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  oil: 'https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

const workshopPhotos = [
  { url: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Mecânico verificando motor de carro na oficina' },
  { url: 'https://images.pexels.com/photos/8986132/pexels-photo-8986132.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Carro elevado para manutenção na oficina' },
  { url: 'https://images.pexels.com/photos/4489776/pexels-photo-4489776.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Dois mecânicos trabalhando na reparação do veículo' },
  { url: 'https://images.pexels.com/photos/5276374/pexels-photo-5276374.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Mecânico trabalhando sob carro elevado' },
  { url: 'https://images.pexels.com/photos/8985451/pexels-photo-8985451.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Mecânico em macacão azul trabalhando no motor' },
  { url: 'https://images.pexels.com/photos/8986148/pexels-photo-8986148.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Carro elevado para inspeção na oficina' },
];

const funilariaImage = 'https://images.pexels.com/photos/14615263/pexels-photo-14615263.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const services = [
  { title: 'Sistema de Freios', detail: 'Discos, pastilhas e fluído', image: serviceImages.brakes, icon: Disc3, cta: 'Cotar reparo de freios' },
  { title: 'Suspensão e Pneus', detail: 'Amortecedores e estabilidade', image: serviceImages.suspension, icon: Gauge, cta: 'Cotar suspensão e pneus' },
  { title: 'Alinhamento 3D', detail: 'Precisão para rodar melhor', image: serviceImages.alignment, icon: Navigation, cta: 'Agendar alinhamento 3D' },
  { title: 'Injeção Eletrônica', detail: 'Diagnóstico e mecânica geral', image: serviceImages.diagnostics, icon: Zap, cta: 'Solicitar diagnóstico' },
  { title: 'Ar Condicionado', detail: 'Higienização interna completa', image: serviceImages.air, icon: Thermometer, cta: 'Agendar higienização' },
  { title: 'Troca de Óleo', detail: 'Óleo sintético e filtros', image: serviceImages.oil, icon: Wrench, cta: 'Cotar troca de óleo' },
];

const reviews = [
  { name: 'Carlos Eduardo', initials: 'CE', text: 'Atendimento rápido e honesto. Fizeram uma revisão geral que encontrou detalhes que eu nem imaginava. Recomendo muito.', date: 'há 2 semanas' },
  { name: 'Mariana Alves', initials: 'MA', text: 'Levei para trocar as pastilhas e verificaram tudo: lâmpadas, palhetas e pneus. Serviço cuidadoso e preço justo.', date: 'há 1 mês' },
  { name: 'Rafael Martins', initials: 'RM', text: 'Excelente para quem precisa de agilidade na frota. O carro entrou e saiu no mesmo dia, com tudo explicado.', date: 'há 2 meses' },
];

const navItems = ['Diferenciais', 'Parceiros', 'Serviços', 'Oficina', 'Frotas', 'Avaliações', 'Localização'];

const reveal = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } } };
const viewport = { once: true, amount: 0.18 };

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 35 }}
      animate={{ opacity: 1, x: 0, transition: { delay: .25, duration: .7 } }}
      className="hero-video-wrap"
    >
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        loop
        playsInline
        preload="metadata"
        poster={heroVideoPoster}
        aria-label="Mecânico reparando motor em oficina"
      >
        <source src={heroVideoUrl} type="video/mp4" />
      </video>
      {/* <div className="hero-video-badge">
        <span className="flex h-2 w-2 rounded-full bg-red-500" />
        Em funcionamento
      </div> */}
    </motion.div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState('Freios');
  const [vehicle, setVehicle] = useState('');
  const [isFleet, setIsFleet] = useState('Pessoal');

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Olá, Beta Freios! Gostaria de solicitar um orçamento para ${service}.`)}`;

  function handleQuote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Olá, Beta Freios! Quero um orçamento. Serviço: ${service}. Veículo: ${vehicle || 'A informar'}. Tipo: ${isFleet}.`)}`, '_blank', 'noopener,noreferrer');
  }

  const slug = (item: string) => item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <div className="topline"><div className="shell flex items-center justify-center gap-2 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90"><Star size={13} fill="currentColor" /> Nota 4.8 no Google <span className="hidden text-white/50 sm:inline">•</span><span className="hidden sm:inline">81 avaliações</span><span className="hidden md:inline">• 20 anos de experiência</span></div></div>
      <header className="absolute inset-x-0 top-8 z-30"><div className="shell flex items-center justify-between py-5"><a href="#inicio" className="flex items-center gap-3"><img src="/image.png" alt="Beta Freios Auto Service" className="logo-ring h-12 w-12 rounded-full object-cover" /><span className="text-sm font-extrabold uppercase leading-tight tracking-[0.12em] text-white">Beta Freios<br /><span className="font-medium tracking-[0.28em] text-blue-200">Auto Service</span></span></a><nav className="hidden items-center gap-6 xl:flex">{navItems.map((item) => <a className="nav-link" href={`#${slug(item)}`} key={item}>{item}</a>)}</nav><a href={whatsappLink} target="_blank" rel="noreferrer" className="button button-blue hidden lg:inline-flex"><MessageCircle size={17} /> Orçamento no WhatsApp</a><button className="text-white lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X /> : <Menu />}</button></div>{menuOpen && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mx-4 rounded-2xl border border-white/15 bg-navy/95 p-4 shadow-2xl lg:hidden">{navItems.map((item) => <a onClick={() => setMenuOpen(false)} className="block border-b border-white/10 px-3 py-3 text-sm font-semibold text-white last:border-0" href={`#${slug(item)}`} key={item}>{item}</a>)}</motion.div>}</header>

      <main>
        <section id="inicio" className="hero relative flex min-h-[760px] items-end pb-20 pt-44 text-white sm:min-h-[820px] sm:pb-24"><div className="hero-grid absolute inset-0" /><div className="hero-glow absolute inset-0" /><div className="shell relative z-10 grid items-end gap-14 lg:grid-cols-[1.1fr_.9fr]"><motion.div initial="hidden" animate="visible" variants={reveal}><div className="eyebrow mb-6"><span className="eyebrow-dot" /> 20 anos cuidando do seu carro</div><h1 className="max-w-4xl text-5xl font-black leading-[.98] tracking-[-0.045em] sm:text-7xl">Seu carro em boas mãos. <span className="text-blue-400">Sem surpresas.</span></h1><p className="mt-7 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">Especialistas em freios, suspensão e mecânica geral com transparência total na Chácara Santo Antônio.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href={whatsappLink} target="_blank" rel="noreferrer" className="button button-blue"><MessageCircle size={18} /> Agendar revisão pelo WhatsApp</a><a href="#servicos" className="button button-ghost">Conhecer nossos serviços <ArrowRight size={17} /></a></div><div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-300"><span className="flex items-center gap-2"><Check size={15} className="text-blue-400" /> Check-up completo</span><span className="flex items-center gap-2"><Check size={15} className="text-blue-400" /> Alinhamento 3D</span><span className="flex items-center gap-2"><Check size={15} className="text-blue-400" /> 100% acessível</span></div></motion.div><HeroVideo /></div></section>

        <section id="diferenciais" className="section-pad bg-white"><div className="shell grid items-center gap-12 lg:grid-cols-[.82fr_1.18fr]"><motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={reveal}><div className="section-kicker">O nosso jeito de trabalhar</div><h2 className="section-title">Atenção impecável aos detalhes.</h2><p className="mt-6 text-base leading-7 text-slate-600">Aqui, uma revisão nunca é só uma revisão. A gente olha o carro por inteiro, explica o que encontrou e indica apenas o que realmente precisa ser feito.</p><a href="#orcamento" className="button button-dark mt-8">Solicitar checklist completo <ArrowRight size={17} /></a></motion.div><div className="grid gap-4 sm:grid-cols-3">{[{ icon: ShieldCheck, title: 'Transparência', text: 'Você entende cada etapa antes de aprovar.' }, { icon: HeartHandshake, title: 'Cuidado real', text: 'Seu carro tratado como se fosse nosso.' }, { icon: Sparkles, title: 'Minúcia', text: 'Do freio à lâmpada, nada passa batido.' }].map(({ icon: Icon, title, text }, index) => <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={{ ...reveal, visible: { ...reveal.visible, transition: { delay: index * .1, duration: .65 } } }} className="soft-card" key={title}><Icon className="text-blue-600" size={27} /><h3 className="mt-7 font-extrabold text-navy">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></motion.div>)}</div></div></section>

        <section id="parceiros" className="section-pad bg-gradient-to-b from-slate-50 to-white"><div className="shell"><motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={reveal} className="mx-auto max-w-3xl text-center"><div className="section-kicker justify-center">Reconhecimento que fala por nós</div><h2 className="section-title">Parceiro Prioridade Máxima — Rede Premium Edenred Ticket Log.</h2><p className="mt-6 text-base leading-7 text-slate-600">Há 15 anos credenciados com distinção máxima da Edenred Ticket Log. Esse selo é reservado a estabelecimentos que se destacam pela excelência no atendimento, agilidade nas transações e forte parceria na rede.</p></motion.div><motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={{ ...reveal, visible: { ...reveal.visible, transition: { delay: .15, duration: .7 } } }} className="parceiro-panel mx-auto mt-10 max-w-3xl"><div className="grid items-center gap-8 sm:grid-cols-[auto_1fr]"><div className="parceiro-badge"><Trophy size={32} className="text-amber-500" /><span className="mt-2 block text-[10px] font-black uppercase tracking-[.14em] text-amber-600">Rede Premium</span><span className="mt-1 block text-[11px] font-bold text-slate-500">Edenred Ticket Log</span></div><div className="space-y-4"><div className="flex items-center gap-3 text-sm font-bold text-navy"><Award className="text-blue-600" size={20} /> Parceiro Prioridade Máxima há 15 anos</div><div className="flex items-center gap-3 text-sm font-bold text-navy"><Calendar className="text-blue-600" size={20} /> 20 anos no ramo automotivo</div><div className="flex items-center gap-3 text-sm font-bold text-navy"><ShieldCheck className="text-blue-600" size={20} /> Excelência comprovada em atendimento</div></div></div></motion.div></div></section>

        <section id="servicos" className="section-pad bg-slate-50"><div className="shell"><motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={reveal} className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><div className="section-kicker">Serviços especializados</div><h2 className="section-title max-w-xl">Tudo o que seu carro precisa, em um só lugar.</h2></div><p className="max-w-xs text-sm leading-6 text-slate-500">Equipamentos certos, diagnóstico claro e um time que gosta de fazer bem-feito.</p></motion.div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services.map(({ title, detail, image, icon: Icon, cta }, index) => <motion.article initial="hidden" whileInView="visible" viewport={viewport} variants={{ ...reveal, visible: { ...reveal.visible, transition: { delay: (index % 3) * .08, duration: .6 } } }} whileHover={{ y: -7 }} className="service-card group" key={title}><div className="relative h-52 overflow-hidden"><img src={image} alt={title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" /><div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-700 shadow-lg"><Icon size={20} /></div></div><div className="p-5"><h3 className="text-lg font-extrabold text-navy">{title}</h3><p className="mt-1 text-sm text-slate-500">{detail}</p><a href={whatsappLink} target="_blank" rel="noreferrer" className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-extrabold uppercase tracking-[.1em] text-blue-700">{cta}<ArrowRight size={16} className="transition group-hover:translate-x-1" /></a></div></motion.article>)}</div><div className="mt-10 text-center"><a href="#orcamento" className="button button-blue">Solicitar orçamento de qualquer serviço <ArrowRight size={17} /></a></div></div></section>

        <section id="oficina" className="section-pad bg-white"><div className="shell"><motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={reveal} className="mb-12 text-center"><div className="section-kicker justify-center">Nossa casa</div><h2 className="section-title">A oficina por dentro.</h2><p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">Equipamentos de ponta, espaço organizado e uma equipe que trata cada carro com atenção de quem entende do assunto.</p></motion.div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{workshopPhotos.map((photo, index) => <motion.div key={photo.url} initial="hidden" whileInView="visible" viewport={viewport} variants={{ ...reveal, visible: { ...reveal.visible, transition: { delay: (index % 3) * .08, duration: .6 } } }} whileHover={{ y: -5 }} className="workshop-photo group"><img src={photo.url} alt={photo.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="workshop-overlay" /></motion.div>)}</div></div></section>

        <section id="funilaria" className="section-pad bg-navy text-white"><div className="shell grid items-center gap-10 lg:grid-cols-[1.2fr_.8fr]"><motion.div initial={{ opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewport} className="funilaria-img-wrap order-2 lg:order-1"><img src={funilariaImage} alt="Funilaria e pintura de carro" loading="lazy" className="h-full w-full object-cover" /></motion.div><motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={reveal} className="order-1 lg:order-2"><div className="section-kicker text-blue-300">Mais um serviço para você</div><h2 className="section-title text-white">Funilaria e Pintura.</h2><p className="mt-5 max-w-lg text-base leading-7 text-slate-300">Sua carroceria também merece cuidado. Contamos com estrutura de funilaria e pintura para deixar seu carro com aquele acabamento de fábrica.</p><a href={funilariaUrl} target="_blank" rel="noreferrer" className="button button-blue mt-8">Visitar site da funilaria <ExternalLink size={17} /></a></motion.div></div></section>

        <section id="frotas" className="section-pad bg-slate-50"><div className="shell grid items-center gap-10 lg:grid-cols-[1fr_.8fr]"><motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={reveal}><div className="section-kicker">Para quem não pode parar</div><h2 className="section-title">Sua frota rodando. Seu negócio avançando.</h2><p className="mt-6 max-w-xl text-base leading-7 text-slate-600">Atendimento ágil para empresas, locadoras e veículos particulares. Organizamos a manutenção para você ganhar previsibilidade e tempo.</p><a href={whatsappLink} target="_blank" rel="noreferrer" className="button button-dark mt-8">Cadastrar minha frota <ArrowRight size={17} /></a></motion.div><motion.div initial={{ opacity: 0, scale: .95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewport} className="fleet-panel-light"><div className="flex items-center gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50"><Car className="text-blue-600" /></div><div><p className="text-2xl font-black text-navy">Agilidade + controle</p><p className="mt-1 text-sm text-slate-500">Manutenção que cabe na rotina.</p></div></div><div className="mt-8 grid grid-cols-2 gap-3">{['Prioridade de agenda', 'Checklists digitais', 'Orçamento claro', 'Retorno no mesmo dia'].map((item) => <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-700" key={item}><Check size={14} className="mb-2 text-blue-600" />{item}</div>)}</div></motion.div></div></section>

        <section id="orcamento" className="section-pad bg-white"><div className="shell grid gap-12 lg:grid-cols-[.82fr_1.18fr]"><motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={reveal}><div className="section-kicker">Orçamento inteligente</div><h2 className="section-title">Conte o que seu carro precisa.</h2><p className="mt-5 leading-7 text-slate-600">Preencha em menos de um minuto. Nossa equipe recebe os dados e continua o atendimento pelo WhatsApp.</p><div className="mt-8 space-y-4">{['Você escolhe o serviço', 'A gente entende seu veículo', 'Você recebe um atendimento sob medida'].map((item, i) => <div className="flex items-center gap-3 text-sm font-semibold text-slate-700" key={item}><span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-xs font-black text-blue-700">0{i + 1}</span>{item}</div>)}</div></motion.div><motion.form initial="hidden" whileInView="visible" viewport={viewport} variants={reveal} onSubmit={handleQuote} className="quote-form"><div className="grid gap-5 sm:grid-cols-2"><label>Serviço necessário<select value={service} onChange={(event) => setService(event.target.value)}>{['Freios', 'Suspensão', 'Alinhamento 3D', 'Troca de Óleo', 'Ar Condicionado', 'Revisão Geral'].map((item) => <option key={item}>{item}</option>)}</select></label><label>Veículo e ano<input required value={vehicle} onChange={(event) => setVehicle(event.target.value)} placeholder="Ex.: Honda Fit 2020" /></label></div><label className="mt-5">Tipo de veículo<div className="mt-2 grid grid-cols-2 gap-3">{['Pessoal', 'Frota'].map((item) => <button type="button" className={`choice ${isFleet === item ? 'choice-active' : ''}`} onClick={() => setIsFleet(item)} key={item}>{item === 'Pessoal' ? <Car size={17} /> : <Zap size={17} />}{item}</button>)}</div></label><button className="button button-blue mt-6 w-full" type="submit">Enviar dados para receber orçamento <ArrowRight size={17} /></button><AnimatePresence>{submitted && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 text-center text-sm font-semibold text-emerald-600">Dados enviados. O WhatsApp foi aberto para continuar o atendimento.</motion.p>}</AnimatePresence></motion.form></div></section>

        <section className="section-pad bg-blue-50/70"><div className="shell grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]"><motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={reveal}><div className="section-kicker">Conforto para todos</div><h2 className="section-title">Acessibilidade não é detalhe. É cuidado.</h2><p className="mt-5 max-w-lg leading-7 text-slate-600">Nossa estrutura foi pensada para receber você com tranquilidade, do estacionamento ao banheiro.</p><a href={whatsappLink} target="_blank" rel="noreferrer" className="button button-dark mt-8">Tirar dúvidas sobre acessibilidade <ArrowRight size={17} /></a></motion.div><div className="grid grid-cols-3 gap-3 sm:gap-5">{[{ icon: Accessibility, label: 'Entrada acessível' }, { icon: Car, label: 'Estacionamento' }, { icon: BadgeCheck, label: 'Banheiro acessível' }].map(({ icon: Icon, label }) => <motion.div whileHover={{ y: -5 }} className="access-card" key={label}><Icon size={29} className="text-blue-600" /><p className="mt-5 text-sm font-bold leading-5 text-navy">{label}</p></motion.div>)}</div></div></section>

        <section id="avaliacoes" className="section-pad bg-white"><div className="shell"><motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={reveal} className="text-center"><div className="section-kicker justify-center">Quem conhece, confia</div><h2 className="section-title">Cuidado que vira recomendação.</h2><div className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-slate-600"><span className="flex gap-1 text-blue-500">{[1, 2, 3, 4, 5].map((star) => <Star size={16} fill="currentColor" key={star} />)}</span> 4.8 no Google <span className="font-normal text-slate-400">• 81 avaliações</span></div></motion.div><div className="mt-12 grid gap-5 md:grid-cols-3">{reviews.map((review, index) => <motion.figure initial="hidden" whileInView="visible" viewport={viewport} variants={{ ...reveal, visible: { ...reveal.visible, transition: { delay: index * .1 } } }} className="review-card" key={review.name}><div className="flex items-center justify-between"><div className="flex gap-1 text-blue-500">{[1, 2, 3, 4, 5].map((star) => <Star size={14} fill="currentColor" key={star} />)}</div><span className="text-[11px] text-slate-400">{review.date}</span></div><blockquote className="mt-6 text-[15px] leading-7 text-slate-600">“{review.text}”</blockquote><figcaption className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-4"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">{review.initials}</span><span className="text-sm font-bold text-navy">{review.name}</span></figcaption></motion.figure>)}</div><div className="mt-10 text-center"><a href="https://www.google.com/maps/search/?api=1&query=Beta%20Freios&query_place_id=ChIJlX23Cd9QzpQRsdBT87anszI" target="_blank" rel="noreferrer" className="button button-outline">Ver todas as 81 avaliações <ArrowRight size={17} /></a></div></div></section>

        <section id="localizacao" className="section-pad bg-slate-50"><div className="shell grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={reveal}><div className="section-kicker">Venha nos visitar</div><h2 className="section-title">No coração da Chácara Santo Antônio.</h2><div className="mt-8 space-y-6"><div className="flex gap-4"><MapPin className="mt-1 shrink-0 text-blue-600" size={21} /><p className="text-sm font-semibold leading-6 text-slate-700">R. Américo Brasiliense, 2225<br />Chácara Santo Antônio, São Paulo - SP<br />04715-005</p></div><div className="flex gap-4"><Clock3 className="mt-1 shrink-0 text-blue-600" size={21} /><p className="text-sm font-semibold leading-6 text-slate-700">Segunda a sexta: 07:00 às 17:00<br /><span className="font-normal text-slate-500">Sábado e domingo: fechado</span></p></div></div><a href={routeUrl} target="_blank" rel="noreferrer" className="button button-blue mt-8"><Navigation size={17} /> Traçar rota</a></motion.div><motion.div initial={{ opacity: 0, scale: .97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewport} className="map-frame"><iframe title="Mapa da Beta Freios" src="https://www.google.com/maps?q=Beta%20Freios%20R.%20Am%C3%A9rico%20Brasiliense%202225%20S%C3%A3o%20Paulo&output=embed" loading="lazy" /></motion.div></div></section>
      </main>

      <footer className="bg-[#0b102c] py-12 text-white"><div className="shell grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:items-start"><div><div className="flex items-center gap-3"><img src="/image.png" alt="Beta Freios" className="logo-ring h-12 w-12 rounded-full object-cover" /><div className="text-sm font-extrabold uppercase tracking-[.12em]">Beta Freios<br /><span className="font-medium tracking-[.28em] text-blue-300">Auto Service</span></div></div><p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">Serviço prático, rápido e minucioso para você seguir tranquilo.</p></div><div><p className="footer-label">Navegue</p><div className="mt-4 space-y-3 text-sm text-slate-400"><a href="#diferenciais">Diferenciais</a><a href="#parceiros" className="block">Parceiros</a><a href="#servicos" className="block">Serviços</a><a href="#oficina" className="block">Oficina</a></div></div><div><p className="footer-label">Mais</p><div className="mt-4 space-y-3 text-sm text-slate-400"><a href="#funilaria" className="block">Funilaria</a><a href="#frotas" className="block">Frotas</a><a href="#avaliacoes" className="block">Avaliações</a><a href="#localizacao" className="block">Localização</a></div></div><div><p className="footer-label">Fale com a gente</p><p className="mt-4 text-sm leading-6 text-slate-400">R. Américo Brasiliense, 2225<br />Chácara Santo Antônio • São Paulo</p><a href={whatsappLink} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-300"><Phone size={15} /> WhatsApp da Beta Freios</a><a href={funilariaUrl} target="_blank" rel="noreferrer" className="mt-2 flex items-center gap-2 text-sm font-bold text-blue-300"><Building2 size={15} /> Site da Funilaria</a></div></div><div className="shell mt-10 border-t border-white/10 pt-6 text-xs text-slate-500">© 2025 Beta Freios Auto Service. Transparência em cada quilômetro.</div></footer><a href={whatsappLink} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" className="whatsapp-float"><MessageCircle size={24} /></a></div>
  );
}

export default App;
