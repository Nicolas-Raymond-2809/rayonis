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
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-6 py-12"
    >
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="group mb-12 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Retour à l'académie
      </button>

      {/* Header / Hero */}
      <header className="mb-16">
        <div className="inline-block px-3 py-1 bg-slate-900 text-white font-mono text-[10px] font-bold uppercase tracking-widest mb-6 border border-slate-700">
          [ {course.badge} ]
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-900 mb-6 leading-tight">
          <span className="relative inline-block">
            {course.title}
            <div className="absolute bottom-1 left-0 w-full h-3 bg-[#A78BFA]/30 -z-10" />
          </span>
        </h1>

        <p className="text-xl md:text-2xl font-medium text-slate-600 italic mb-10">
          "{course.accroche}"
        </p>

        {/* Bento Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-4 p-4 bg-white border-2 border-border-dark shadow-neo-sm">
            <div className="w-10 h-10 bg-primary/10 flex items-center justify-center border border-primary/20">
              <Clock size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">Durée</p>
              <p className="font-bold text-slate-900">{course.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white border-2 border-border-dark shadow-neo-sm">
            <div className="w-10 h-10 bg-secondary/10 flex items-center justify-center border border-secondary/20">
              <Target size={20} className="text-secondary" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">Niveau</p>
              <p className="font-bold text-slate-900">{course.level}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white border-2 border-border-dark shadow-neo-sm">
            <div className="w-10 h-10 bg-slate-100 flex items-center justify-center border border-slate-200">
              <Users size={20} className="text-slate-600" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">Format</p>
              <p className="font-bold text-slate-900">{course.format}</p>
            </div>
          </div>
        </div>
      </header>

      {/* L'Intention */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-1 w-12 bg-primary"></div>
          <h2 className="text-2xl font-bold uppercase tracking-tighter text-slate-900">L'Intention (Le Vibe)</h2>
        </div>
        <div className="bg-white border-2 border-border-dark p-8 shadow-neo relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12" />
          <p className="text-lg text-slate-700 leading-relaxed relative z-10">
            {course.intention}
          </p>
        </div>
      </section>

      {/* Le Programme */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-1 w-12 bg-secondary"></div>
          <h2 className="text-2xl font-bold uppercase tracking-tighter text-slate-900">Le Programme</h2>
        </div>
        <div className="bg-white border-2 border-border-dark shadow-neo overflow-hidden">
          <div className="divide-y-2 divide-slate-100">
            {course.modules.map((module, index) => (
              <div key={index} className="p-6 md:p-8 hover:bg-slate-50 transition-colors">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 bg-secondary text-white text-xs font-mono flex items-center justify-center border border-border-dark">
                    0{index + 1}
                  </span>
                  {module.title}
                </h3>
                <p className="text-slate-600 pl-11">
                  {module.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack Technique */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-1 w-12 bg-slate-900"></div>
          <h2 className="text-2xl font-bold uppercase tracking-tighter text-slate-900">Stack Technique</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {course.stack.map((tool, index) => (
            <span 
              key={index}
              className="px-4 py-2 bg-white border-2 border-border-dark font-mono text-xs font-bold uppercase tracking-wider shadow-neo-sm"
            >
              {tool}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 border-2 border-border-dark p-10 shadow-neo text-center">
        <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-tighter">Prêt à passer au niveau supérieur ?</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Rejoignez une communauté d'experts et maîtrisez les outils qui façonnent le futur de votre industrie.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button className="h-14 px-10 bg-primary border-2 border-border-dark text-white font-mono font-bold uppercase tracking-wider shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover transition-all flex items-center gap-2">
            {course.cta} <ChevronRight size={20} />
          </button>
          <button className="h-14 px-10 bg-white border-2 border-border-dark text-slate-900 font-mono font-bold uppercase tracking-wider shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover transition-all flex items-center gap-2">
            <Download size={20} /> Syllabus complet
          </button>
        </div>
      </section>
    </motion.div>
  );
};

export default CourseDetail;
