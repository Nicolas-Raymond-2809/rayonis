import { 
  Bot, 
  Search, 
  Cpu, 
  Share2, 
  ShieldCheck, 
  ArrowRight, 
  Code, 
  Sparkles, 
  Megaphone, 
  Network,
  Check,
  Menu,
  Twitter,
  Linkedin
} from 'lucide-react';
import { motion } from 'motion/react';

const ExpertiseCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    whileHover={{ x: -2, y: -2, boxShadow: '6px 6px 0px 0px #111718' }}
    className="flex flex-col bg-white border-2 border-border-dark p-6 shadow-neo transition-all h-full"
  >
    <div className="w-12 h-12 mb-6 bg-primary/10 border-2 border-border-dark flex items-center justify-center rounded-full text-primary">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-3 font-mono uppercase tracking-tight">{title}</h3>
    <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed">{description}</p>
    <a href="#" className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-primary hover:underline decoration-2 underline-offset-4">
      En savoir plus <ArrowRight size={16} className="ml-1" />
    </a>
  </motion.div>
);

const AcademyCard = ({ 
  title, 
  description, 
  features, 
  icon: Icon, 
  badge, 
  badgeColor = "bg-secondary" 
}: { 
  title: string, 
  description: string, 
  features: string[], 
  icon: any, 
  badge?: string,
  badgeColor?: string
}) => (
  <motion.div 
    whileHover={{ boxShadow: '6px 6px 0px 0px #111718' }}
    className="relative flex flex-col bg-white border-2 border-border-dark p-6 shadow-neo transition-all h-full"
  >
    {badge && (
      <div className={`absolute top-0 right-0 ${badgeColor} text-white text-[10px] font-mono px-2 py-1 border-l-2 border-b-2 border-border-dark font-bold uppercase z-10`}>
        {badge}
      </div>
    )}
    <div className="w-full aspect-video bg-secondary/20 mb-4 border-2 border-border-dark overflow-hidden relative flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-secondary/40" />
      <Icon size={48} className="text-secondary" />
    </div>
    <h3 className="text-xl font-bold mb-2 font-mono text-slate-900 uppercase tracking-tight">{title}</h3>
    <p className="text-slate-600 text-xs mb-4">{description}</p>
    <ul className="space-y-2 mb-6 flex-grow">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
          <Check size={14} className="text-secondary shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <button className="w-full py-2 border-2 border-border-dark bg-secondary/10 hover:bg-secondary hover:text-white transition-all text-xs font-bold uppercase font-mono tracking-wider text-slate-900">
      Découvrir
    </button>
  </motion.div>
);

export default function RayonisApp() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b-2 border-border-dark bg-white">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary border-2 border-border-dark flex items-center justify-center shadow-neo-sm">
              <Bot className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold tracking-tighter text-slate-900 uppercase">Rayonis</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-bold uppercase tracking-wide hover:text-primary transition-colors">Expertise</a>
            <a href="#" className="text-sm font-bold uppercase tracking-wide hover:text-secondary transition-colors">Académie</a>
            <a href="#" className="text-sm font-bold uppercase tracking-wide hover:text-primary transition-colors">À propos</a>
          </nav>

          <button className="hidden md:flex items-center justify-center h-10 px-6 bg-primary border-2 border-border-dark text-white font-mono text-sm font-bold uppercase tracking-wider shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover transition-all">
            Réserver un appel
          </button>

          <button className="md:hidden p-2">
            <Menu size={24} />
          </button>
        </div>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-20">
        {/* Expertise Section */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="h-1 w-12 bg-primary"></div>
            <h2 className="text-3xl font-bold uppercase tracking-tighter text-slate-900">Expertise & Solutions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ExpertiseCard 
              icon={Search}
              title="GEO IA"
              description="Optimisation de la visibilité sur les moteurs de recherche nouvelle génération basés sur l'IA."
            />
            <ExpertiseCard 
              icon={Cpu}
              title="Automatisation IA"
              description="Flux de travail automatisés pour une efficacité opérationnelle maximale et sans friction."
            />
            <ExpertiseCard 
              icon={Share2}
              title="Orchestration MCP"
              description="Gestion centralisée des modèles de contexte pour une cohérence parfaite de vos systèmes."
            />
            <ExpertiseCard 
              icon={ShieldCheck}
              title="Architecture & Guardrails"
              description="Sécurité, éthique et conformité rigoureuse de vos systèmes d'intelligence artificielle."
            />
          </div>
        </section>

        {/* Academy Section */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="h-1 w-12 bg-secondary"></div>
            <h2 className="text-3xl font-bold uppercase tracking-tighter text-slate-900">Académie Rayonis</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AcademyCard 
              title="Programmation et vibe coding"
              description="apprenez à coder avec l'IA comme copilote"
              features={["HTML", "CSS", "JavaScript", "GitHub", "Prompt Engineering avancé", "Débogage assisté"]}
              icon={Code}
              badge="Populaire"
            />
            <AcademyCard 
              title="Ia générative"
              description="maîtrisez la création de contenu par l'IA"
              features={["Image & vidéo", "design systéme", "présentation visuel", "copywriting"]}
              icon={Sparkles}
            />
            <AcademyCard 
              title="Vibe marketing"
              description="L'IA au service de la croissance"
              features={["UX design", "personae", "strategie marketing", "copywriting"]}
              icon={Megaphone}
            />
            <AcademyCard 
              title="Automatisation n8n"
              description="Crées des workflows complexes"
              features={["Logique node-based", "intégration API", "Workflows Avancés"]}
              icon={Network}
              badge="Expert"
              badgeColor="bg-slate-900"
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t-2 border-border-dark bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-900 flex items-center justify-center border border-slate-700">
                <Bot className="text-white" size={18} />
              </div>
              <h2 className="text-xl font-bold tracking-tighter text-slate-900 uppercase">Rayonis</h2>
            </div>
            <p className="text-sm text-slate-500 max-w-xs">
              Pionnier de l'intégration IA et de la formation technique nouvelle génération.
            </p>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 border-2 border-border-dark bg-white flex items-center justify-center hover:bg-slate-100 transition-colors shadow-neo-sm">
              <Twitter size={20} />
            </a>
            <a href="#" className="w-10 h-10 border-2 border-border-dark bg-white flex items-center justify-center hover:bg-slate-100 transition-colors shadow-neo-sm">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-200 text-center text-[10px] font-mono uppercase tracking-widest text-slate-400">
          © 2024 Rayonis. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
