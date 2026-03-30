import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Type, 
  MousePointer2, 
  Square, 
  Layout, 
  Copy, 
  Check,
  ChevronRight,
  ChevronDown,
  Settings2,
  Code2,
  Eye,
  Edit3,
  RefreshCw
} from 'lucide-react';

type ElementType = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'button' | 'a' | 'div';

interface PropertyConfig {
  label: string;
  type: 'select' | 'slider' | 'color' | 'input';
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
}

const ELEMENTS: { id: ElementType; label: string; icon: any; subElements?: { id: ElementType; label: string }[] }[] = [
  { 
    id: 'h1', 
    label: 'Titres', 
    icon: Type,
    subElements: [
      { id: 'h1', label: 'H1 - Titre Principal' },
      { id: 'h2', label: 'H2 - Titre Secondaire' },
      { id: 'h3', label: 'H3 - Sous-titre' },
    ]
  },
  { 
    id: 'p', 
    label: 'Texte', 
    icon: Type,
    subElements: [
      { id: 'p', label: 'Paragraphe' },
      { id: 'span', label: 'Span (Inline)' },
    ]
  },
  { 
    id: 'button', 
    label: 'Actions', 
    icon: MousePointer2,
    subElements: [
      { id: 'button', label: 'Bouton' },
      { id: 'a', label: 'Lien' },
    ]
  },
  { 
    id: 'div', 
    label: 'Conteneur', 
    icon: Square,
  },
];

const PROPERTIES: Record<string, PropertyConfig> = {
  fontSize: {
    label: 'Taille du texte',
    type: 'select',
    options: [
      { label: 'Extra Small', value: 'text-xs' },
      { label: 'Small', value: 'text-sm' },
      { label: 'Base', value: 'text-base' },
      { label: 'Large', value: 'text-lg' },
      { label: 'Extra Large', value: 'text-xl' },
      { label: '2XL', value: 'text-2xl' },
      { label: '3XL', value: 'text-3xl' },
      { label: '4XL', value: 'text-4xl' },
      { label: '5XL', value: 'text-5xl' },
      { label: '6XL', value: 'text-6xl' },
      { label: '7XL', value: 'text-7xl' },
      { label: '8XL', value: 'text-8xl' },
      { label: '9XL', value: 'text-9xl' },
    ]
  },
  fontWeight: {
    label: 'Graisse',
    type: 'select',
    options: [
      { label: 'Thin', value: 'font-thin' },
      { label: 'Light', value: 'font-light' },
      { label: 'Normal', value: 'font-normal' },
      { label: 'Medium', value: 'font-medium' },
      { label: 'Semi Bold', value: 'font-semibold' },
      { label: 'Bold', value: 'font-bold' },
      { label: 'Extra Bold', value: 'font-extrabold' },
      { label: 'Black', value: 'font-black' },
    ]
  },
  textColor: {
    label: 'Couleur du texte',
    type: 'select',
    options: [
      { label: 'Noir', value: 'text-black' },
      { label: 'Blanc', value: 'text-white' },
      { label: 'Gris 500', value: 'text-gray-500' },
      { label: 'Bleu 500', value: 'text-blue-500' },
      { label: 'Rouge 500', value: 'text-red-500' },
      { label: 'Main (Thème)', value: 'text-main' },
    ]
  },
  backgroundColor: {
    label: 'Couleur de fond',
    type: 'select',
    options: [
      { label: 'Transparent', value: 'bg-transparent' },
      { label: 'Blanc', value: 'bg-white' },
      { label: 'Noir', value: 'bg-black' },
      { label: 'Gris 100', value: 'bg-gray-100' },
      { label: 'Bleu 500', value: 'bg-blue-500' },
      { label: 'Main (Thème)', value: 'bg-main' },
    ]
  },
  padding: {
    label: 'Padding',
    type: 'select',
    options: [
      { label: '0', value: 'p-0' },
      { label: '1', value: 'p-1' },
      { label: '2', value: 'p-2' },
      { label: '4', value: 'p-4' },
      { label: '6', value: 'p-6' },
      { label: '8', value: 'p-8' },
      { label: '10', value: 'p-10' },
      { label: '12', value: 'p-12' },
    ]
  },
  borderWidth: {
    label: 'Bordure',
    type: 'select',
    options: [
      { label: 'Aucune', value: 'border-0' },
      { label: '1px', value: 'border' },
      { label: '2px', value: 'border-2' },
      { label: '4px', value: 'border-4' },
      { label: '8px', value: 'border-8' },
    ]
  },
  borderColor: {
    label: 'Couleur bordure',
    type: 'select',
    options: [
      { label: 'Noir', value: 'border-black' },
      { label: 'Gris 200', value: 'border-gray-200' },
      { label: 'Main (Thème)', value: 'border-main' },
    ]
  },
  borderRadius: {
    label: 'Arrondi',
    type: 'select',
    options: [
      { label: 'Aucun', value: 'rounded-none' },
      { label: 'Small', value: 'rounded-sm' },
      { label: 'Base', value: 'rounded' },
      { label: 'Medium', value: 'rounded-md' },
      { label: 'Large', value: 'rounded-lg' },
      { label: 'Full', value: 'rounded-full' },
    ]
  },
  shadow: {
    label: 'Ombre',
    type: 'select',
    options: [
      { label: 'Aucune', value: 'shadow-none' },
      { label: 'Small', value: 'shadow-sm' },
      { label: 'Base', value: 'shadow' },
      { label: 'Medium', value: 'shadow-md' },
      { label: 'Large', value: 'shadow-lg' },
      { label: 'Brutal (Thème)', value: 'shadow-shadow' },
    ]
  }
};

