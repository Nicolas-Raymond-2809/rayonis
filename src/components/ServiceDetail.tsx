import React from 'react';
import { 
  ArrowLeft, 
  Wrench, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight,
  MessageSquare,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';

export interface ServiceStep {
  title: string;
  description: string;
}

export interface ServiceData {
  id: string;
  title: string;
  category: string;
  promise: string;
  technos: string;
  deployment: string;
  security: string;
  diagnostic: string;
  steps: ServiceStep[];
  deliverables: string[];
  cta: string;
}

interface ServiceDetailProps {
  service: ServiceData;
  onBack: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto px-6 py-12"
    >
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="group mb-12 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Retour aux solutions
      </button>

      {/* Header Technique (Hero Service) */}
      <header className="mb-16">
        <div className="inline-block px-3 py-1 bg-[#06B6D4] text-white font-mono text-[10px] font-bold uppercase tracking-widest mb-6 border border-slate-700 shadow-neo-sm">
          [ {service.category} ]
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-900 mb-6 leading-tight">
          <span className="relative inline-block">
            {service.title}
            <div className="absolute bottom-1 left-0 w-full h-3 bg-[#06B6D4]/30 -z-10" />
          </span>
        </h1>

        <p className="text-xl md:text-2xl font-medium text-slate-600 mb-10">
          {service.promise}
        </p>

        {/* Barre de statut (Bento) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-4 p-4 bg-white border-2 border-border-dark shadow-neo-sm">
            <div className="w-10 h-10 bg-primary/10 flex items-center justify-center border border-primary/20">
              <Wrench size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">🛠 Technos</p>
              <p className="font-bold text-slate-900 text-sm">{service.technos}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white border-2 border-border-dark shadow-neo-sm">
            <div className="w-10 h-10 bg-secondary/10 flex items-center justify-center border border-secondary/20">
              <Clock size={20} className="text-secondary" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">⏱ Déploiement</p>
              <p className="font-bold text-slate-900">{service.deployment}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white border-2 border-border-dark shadow-neo-sm">
            <div className="w-10 h-10 bg-emerald-100 flex items-center justify-center border border-emerald-200">
              <ShieldCheck size={20} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">🔒 Sécurité</p>
              <p className="font-bold text-slate-900">{service.security}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Section "Le Diagnostic" */}
      <section className="mb-16">
        <div className="bg-white border-[4px] border-border-dark p-8 shadow-neo relative">
          <div className="absolute -top-4 -left-4 bg-primary text-white p-2 border-2 border-border-dark">
            <Zap size={20} />
          </div>
          <p className="text-xl font-medium text-slate-800 leading-relaxed italic">
            "{service.diagnostic}"
          </p>
        </div>
      </section>

      {/* Méthodologie "Step-by-Step" */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-1 w-12 bg-primary"></div>
          <h2 className="text-2xl font-bold uppercase tracking-tighter text-slate-900">Méthodologie Step-by-Step</h2>
        </div>
        
        <div className="relative pl-8 md:pl-12">
          {/* Vertical Line */}
          <div className="absolute left-[15px] md:left-[28px] top-0 bottom-0 w-1 bg-border-dark" />
          
          <div className="space-y-12">
            {service.steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Numbered Circle */}
                <div className="absolute -left-[32px] md:-left-[40px] top-0 w-8 h-8 md:w-10 md:h-10 bg-white border-2 border-border-dark rounded-full flex items-center justify-center font-mono font-bold text-sm md:text-base shadow-neo-sm z-10">
                  0{index + 1}
                </div>
                <div className="bg-white border-2 border-border-dark p-6 shadow-neo-sm ml-4">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 uppercase tracking-tight">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Le Livrable */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-1 w-12 bg-secondary"></div>
          <h2 className="text-2xl font-bold uppercase tracking-tighter text-slate-900">Le Livrable</h2>
        </div>
        <div className="bg-white border-2 border-border-dark p-8 shadow-neo">
          <h3 className="text-lg font-bold text-slate-900 mb-6 uppercase tracking-widest font-mono">Checklist technique :</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.deliverables.map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-slate-700 font-medium">
                <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA de Consultation */}
      <section className="bg-primary border-2 border-border-dark p-10 shadow-neo text-center">
        <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-tighter">Prêt à optimiser votre infrastructure ?</h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto font-medium">
          Nos experts sont prêts à analyser vos besoins et à concevoir une solution sur mesure pour votre entreprise.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button className="h-14 px-10 bg-slate-900 border-2 border-border-dark text-white font-mono font-bold uppercase tracking-wider shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover transition-all flex items-center gap-2">
            {service.cta} <ChevronRight size={20} />
          </button>
          <button className="h-14 px-10 bg-white border-2 border-border-dark text-slate-900 font-mono font-bold uppercase tracking-wider shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover transition-all flex items-center gap-2">
            <MessageSquare size={20} /> Parlons de votre projet
          </button>
        </div>
      </section>
    </motion.div>
  );
};

export default ServiceDetail;
