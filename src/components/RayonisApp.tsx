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
  Linkedin,
  X,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import CourseDetail, { type CourseData } from './CourseDetail';
import ServiceDetail, { type ServiceData } from './ServiceDetail';
import coursesData from '../data/courses.json';
import servicesData from '../data/services.json';

const ExpertiseCard = ({ 
  icon: Icon, 
  title, 
  description, 
  onDiscover 
}: { 
  icon: any, 
  title: string, 
  description: string, 
  onDiscover: () => void 
}) => (
  <div className="flex flex-col bg-secondary-background border-2 border-border p-6 shadow-shadow transition-all duration-300 h-full rounded-none">
    <div className="w-12 h-12 mb-6 bg-main border-2 border-border flex items-center justify-center rounded-none text-main-foreground">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-heading mb-3 uppercase tracking-tight text-foreground">{title}</h3>
    <p className="text-foreground/70 text-sm mb-6 flex-grow leading-relaxed line-clamp-4 font-base">{description}</p>
    <Button 
      variant="default"
      onClick={onDiscover}
      className="w-full"
    >
      En savoir plus <ArrowRight size={16} className="ml-2" />
    </Button>
  </div>
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
  <div className="relative flex flex-col bg-secondary-background border-2 border-border p-6 shadow-shadow transition-all duration-300 h-full rounded-none">
    <div className="w-full aspect-video bg-main/10 mb-4 border-2 border-border overflow-hidden relative flex items-center justify-center rounded-none">
      <div className="absolute inset-0 bg-gradient-to-br from-main/5 to-main/20" />
      <Icon size={48} className="text-main relative z-10" />
    </div>
    <h3 className="text-xl font-heading mb-2 text-foreground uppercase tracking-tight">{title}</h3>
    <p className="text-foreground/60 text-xs mb-4 font-heading">{description}</p>
    <ul className="space-y-2 mb-6 flex-grow">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-2 text-xs text-foreground/80 font-base">
          <Check size={14} className="text-main shrink-0 stroke-[3px]" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <Button 
      onClick={onDiscover}
      variant="default"
      className="w-full"
    >
      Découvrir
    </Button>
  </div>
);

import ContactForm from './ContactForm';