const ELEMENT_PROPERTIES: Record<ElementType, string[]> = {
  h1: ['fontSize', 'fontWeight', 'textColor'],
  h2: ['fontSize', 'fontWeight', 'textColor'],
  h3: ['fontSize', 'fontWeight', 'textColor'],
  p: ['fontSize', 'fontWeight', 'textColor'],
  span: ['fontSize', 'fontWeight', 'textColor'],
  button: ['fontSize', 'fontWeight', 'textColor', 'backgroundColor', 'padding', 'borderWidth', 'borderColor', 'borderRadius', 'shadow'],
  a: ['fontSize', 'fontWeight', 'textColor', 'backgroundColor', 'padding', 'borderWidth', 'borderColor', 'borderRadius', 'shadow'],
  div: ['backgroundColor', 'padding', 'borderWidth', 'borderColor', 'borderRadius', 'shadow'],
};

export default function TailwindBuilder() {
  const [selectedElement, setSelectedElement] = useState<ElementType>('button');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({ Titres: true, Actions: true });
  const [config, setConfig] = useState<Record<string, string>>({
    fontSize: 'text-base',
    fontWeight: 'font-medium',
    textColor: 'text-black',
    backgroundColor: 'bg-main',
    padding: 'p-4',
    borderWidth: 'border-2',
    borderColor: 'border-black',
    borderRadius: 'rounded-none',
    shadow: 'shadow-shadow',
  });
  const [copied, setCopied] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);
  const [manualHtml, setManualHtml] = useState('');

  const toggleGroup = (label: string) => {
    setExpandedGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const handlePropertyChange = (prop: string, value: string) => {
    setConfig(prev => ({ ...prev, [prop]: value }));
    if (isManualMode) setIsManualMode(false);
  };

  const tailwindClasses = useMemo(() => {
    const props = ELEMENT_PROPERTIES[selectedElement];
    return props.map(p => config[p]).filter(Boolean).join(' ');
  }, [selectedElement, config]);

  const generatedHtml = useMemo(() => {
    const content = selectedElement === 'button' || selectedElement === 'a' ? 'Cliquez ici' : 
                   selectedElement.startsWith('h') ? 'Titre de niveau ' + selectedElement.slice(1) :
                   selectedElement === 'p' ? 'Ceci est un paragraphe de texte.' :
                   selectedElement === 'span' ? 'Texte inline' : 'Conteneur';
    
    return `<${selectedElement} class="${tailwindClasses}">${content}</${selectedElement}>`;
  }, [selectedElement, tailwindClasses]);

  const currentHtml = isManualMode ? manualHtml : generatedHtml;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleManualToggle = () => {
    if (!isManualMode) {
      setManualHtml(generatedHtml);
    }
    setIsManualMode(!isManualMode);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Elements */}
        <div className="bg-secondary-background border-2 border-black shadow-shadow p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Layout className="w-5 h-5" />
            <h2 className="text-xl font-heading uppercase tracking-tight">Éléments HTML</h2>
          </div>
          <div className="space-y-2">
            {ELEMENTS.map((group) => (
              <div key={group.label} className="space-y-1">
                {group.subElements ? (
                  <>
                    <button 
                      onClick={() => toggleGroup(group.label)}
                      className="w-full flex items-center justify-between p-2 hover:bg-main/10 transition-colors rounded"
                    >
                      <div className="flex items-center gap-2">
                        <group.icon className="w-4 h-4" />
                        <span className="font-medium">{group.label}</span>
                      </div>
                      {expandedGroups[group.label] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                    <AnimatePresence>
                      {expandedGroups[group.label] && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-6 space-y-1"
                        >
                          {group.subElements.map(sub => (
                            <button
                              key={sub.id}
                              onClick={() => setSelectedElement(sub.id)}
                              className={`w-full text-left p-2 text-sm rounded transition-all ${
                                selectedElement === sub.id 
                                ? 'bg-main text-main-foreground border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                                : 'hover:bg-main/5'
                              }`}
                            >
                              {sub.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <button
                    onClick={() => setSelectedElement(group.id)}
                    className={`w-full flex items-center gap-2 p-2 rounded transition-all ${
                      selectedElement === group.id 
                      ? 'bg-main text-main-foreground border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                      : 'hover:bg-main/5'
                    }`}
                  >
                    <group.icon className="w-4 h-4" />
                    <span className="font-medium">{group.label}</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Properties */}
        <div className="bg-secondary-background border-2 border-black shadow-shadow p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Settings2 className="w-5 h-5" />
            <h2 className="text-xl font-heading uppercase tracking-tight">Propriétés CSS</h2>
          </div>
          <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {ELEMENT_PROPERTIES[selectedElement].map(propKey => {
              const prop = PROPERTIES[propKey];
              return (
                <div key={propKey} className="space-y-2">
                  <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                    {prop.label}
                  </label>
                  {prop.type === 'select' && (
                    <select 
                      value={config[propKey]}
                      onChange={(e) => handlePropertyChange(propKey, e.target.value)}
                      className="w-full p-2 bg-background border-2 border-black rounded focus:ring-2 focus:ring-main outline-none"
                    >
                      {prop.options?.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 3: Code */}
        <div className="bg-secondary-background border-2 border-black shadow-shadow p-6 space-y-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              <h2 className="text-xl font-heading uppercase tracking-tight">Code HTML</h2>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleManualToggle}
                className={`p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all ${isManualMode ? 'bg-main' : 'bg-white'}`}
                title={isManualMode ? "Revenir au mode automatique" : "Passer en mode manuel"}
              >
                {isManualMode ? <RefreshCw className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              </button>
              <button 
                onClick={copyToClipboard}
                className="p-2 bg-main border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                title="Copier le code"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          {isManualMode ? (
            <textarea
              value={manualHtml}
              onChange={(e) => setManualHtml(e.target.value)}
              className="flex-1 bg-black text-green-400 p-4 rounded font-mono text-sm outline-none border-2 border-transparent focus:border-main resize-none"
              placeholder="Collez votre code HTML ici..."
            />
          ) : (
            <div className="flex-1 bg-black text-green-400 p-4 rounded font-mono text-sm overflow-auto break-all">
              {generatedHtml}
            </div>
          )}
          
          {isManualMode && (
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              Mode Manuel Actif : Le générateur est désactivé.
            </p>
          )}
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-secondary-background border-2 border-black shadow-shadow p-8 min-h-[300px] flex flex-col items-center justify-center space-y-6 relative overflow-hidden">
        <div className="absolute top-4 left-4 flex items-center gap-2 text-gray-400">
          <Eye className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">Prévisualisation</span>
        </div>
        
        <div className="w-full h-full flex items-center justify-center p-12 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          {isManualMode ? (
            <div dangerouslySetInnerHTML={{ __html: manualHtml }} />
          ) : (
            <>
              {selectedElement === 'h1' && <h1 className={tailwindClasses}>Titre de niveau 1</h1>}
              {selectedElement === 'h2' && <h2 className={tailwindClasses}>Titre de niveau 2</h2>}
              {selectedElement === 'h3' && <h3 className={tailwindClasses}>Titre de niveau 3</h3>}
              {selectedElement === 'p' && <p className={tailwindClasses}>Ceci est un paragraphe de texte pour tester le rendu visuel de vos classes Tailwind CSS.</p>}
              {selectedElement === 'span' && <span className={tailwindClasses}>Texte inline</span>}
              {selectedElement === 'button' && <button className={tailwindClasses}>Cliquez ici</button>}
              {selectedElement === 'a' && <a href="#" className={tailwindClasses}>Lien interactif</a>}
              {selectedElement === 'div' && (
                <div className={tailwindClasses}>
                  <div className="w-24 h-24 bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-xs text-gray-500">
                    Contenu
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--main);
          border-radius: 10px;
          border: 1px solid black;
        }
      `}} />
    </div>
  );
}
