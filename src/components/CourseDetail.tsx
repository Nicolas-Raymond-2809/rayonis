import React from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Target, 
  Users, 
  CheckCircle2, 
  Download, 
  Calendar,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from "@/components/ui/button";

export interface CourseModule {
  title: string;
  content: string;
}

export interface CourseData {
  id: string;
  title: string;
  slug: string;
  badge: string;
  accroche: string;
  duration: string;
  level: string;
  format: string;
  intention: string;
  modules: CourseModule[];
  stack: string[];
  cta: string;
}

interface CourseDetailProps {
  course: CourseData;
  onBack: () => void;
  onContact: () => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBack, onContact }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-6 py-12 flex flex-col gap-12"
    >
      {/* Back Button */}
      <Button 
        variant="outline"
        onClick={onBack}
        className="w-fit"
      >
        <ArrowLeft size={18} className="mr-2" />
        Retour à l'académie
      </Button>

      {/* Header / Hero */}
      <header className="flex flex-col gap-6">
        <div className="inline-flex w-fit px-3 py-1 bg-main/10 border-2 border-main text-main font-heading text-xs uppercase rounded-none">
          [ {course.badge || "Formation"} ]
        </div>
        
        <h1 className="text-5xl md:text-7xl font-heading tracking-tighter text-foreground leading-none">
          <span className="bg-main text-main-foreground px-4 py-1 border-2 border-border rounded-none">
            {course.title}
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-foreground/70 font-heading italic">
          "{course.accroche}"
        </p>

        {/* Bento Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-secondary-background border-2 border-border p-6 rounded-none flex items-center gap-4">
            <div className="p-3 bg-main/20 text-main border-2 border-main rounded-none">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs uppercase font-heading text-foreground/50">Durée</p>
              <p className="text-lg font-heading">{course.duration}</p>
            </div>
          </div>
          <div className="bg-secondary-background border-2 border-border p-6 rounded-none flex items-center gap-4">
            <div className="p-3 bg-main/20 text-main border-2 border-main rounded-none">
              <Target size={24} />
            </div>
            <div>
              <p className="text-xs uppercase font-heading text-foreground/50">Niveau</p>
              <p className="text-lg font-heading">{course.level}</p>
            </div>
          </div>
          <div className="bg-secondary-background border-2 border-border p-6 rounded-none flex items-center gap-4">
            <div className="p-3 bg-main/20 text-main border-2 border-main rounded-none">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs uppercase font-heading text-foreground/50">Format</p>
              <p className="text-lg font-heading">{course.format}</p>
            </div>
          </div>
        </div>
      </header>

      {/* L'Intention */}
      <section className="bg-main border-2 border-border p-8 rounded-none">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-1 w-12 bg-main-foreground"></div>
          <h2 className="text-2xl font-heading uppercase text-main-foreground">L'Intention (Le Vibe)</h2>
        </div>
        <div className="max-w-4xl">
          <p className="text-xl text-main-foreground/90 leading-relaxed font-heading">
            {course.intention}
          </p>
        </div>
      </section>

      {/* Le Programme */}
      <section className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <div className="h-1 w-12 bg-main"></div>
          <h2 className="text-3xl font-heading uppercase">Le Programme</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {course.modules.map((module, index) => (
              <div key={index} className="bg-secondary-background border-2 border-border p-6 rounded-none">
                <h3 className="text-xl font-heading mb-3 flex items-center gap-3">
                  <span className="bg-main text-main-foreground w-8 h-8 flex items-center justify-center text-sm border-2 border-border rounded-none">
                    0{index + 1}
                  </span>
                  {module.title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {module.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack Technique */}
      <section className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <div className="h-1 w-12 bg-main"></div>
          <h2 className="text-3xl font-heading uppercase">Stack Technique</h2>
        </div>
        <div className="flex flex-wrap gap-4">
          {course.stack.map((tool, index) => (
            <span key={index} className="px-4 py-2 bg-secondary-background border-2 border-border font-heading text-sm rounded-none">
              {tool}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-background p-12 border-2 border-border shadow-shadow rounded-none text-center flex flex-col items-center gap-8 mt-12">
        <h2 className="text-4xl md:text-5xl font-heading uppercase tracking-tighter">Prêt à passer au niveau supérieur ?</h2>
        <p className="text-xl text-background/80 max-w-2xl font-base">
          Rejoignez une communauté d'experts et maîtrisez les outils qui façonnent le futur de votre industrie.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Button size="lg" className="bg-main text-main-foreground border-border" onClick={onContact}>
            Suivre une formation <ChevronRight size={24} className="ml-2" />
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent text-background border-background hover:bg-background hover:text-foreground">
            <Download size={24} className="mr-2" /> Télécharger la fiche
          </Button>
        </div>
      </section>
    </motion.div>
  );
};

export default CourseDetail;
