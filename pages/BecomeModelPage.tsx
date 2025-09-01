
import React, { useState } from 'react';
import SectionWrapper from '../components/SectionWrapper';

// Remarque sur la sécurité :
// La logique d'envoi d'email a été déplacée vers un endpoint backend sécurisé (`/api/submit-application`).
// Cela empêche l'exposition de clés API côté client, ce qui est une pratique de sécurité essentielle.
// Le backend sera responsable de la construction de l'email et de l'envoi via un service tiers (ex: Brevo).

const BecomeModelPage: React.FC = () => {
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        birthDate: '',
        email: '',
        phone: '',
        height: '',
        weight: '',
        chest: '',
        waist: '',
        hips: '',
        shoeSize: '',
        eyeColor: '',
        hairColor: '',
        city: '',
        country: 'Gabon',
        experience: '',
        consent: false,
    });

    const [files, setFiles] = useState<{ headshot?: File, fullBody?: File, profile?: File }>({});
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files: inputFiles } = e.target;
        if (inputFiles && inputFiles.length > 0) {
            setFiles(prev => ({ ...prev, [name]: inputFiles[0] }));
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.consent || !files.headshot || !files.fullBody || !files.profile) {
            setStatus({ type: 'error', message: 'Veuillez remplir tous les champs obligatoires, télécharger les 3 photos et accepter les conditions.' });
            return;
        }
        setLoading(true);
        setStatus(null);

        try {
            const submissionData = new FormData();
            
            // Ajouter les données du formulaire
            for (const [key, value] of Object.entries(formData)) {
                submissionData.append(key, String(value));
            }

            // Ajouter les fichiers
            if (files.headshot) submissionData.append('headshot', files.headshot);
            if (files.fullBody) submissionData.append('fullBody', files.fullBody);
            if (files.profile) submissionData.append('profile', files.profile);
            
            // NOTE: C'est un placeholder pour un véritable endpoint d'API backend.
            // Dans une application réelle, vous remplacerez ceci par l'URL de votre fonction serverless ou de votre serveur backend.
            const response = await fetch('/api/submit-application', {
                method: 'POST',
                body: submissionData,
                // Les en-têtes (comme Content-Type) sont automatiquement définis par le navigateur pour FormData
            });

            if (!response.ok) {
                 // Essayer de parser l'erreur JSON, sinon utiliser le statut textuel
                 const errorData = await response.json().catch(() => null);
                 const errorMessage = errorData?.message || response.statusText;
                 throw new Error(`Erreur du serveur (${response.status}): ${errorMessage}`);
            }

            setStatus({ type: 'success', message: 'Votre candidature a été envoyée avec succès ! Nous vous contacterons bientôt.' });
            
            // Réinitialiser le formulaire
            setFormData({
                lastName: '', firstName: '', birthDate: '', email: '', phone: '',
                height: '', weight: '', chest: '', waist: '', hips: '', shoeSize: '',
                eyeColor: '', hairColor: '', city: '', country: 'Gabon', experience: '', consent: false
            });
            setFiles({});
            (e.target as HTMLFormElement).reset();

        } catch (error) {
            console.error("Erreur de soumission:", error);
            // Afficher un message d'erreur plus convivial
            const errorMessage = error instanceof Error ? error.message : 'Une erreur inconnue est survenue.';
            setStatus({ type: 'error', message: `Échec de l'envoi de la candidature. ${errorMessage}. Veuillez réessayer.` });
        } finally {
            setLoading(false);
        }
    };
    
    const inputStyle = "w-full bg-brand-dark border border-gray-600 rounded-md p-3 focus:ring-brand-gold focus:border-brand-gold transition";
    const labelStyle = "block text-sm font-medium text-gray-300 mb-2";
    const requiredSpan = <span className="text-brand-gold ml-1">*</span>;

    return (
        <SectionWrapper
            title="Devenir Mannequin"
            subtitle="Prêt(e) à commencer votre carrière ? Remplissez le formulaire ci-dessous pour soumettre votre candidature à notre agence."
        >
            <div className="max-w-4xl mx-auto bg-gray-900/50 p-8 rounded-lg shadow-2xl border border-brand-gold/10">
                <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* Infos Personnelles */}
                    <fieldset>
                        <legend className="text-2xl font-serif text-brand-gold mb-6 border-b border-brand-gold/20 pb-2 w-full">Informations Personnelles</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><label htmlFor="lastName" className={labelStyle}>Nom{requiredSpan}</label><input type="text" name="lastName" id="lastName" required className={inputStyle} value={formData.lastName} onChange={handleInputChange} /></div>
                            <div><label htmlFor="firstName" className={labelStyle}>Prénom{requiredSpan}</label><input type="text" name="firstName" id="firstName" required className={inputStyle} value={formData.firstName} onChange={handleInputChange} /></div>
                            <div><label htmlFor="birthDate" className={labelStyle}>Date de naissance{requiredSpan}</label><input type="date" name="birthDate" id="birthDate" required className={inputStyle} value={formData.birthDate} onChange={handleInputChange} /></div>
                            <div><label htmlFor="email" className={labelStyle}>Adresse Email{requiredSpan}</label><input type="email" name="email" id="email" required className={inputStyle} value={formData.email} onChange={handleInputChange} /></div>
                            <div><label htmlFor="phone" className={labelStyle}>Téléphone{requiredSpan}</label><input type="tel" name="phone" id="phone" required className={inputStyle} value={formData.phone} onChange={handleInputChange} /></div>
                            <div><label htmlFor="city" className={labelStyle}>Ville de résidence{requiredSpan}</label><input type="text" name="city" id="city" required className={inputStyle} value={formData.city} onChange={handleInputChange} /></div>
                        </div>
                    </fieldset>

                    {/* Mensurations */}
                    <fieldset>
                        <legend className="text-2xl font-serif text-brand-gold mb-6 border-b border-brand-gold/20 pb-2 w-full">Mensurations</legend>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                           <div><label htmlFor="height" className={labelStyle}>Taille (cm){requiredSpan}</label><input type="number" name="height" id="height" required className={inputStyle} placeholder="Ex: 185" value={formData.height} onChange={handleInputChange} /></div>
                           <div><label htmlFor="weight" className={labelStyle}>Poids (kg)</label><input type="number" name="weight" id="weight" className={inputStyle} placeholder="Ex: 70" value={formData.weight} onChange={handleInputChange} /></div>
                           <div><label htmlFor="chest" className={labelStyle}>Poitrine (cm)</label><input type="number" name="chest" id="chest" className={inputStyle} placeholder="Ex: 90" value={formData.chest} onChange={handleInputChange} /></div>
                           <div><label htmlFor="waist" className={labelStyle}>Taille (cm)</label><input type="number" name="waist" id="waist" className={inputStyle} placeholder="Ex: 60" value={formData.waist} onChange={handleInputChange} /></div>
                           <div><label htmlFor="hips" className={labelStyle}>Hanches (cm)</label><input type="number" name="hips" id="hips" className={inputStyle} placeholder="Ex: 90" value={formData.hips} onChange={handleInputChange} /></div>
                           <div><label htmlFor="shoeSize" className={labelStyle}>Pointure (EU){requiredSpan}</label><input type="number" name="shoeSize" id="shoeSize" required className={inputStyle} placeholder="Ex: 43" value={formData.shoeSize} onChange={handleInputChange} /></div>
                           <div><label htmlFor="hairColor" className={labelStyle}>Couleur cheveux</label><input type="text" name="hairColor" id="hairColor" className={inputStyle} placeholder="Ex: Brun" value={formData.hairColor} onChange={handleInputChange} /></div>
                           <div><label htmlFor="eyeColor" className={labelStyle}>Couleur yeux</label><input type="text" name="eyeColor" id="eyeColor" className={inputStyle} placeholder="Ex: Marron" value={formData.eyeColor} onChange={handleInputChange} /></div>
                        </div>
                    </fieldset>
                    
                     {/* Photos */}
                    <fieldset>
                        <legend className="text-2xl font-serif text-brand-gold mb-6 border-b border-brand-gold/20 pb-2 w-full">Photos</legend>
                        <p className="text-gray-400 mb-6 text-sm">Veuillez fournir des photos récentes, claires, sans maquillage et sans retouches. Fichiers acceptés : JPG, PNG. Taille max : 5Mo.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div><label htmlFor="headshot" className={labelStyle}>Portrait (face){requiredSpan}</label><input type="file" name="headshot" id="headshot" required className={inputStyle} accept="image/png, image/jpeg" onChange={handleFileChange} /></div>
                            <div><label htmlFor="fullBody" className={labelStyle}>En pied (face){requiredSpan}</label><input type="file" name="fullBody" id="fullBody" required className={inputStyle} accept="image/png, image/jpeg" onChange={handleFileChange}/></div>
                            <div><label htmlFor="profile" className={labelStyle}>Profil (côté){requiredSpan}</label><input type="file" name="profile" id="profile" required className={inputStyle} accept="image/png, image/jpeg" onChange={handleFileChange}/></div>
                        </div>
                    </fieldset>

                    {/* Experience & Consent */}
                    <div>
                        <label htmlFor="experience" className={labelStyle}>Expérience (optionnel)</label>
                        <textarea name="experience" id="experience" rows={4} className={inputStyle} placeholder="Décrivez brièvement votre expérience si vous en avez." value={formData.experience} onChange={handleInputChange}></textarea>
                    </div>

                    <div className="flex items-center">
                        <input type="checkbox" name="consent" id="consent" required className="h-4 w-4 text-brand-gold bg-brand-dark border-gray-600 focus:ring-brand-gold" checked={formData.consent} onChange={handleInputChange} />
                        <label htmlFor="consent" className="ml-3 block text-sm text-gray-300">
                            Je confirme que les informations sont exactes et j'autorise Perfect Models Management à me contacter.{requiredSpan}
                        </label>
                    </div>

                    {/* Submission */}
                    <div>
                        {status && (
                            <div role="alert" className={`p-4 mb-4 rounded-md text-center ${status.type === 'success' ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
                                {status.message}
                            </div>
                        )}
                        <button type="submit" disabled={loading} className="w-full px-8 py-4 bg-brand-gold text-brand-dark font-bold rounded-full hover:bg-yellow-300 transition-colors duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:scale-100 disabled:cursor-not-allowed">
                            {loading ? 'Envoi en cours...' : 'Soumettre ma candidature'}
                        </button>
                    </div>

                </form>
            </div>
        </SectionWrapper>
    );
};

export default BecomeModelPage;