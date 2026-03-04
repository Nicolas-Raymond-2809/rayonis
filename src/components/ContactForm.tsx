import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ContactFormProps {
  onClose: () => void;
  initialSubject?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose, initialSubject = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: initialSubject,
    message: '',
    contactPreferenceTime: '',
    contactPreferenceChannel: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  useEffect(() => {
    // Render Turnstile widget when component mounts
    const renderTurnstile = () => {
      // @ts-ignore
      if (window.turnstile) {
        // @ts-ignore
        window.turnstile.render('#cf-turnstile', {
          sitekey: '0x4AAAAAACl3tUPuodmYxkyO',
          callback: (token: string) => setTurnstileToken(token),
        });
      }
    };

    // If turnstile is already loaded
    // @ts-ignore
    if (window.turnstile) {
      renderTurnstile();
    } else {
      // If script hasn't loaded yet, we could wait for it, but since it's in head async, 
      // it might load after. However, standard implementation usually relies on window.onload callback 
      // or similar. For this modal, it's likely loaded.
      // We can check periodically or just rely on the user having loaded the page.
      // A simple fallback is to retry a few times.
      const interval = setInterval(() => {
        // @ts-ignore
        if (window.turnstile) {
          renderTurnstile();
          clearInterval(interval);
        }
      }, 100);
      setTimeout(() => clearInterval(interval), 5000);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!turnstileToken) {
      setError('Veuillez valider le captcha.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('https://rayonis.app.n8n.cloud/webhook/e651b5aa-232f-4f0a-bc6a-3ebdaaccd28e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          'cf-turnstile-response': turnstileToken,
          submittedAt: new Date().toISOString(),
          source: window.location.href
        }),
      });

      if (!response.ok) {
        throw new Error('Une erreur est survenue lors de l\'envoi.');
      }

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      setError('Impossible d\'envoyer le message. Veuillez réessayer plus tard.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-lg bg-secondary-background border-2 border-border shadow-shadow p-6 md:p-8 rounded-none relative max-h-[90vh] overflow-y-auto"
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X size={24} />
        </Button>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-heading uppercase">Message envoyé !</h3>
            <p className="text-foreground/70">
              Merci de nous avoir contactés. Nous reviendrons vers vous très rapidement.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl md:text-3xl font-heading uppercase mb-2">Contactez-nous</h2>
            <p className="text-foreground/70 mb-6 text-sm">
              Parlez-nous de votre projet ou posez-nous vos questions.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-heading uppercase text-xs">Nom complet *</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jean Dupont"
                  className="rounded-none border-2 border-border focus-visible:ring-main"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-heading uppercase text-xs">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jean@exemple.com"
                    className="rounded-none border-2 border-border focus-visible:ring-main"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-heading uppercase text-xs">Téléphone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="06 12 34 56 78"
                    className="rounded-none border-2 border-border focus-visible:ring-main"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPreferenceTime" className="font-heading uppercase text-xs">Moment préféré</Label>
                  <select
                    id="contactPreferenceTime"
                    name="contactPreferenceTime"
                    value={formData.contactPreferenceTime}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-none border-2 border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-main"
                  >
                    <option value="">Peu importe</option>
                    <option value="Matin">Matin</option>
                    <option value="Après-midi">Après-midi</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPreferenceChannel" className="font-heading uppercase text-xs">Canal préféré</Label>
                  <select
                    id="contactPreferenceChannel"
                    name="contactPreferenceChannel"
                    value={formData.contactPreferenceChannel}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-none border-2 border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-main"
                  >
                    <option value="">Peu importe</option>
                    <option value="Email">Email</option>
                    <option value="Téléphone">Téléphone</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="font-heading uppercase text-xs">Sujet *</Label>
                <Input
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Demande d'information..."
                  className="rounded-none border-2 border-border focus-visible:ring-main"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="font-heading uppercase text-xs">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Comment pouvons-nous vous aider ?"
                  className="min-h-[120px] rounded-none border-2 border-border focus-visible:ring-main resize-none"
                />
              </div>

              <div id="cf-turnstile" className="cf-turnstile" data-sitekey="0x4AAAAAACl3tUPuodmYxkyO" data-theme="light" data-size="normal"></div>

              {error && (
                <p className="text-red-500 text-sm font-medium">{error}</p>
              )}

              <Button 
                type="submit" 
                className="w-full bg-main text-main-foreground hover:bg-main/90 rounded-none mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" /> Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer le message <Send size={18} className="ml-2" />
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;
