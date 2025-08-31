
import React, { useState } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { FacebookIcon } from '../components/icons/FacebookIcon';
import { InstagramIcon } from '../components/icons/InstagramIcon';
import { YoutubeIcon } from '../components/icons/YoutubeIcon';

const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/perfectmodels.ga/', icon: <FacebookIcon /> },
    { name: 'Instagram', href: 'https://www.instagram.com/perfectmodels.ga/', icon: <InstagramIcon /> },
    { name: 'YouTube', href: 'https://www.youtube.com/@PMM241', icon: <YoutubeIcon /> },
];

const ContactPage: React.FC = () => {
    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle form submission (e.g., API call)
        console.log('Form submitted:', formState);
        setIsSubmitted(true);
        // Reset form after a delay
        setTimeout(() => {
            setIsSubmitted(false);
            setFormState({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };


  return (
    <SectionWrapper
      title="Contactez-nous"
      subtitle="Prêt à collaborer ? Contactez notre équipe pour toute demande d'information, de booking ou de partenariat."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        
        {/* Contact Form */}
        <div className="bg-gray-900/50 p-8 rounded-lg shadow-2xl border border-brand-gold/10">
          <h3 className="text-3xl font-serif text-brand-gold mb-6">Envoyer un message</h3>
          {isSubmitted ? (
             <div className="text-center p-8 bg-green-900/50 border border-green-500 rounded-lg">
                <h4 className="font-bold text-white text-xl">Merci !</h4>
                <p className="text-green-300">Votre message a bien été envoyé. Nous vous répondrons bientôt.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nom complet</label>
                    <input type="text" name="name" id="name" required value={formState.name} onChange={handleInputChange} className="w-full bg-brand-dark border border-gray-600 rounded-md p-3 focus:ring-brand-gold focus:border-brand-gold transition"/>
                </div>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Adresse Email</label>
                    <input type="email" name="email" id="email" required value={formState.email} onChange={handleInputChange} className="w-full bg-brand-dark border border-gray-600 rounded-md p-3 focus:ring-brand-gold focus:border-brand-gold transition"/>
                </div>
                 <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Sujet</label>
                    <input type="text" name="subject" id="subject" required value={formState.subject} onChange={handleInputChange} className="w-full bg-brand-dark border border-gray-600 rounded-md p-3 focus:ring-brand-gold focus:border-brand-gold transition"/>
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea name="message" id="message" rows={5} required value={formState.message} onChange={handleInputChange} className="w-full bg-brand-dark border border-gray-600 rounded-md p-3 focus:ring-brand-gold focus:border-brand-gold transition"></textarea>
                </div>
                <div>
                    <button type="submit" className="w-full px-8 py-3 bg-brand-gold text-brand-dark font-bold rounded-full hover:bg-yellow-300 transition-colors duration-300 transform hover:scale-105">
                        Envoyer
                    </button>
                </div>
            </form>
          )}
        </div>

        {/* Info & Map */}
        <div className="space-y-10">
            <div>
                 <h3 className="text-3xl font-serif text-brand-gold mb-4">Nos Coordonnées</h3>
                 <ul className="space-y-3 text-lg">
                     <li><a href="mailto:perfectmodels.ga@gmail.com" className="hover:text-brand-gold transition-colors flex items-center gap-3"><span className="text-brand-gold">📧</span> perfectmodels.ga@gmail.com</a></li>
                     <li><a href="tel:+241074066461" className="hover:text-brand-gold transition-colors flex items-center gap-3"><span className="text-brand-gold">📱</span> +241 074 066 461</a></li>
                     <li className="flex items-center gap-3"><span className="text-brand-gold">📍</span> INDI HAIR, Avorbam (Libreville)</li>
                 </ul>
            </div>
             <div>
                 <h3 className="text-3xl font-serif text-brand-gold mb-4">Suivez-nous</h3>
                 <div className="flex space-x-4">
                    {socialLinks.map(social => (
                        <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-gold transition-colors">{social.icon}</a>
                    ))}
                 </div>
            </div>
            <div>
                <h3 className="text-3xl font-serif text-brand-gold mb-4">Notre Emplacement</h3>
                <div className="aspect-video w-full rounded-lg overflow-hidden border-2 border-brand-gold/20">
                    <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">
                       <img src="https://i.ibb.co/hZpY5Pz/map-placeholder.png" alt="Carte de localisation de l'agence" className="w-full h-full object-cover"/>
                    </a>
                </div>
            </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ContactPage;
