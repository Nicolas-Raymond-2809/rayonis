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
import { Button } from "@/components/ui/button";

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
      className="flex-grow w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12"
    >
      {/* Back Button */}
      <Button 
        variant="outline"
        onClick={onBack}
        className="w-fit"
      >
        <ArrowLeft size={18} className="mr-2" />
        Retour aux solutions
      </Button>

      {/* Header Technique (Hero Service) */}
      <header className="flex flex-col gap-6">
        <div className="inline-flex w-fit px-3 py-1 bg-main/10 border-2 border-main text-main font-heading text-xs uppercase rounded-base">
          [ {service.category} ]
        </div>
        
        <h1 className="text-5xl md:text-7xl font-heading tracking-tighter text-foreground leading-none">
          <span className="bg-main text-main-foreground px-4 py-1 border-2 border-border rounded-base">
            {service.title}
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-foreground/70 font-heading italic">
          {service.promise}
        </p>

        {/* Barre de statut (Bento) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-secondary-background border-2 border-border p-6 rounded-base flex items-center gap-4">
            <div className="p-3 bg-main/20 text-main border-2 border-main rounded-base">
              <Wrench size={24} />
            </div>
            <div>
              <p className="text-xs uppercase font-heading text-foreground/50">🛠 Technos</p>
              <p className="text-lg font-heading">{service.technos}</p>
            </div>
          </div>
          <div className="bg-secondary-background border-2 border-border p-6 rounded-base flex items-center gap-4">
            <div className="p-3 bg-main/20 text-main border-2 border-main rounded-base">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs uppercase font-heading text-foreground/50">⏱ Déploiement</p>
              <p className="text-lg font-heading">{service.deployment}</p>
            </div>
          </div>
          <div className="bg-secondary-background border-2 border-border p-6 rounded-base flex items-center gap-4">
            <div className="p-3 bg-main/20 text-main border-2 border-main rounded-base">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-xs uppercase font-heading text-foreground/50">🔒 Sécurité</p>
              <p className="text-lg font-heading">{service.security}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Section "Le Diagnostic" */}
      <section className="bg-main border-2 border-border p-8 rounded-base flex items-start gap-6">
        <div className="p-4 bg-main-foreground text-main border-2 border-border rounded-base shrink-0">
          <Zap size={32} />
        </div>
        <p className="text-2xl text-main-foreground font-heading italic leading-tight">
          "{service.diagnostic}"
        </p>
      </section>

      {/* Méthodologie "Step-by-Step" */}
      <section className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <div className="h-1 w-12 bg-main"></div>
          <h2 className="text-3xl font-heading uppercase">Méthodologie Step-by-Step</h2>
        </div>
        
        <div className="relative pl-8 md:pl-0">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2 hidden md:block"></div>
          
          <div className="flex flex-col gap-12">
            {service.steps.map((step, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="flex-1 w-full">
                  <div className="bg-secondary-background border-2 border-border p-6 rounded-base">
                    <h3 className="text-xl font-heading mb-2">{step.title}</h3>
                    <p className="text-foreground/70 text-sm">{step.description}</p>
                  </div>
                </div>
                
                {/* Numbered Circle */}
                <div className="relative z-10 w-12 h-12 bg-main text-main-foreground border-2 border-border rounded-base flex items-center justify-center font-heading text-xl shrink-0">
                  0{index + 1}
                </div>
                
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Le Livrable */}
      <section className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <div className="h-1 w-12 bg-main"></div>
          <h2 className="text-3xl font-heading uppercase">Le Livrable</h2>
        </div>
        <div className="bg-secondary-background border-2 border-border p-8 rounded-base">
          <h3 className="text-xl font-heading mb-6">Checklist technique :</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.deliverables.map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-foreground/80 font-heading">
                <div className="text-main">
                  <CheckCircle2 size={18} />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA de Consultation */}
      <section className="bg-foreground text-background p-12 border-2 border-border shadow-shadow rounded-base text-center flex flex-col items-center gap-8 mt-12">
        <h2 className="text-4xl md:text-5xl font-heading uppercase tracking-tighter">Prêt à optimiser votre infrastructure ?</h2>
        <p className="text-xl text-background/80 max-w-2xl font-base">
          Nos experts sont prêts à analyser vos besoins et à concevoir une solution sur mesure pour votre entreprise.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Button size="lg" className="bg-main text-main-foreground border-border">
            {service.cta} <ChevronRight size={24} className="ml-2" />
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent text-background border-background hover:bg-background hover:text-foreground">
            <MessageSquare size={24} className="mr-2" /> Parlons de votre projet
          </Button>
        </div>
      </section>
    </motion.div>
  );
};

export default ServiceDetail;