export default function RayonisApp() {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const selectedCourse = coursesData.find(c => c.id === selectedCourseId) as CourseData | undefined;
  const selectedService = servicesData.find(s => s.id === selectedServiceId) as ServiceData | undefined;

  const handleBackToHome = () => {
    setSelectedCourseId(null);
    setSelectedServiceId(null);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleSelectCourse = (id: string) => {
    setSelectedCourseId(id);
    setSelectedServiceId(null);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleSelectService = (id: string) => {
    setSelectedServiceId(id);
    setSelectedCourseId(null);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleOpenContact = (subject?: string) => {
    setIsContactFormOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-base overflow-x-hidden pt-20">
      <AnimatePresence>
        {isContactFormOpen && (
          <ContactForm onClose={() => setIsContactFormOpen(false)} />
        )}
      </AnimatePresence>
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full border-b-2 border-border bg-secondary-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="p-0 h-auto">
              <a href="/" className="p-[0.5em]" style={{ border: 'solid 2px black' }}>
                <img src="/logo.svg" alt="Rayonis Logo" className="h-12 w-auto" referrerPolicy="no-referrer" />
              </a>
            </Button>
          </div>
          
          <div className="hidden md:flex">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Expertise</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={() => handleSelectService('geo-reputation')}>
                    GEO & E-Réputation
                  </MenubarItem>
                  <MenubarItem onClick={() => handleSelectService('automatisation-ia')}>
                    Automatisation IA
                  </MenubarItem>
                  <MenubarItem onClick={() => handleSelectService('orchestration-mcp')}>
                    Orchestration IA & MCP
                  </MenubarItem>
                  <MenubarItem onClick={() => handleSelectService('architecture-solution')}>
                    Architecture de solution
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              
              <MenubarMenu>
                <MenubarTrigger>Académie</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={() => handleSelectCourse('vibe-coding')}>
                    Programmation et vibe coding
                  </MenubarItem>
                  <MenubarItem onClick={() => handleSelectCourse('ia-generative')}>
                    Ia générative
                  </MenubarItem>
                  <MenubarItem onClick={() => handleSelectCourse('vibe-marketing')}>
                    Vibe marketing
                  </MenubarItem>
                  <MenubarItem onClick={() => handleSelectCourse('automatisation-n8n')}>
                    Automatisation n8n
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger>À propos</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    Notre mission
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => handleOpenContact("Contact")}>
                    Contact
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger>Outils</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem asChild>
                    <a href="/tailwind-builder" className="w-full">Tailwind Builder</a>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>

          <Button className="hidden md:flex" onClick={() => handleOpenContact("Réserver un appel")}>
            Réserver un appel
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden border-2 border-border rounded-none"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t-2 border-border bg-secondary-background overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-6">
                <div className="space-y-4">
                  <p className="text-xs font-heading uppercase text-foreground/50 tracking-widest">Expertise</p>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => handleSelectService('geo-reputation')} className="text-left py-2 font-heading uppercase text-sm hover:text-main transition-colors">GEO & E-Réputation</button>
                    <button onClick={() => handleSelectService('automatisation-ia')} className="text-left py-2 font-heading uppercase text-sm hover:text-main transition-colors">Automatisation IA</button>
                    <button onClick={() => handleSelectService('orchestration-mcp')} className="text-left py-2 font-heading uppercase text-sm hover:text-main transition-colors">Orchestration IA & MCP</button>
                    <button onClick={() => handleSelectService('architecture-solution')} className="text-left py-2 font-heading uppercase text-sm hover:text-main transition-colors">Architecture de solution</button>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-heading uppercase text-foreground/50 tracking-widest">Académie</p>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => handleSelectCourse('vibe-coding')} className="text-left py-2 font-heading uppercase text-sm hover:text-main transition-colors">Programmation et vibe coding</button>
                    <button onClick={() => handleSelectCourse('ia-generative')} className="text-left py-2 font-heading uppercase text-sm hover:text-main transition-colors">Ia générative</button>
                    <button onClick={() => handleSelectCourse('vibe-marketing')} className="text-left py-2 font-heading uppercase text-sm hover:text-main transition-colors">Vibe marketing</button>
                    <button onClick={() => handleSelectCourse('automatisation-n8n')} className="text-left py-2 font-heading uppercase text-sm hover:text-main transition-colors">Automatisation n8n</button>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-heading uppercase text-foreground/50 tracking-widest">Outils</p>
                  <div className="flex flex-col gap-2">
                    <a href="/tailwind-builder" className="text-left py-2 font-heading uppercase text-sm hover:text-main transition-colors">Tailwind Builder</a>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-border/10">
                  <Button className="w-full" onClick={() => handleOpenContact("Réserver un appel")}>
                    Réserver un appel
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence mode="wait">
        {selectedCourse ? (
          <CourseDetail 
            key="course-detail"
            course={selectedCourse} 
            onBack={handleBackToHome}
            onContact={() => handleOpenContact("Formation : " + selectedCourse.title)}
          />
        ) : selectedService ? (
          <ServiceDetail 
            key="service-detail"
            service={selectedService} 
            onBack={handleBackToHome}
            onContact={() => handleOpenContact("Projet : " + selectedService.title)}
          />
        ) : (
          <motion.main 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-6 py-12 flex flex-col gap-24"
          >
            {/* Hero Section */}
            <section className="relative py-12 md:py-24">
              <div className="absolute inset-0 -z-10 opacity-[0.05]" 
                   style={{ backgroundImage: 'radial-gradient(var(--color-foreground) 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>
              
              <div className="flex flex-col items-start gap-8 max-w-4xl">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-background border-2 border-main text-main font-heading text-xs uppercase tracking-widest rounded-none"
                >
                  <Sparkles size={16} />
                  Solutions IA Avancées
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl sm:text-5xl md:text-8xl font-heading tracking-tighter text-foreground leading-[0.9]"
                >
                  Transformez votre futur avec <br className="hidden md:block" />
                  <span className="relative inline-block px-3 sm:px-6 py-2 bg-main text-main-foreground border-2 border-border mt-4 md:mt-2 rounded-none">
                    l'Intelligence
                  </span> <br className="md:hidden" />
                  <span className="relative inline-block px-3 sm:px-6 py-2 bg-main text-main-foreground border-2 border-border mt-4 rounded-none">
                    Artificielle
                  </span>
                </motion.h1>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-6 border-l-4 border-main pl-8 py-4"
                >
                  <p className="text-xl md:text-2xl text-foreground/80 leading-tight font-heading max-w-2xl">
                    Découvrez comment nous transformons votre entreprise avec des solutions IA de pointe, sécurisées et performantes. Une approche pragmatique pour des résultats concrets.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Expertise Section */}
            <section className="flex flex-col gap-12">
              <div className="flex items-center gap-6">
                <div className="h-2 w-16 bg-main"></div>
                <h2 className="text-4xl md:text-5xl font-heading uppercase tracking-tighter text-foreground">Expertise & Solutions</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ExpertiseCard 
                  icon={Search}
                  title="GEO & E-Réputation"
                  description="Ne vous contentez plus d'être indexé, soyez cité. Nous optimisons votre présence digitale pour les moteurs de recherche nouvelle génération comme Perplexity, SearchGPT et Gemini. Notre approche de Generative Engine Optimization (GEO) garantit que l'IA ne se contente pas de vous trouver, mais qu'elle vous recommande avec précision et autorité."
                  onDiscover={() => handleSelectService('geo-reputation')}
                />
                <ExpertiseCard 
                  icon={Cpu}
                  title="Automatisation IA"
                  description="Libérez votre talent des tâches répétitives. Nous concevons des flux de travail intelligents qui agissent comme un système nerveux pour votre entreprise. De la saisie de données complexe à la gestion client, nos automatisations créent une efficacité opérationnelle sans friction, vous permettant de passer de l'exécution à la stratégie en un clic."
                  onDiscover={() => handleSelectService('automatisation-ia')}
                />
                <ExpertiseCard 
                  icon={Share2}
                  title="Orchestration IA & MCP"
                  description="Faites passer vos IA du stade d'outils isolés à celui d'équipe synchronisée. Grâce au protocole MCP (Model Context Protocol), nous orchestrons plusieurs modèles pour qu'ils travaillent de concert sur vos données réelles. C'est la gestion centralisée du contexte pour une cohérence parfaite : vos IA partagent enfin le même cerveau."
                  onDiscover={() => handleSelectService('orchestration-mcp')}
                />
                <ExpertiseCard 
                  icon={ShieldCheck}
                  title="Architecture de solution"
                  description="Bâtissez sur des fondations solides et évolutives. Nous concevons l'ossature technique de vos projets digitaux en intégrant nativement la sécurité (Guardrails) et la rentabilité (FinOps). Une architecture signée Rayonis, c'est la garantie d'une solution robuste, capable de monter en charge tout en maîtrisant vos coûts d'infrastructure."
                  onDiscover={() => handleSelectService('architecture-solution')}
                />
              </div>
            </section>

            {/* Academy Section */}
            <section className="flex flex-col gap-12">
              <div className="flex items-center gap-6">
                <div className="h-2 w-16 bg-main"></div>
                <h2 className="text-4xl md:text-5xl font-heading uppercase tracking-tighter text-foreground">Académie Rayonis</h2>
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
      <footer className="bg-secondary-background border-t-4 border-border p-6 md:p-10 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            
            <div className="space-y-2">
              <h2 className="text-3xl font-heading uppercase tracking-tighter text-foreground">
                Rayonis
              </h2>
              <div className="text-sm space-y-1">
                <p className="font-heading">SIREN : 101 871 424</p>
                <p className="text-foreground/60">27200 Vernon</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="bg-main border-2 border-border px-4 py-2 font-heading text-main-foreground rounded-none">
                ORCHESTRATION IA
              </div>
              <div className="bg-main/50 border-2 border-border px-4 py-2 font-heading text-foreground rounded-none">
                VIBE CODING
              </div>
            </div>

          </div>

          <div className="border-t-2 border-border mt-10 pt-6 flex flex-col md:flex-row justify-between text-xs font-heading uppercase">
            <p>© 2026 Rayonis — L'intention au centre du projet</p>
            <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
              <Button variant="secondary" asChild className="text-xs font-heading uppercase w-full md:w-auto">
                <a href="/mentions-legales">Mentions Légales</a>
              </Button>
              <Button variant="secondary" className="text-xs font-heading uppercase w-full md:w-auto" onClick={() => handleOpenContact("Contact")}>
                Contact
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
