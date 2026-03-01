import { useState } from 'react';
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
import { motion, AnimatePresence } from 'motion/react';
import CourseDetail, { type CourseData } from './CourseDetail';
import coursesData from '../data/courses.json';

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
  onDiscover
}: { 
  title: string, 
  description: string, 
  features: string[], 
  icon: any, 
  onDiscover: () => void
}) => (
  <motion.div 
    whileHover={{ boxShadow: '6px 6px 0px 0px #111718' }}
    className="relative flex flex-col bg-white border-2 border-border-dark p-6 shadow-neo transition-all h-full"
  >
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
    <button 
      onClick={onDiscover}
      className="w-full py-2 border-2 border-border-dark bg-secondary/10 hover:bg-secondary hover:text-white transition-all text-xs font-bold uppercase font-mono tracking-wider text-slate-900"
    >
      Découvrir
    </button>
  </motion.div>
);

export default function RayonisApp() {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const selectedCourse = coursesData.find(c => c.id === selectedCourseId) as CourseData | undefined;

  const handleBackToHome = () => {
    setSelectedCourseId(null);
    window.scrollTo(0, 0);
  };

  const handleSelectCourse = (id: string) => {
    setSelectedCourseId(id);
    window.scrollTo(0, 0);
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b-2 border-border-dark bg-white">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <img src="/logo.svg" alt="Rayonis Logo" className="h-12 w-auto" referrerPolicy="no-referrer" />
            </a>
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

      <AnimatePresence mode="wait">
        {selectedCourse ? (
          <CourseDetail 
            key="course-detail"
            course={selectedCourse} 
            onBack={handleBackToHome} 
          />
        ) : (
          <motion.main 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-grow w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-24"
          >
            {/* Hero Section */}
            <section className="relative py-12 md:py-20 overflow-hidden">
              <div className="absolute inset-0 -z-10 opacity-[0.03]" 
                   style={{ backgroundImage: 'radial-gradient(#111718 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
              
              <div className="flex flex-col items-start gap-8 max-w-4xl">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-primary shadow-neo-sm text-primary font-mono text-[10px] font-bold uppercase tracking-widest"
                >
                  <Sparkles size={14} />
                  Solutions IA Avancées
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 leading-[1.1]"
                >
                  Transformez votre futur avec <br className="hidden md:block" />
                  <span className="relative inline-block px-4 py-1 bg-primary text-white border-2 border-border-dark shadow-neo mt-2 md:mt-0">
                    l'Intelligence
                  </span> <br className="md:hidden" />
                  <span className="relative inline-block px-4 py-1 bg-primary text-white border-2 border-border-dark shadow-neo mt-2">
                    Artificielle
                  </span>
                </motion.h1>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-6 border-l-4 border-primary pl-6 py-2"
                >
                  <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium max-w-2xl">
                    Découvrez comment nous transformons votre entreprise avec des solutions IA de pointe, sécurisées et performantes. Une approche pragmatique pour des résultats concrets.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-4 mt-4"
                >
                  <button className="h-14 px-8 bg-slate-900 border-2 border-border-dark text-white font-mono font-bold uppercase tracking-wider shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover transition-all">
                    Découvrir nos services
                  </button>
                  <button className="h-14 px-8 bg-white border-2 border-border-dark text-slate-900 font-mono font-bold uppercase tracking-wider shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover transition-all">
                    Parlons de votre projet
                  </button>
                </motion.div>
              </div>
            </section>

            {/* Expertise Section */}
            <section className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <div className="h-1 w-12 bg-primary"></div>
                <h2 className="text-3xl font-bold uppercase tracking-tighter text-slate-900">Expertise & Solutions</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ExpertiseCard 
                  icon={Search}
                  title="GEO & E-Réputation"
                  description="Ne vous contentez plus d'être indexé, soyez cité. Nous optimisons votre présence digitale pour les moteurs de recherche nouvelle génération comme Perplexity, SearchGPT et Gemini. Notre approche de Generative Engine Optimization (GEO) garantit que l'IA ne se contente pas de vous trouver, mais qu'elle vous recommande avec précision et autorité."
                />
                <ExpertiseCard 
                  icon={Cpu}
                  title="Automatisation IA"
                  description="Libérez votre talent des tâches répétitives. Nous concevons des flux de travail intelligents qui agissent comme un système nerveux pour votre entreprise. De la saisie de données complexe à la gestion client, nos automatisations créent une efficacité opérationnelle sans friction, vous permettant de passer de l'exécution à la stratégie en un clic."
                />
                <ExpertiseCard 
                  icon={Share2}
                  title="Orchestration IA & MCP"
                  description="Faites passer vos IA du stade d'outils isolés à celui d'équipe synchronisée. Grâce au protocole MCP (Model Context Protocol), nous orchestrons plusieurs modèles pour qu'ils travaillent de concert sur vos données réelles. C'est la gestion centralisée du contexte pour une cohérence parfaite : vos IA partagent enfin le même cerveau."
                />
                <ExpertiseCard 
                  icon={ShieldCheck}
                  title="Architecture de solution"
                  description="Bâtissez sur des fondations solides et évolutives. Nous concevons l'ossature technique de vos projets digitaux en intégrant nativement la sécurité (Guardrails) et la rentabilité (FinOps). Une architecture signée Rayonis, c'est la garantie d'une solution robuste, capable de monter en charge tout en maîtrisant vos coûts d'infrastructure."
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
                  description="Apprenez à coder avec l'IA comme copilote"
                  features={["HTML", "CSS", "JavaScript", "GitHub", "Prompt Engineering avancé", "Débogage assisté"]}
                  icon={Code}
                  onDiscover={() => handleSelectCourse('vibe-coding')}
                />
                <AcademyCard 
                  title="Ia générative"
                  description="Maîtrisez la création de contenu par l'IA"
                  features={["Image & Vidéo", "Design systéme", "Présentation visuel", "Copywriting"]}
                  icon={Sparkles}
                  onDiscover={() => handleSelectCourse('ia-generative')}
                />
                <AcademyCard 
                  title="Vibe marketing"
                  description="L'IA au service de la croissance"
                  features={["UX design", "Personae", "Strategie marketing", "Copywriting"]}
                  icon={Megaphone}
                  onDiscover={() => handleSelectCourse('vibe-marketing')}
                />
                <AcademyCard 
                  title="Automatisation n8n"
                  description="Crées des workflows complexes"
                  features={["Logique node-based", "Intégration API", "Workflows Avancés"]}
                  icon={Network}
                  onDiscover={() => handleSelectCourse('automatisation-n8n')}
                />
              </div>
            </section>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="w-full border-t-2 border-border-dark bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="Rayonis Logo" className="h-8 w-auto" referrerPolicy="no-referrer" />
            </div>
            <p className="text-sm text-slate-500 max-w-xs">
              Pionnier de l'intégration IA et de la formation technique nouvelle génération.
            </p>
          </div>

          <div className="flex gap-4">
          
            <a href="https://www.linkedin.com/in/nicolas-raymond-consultant-digital/" className="w-10 h-10 border-2 border-border-dark bg-white flex items-center justify-center hover:bg-slate-100 transition-colors shadow-neo-sm">
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
