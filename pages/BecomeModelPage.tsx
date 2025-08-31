
import React, { useState } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { fileToBase64 } from '../utils/fileToBase64';

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
            const API_KEY = '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';

            // Conversion des fichiers en base64
            const headshotBase64 = await fileToBase64(files.headshot);
            const fullBodyBase64 = await fileToBase64(files.fullBody);
            const profileBase64 = await fileToBase64(files.profile);

            const emailHtmlBody = `
                <h1>Nouvelle Candidature Mannequin</h1>
                <p>Une nouvelle candidature a été soumise via le site web.</p>
                <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                    <tr style="background-color: #f2f2f2;"><td colspan="2"><strong>Informations Personnelles</strong></td></tr>
                    <tr><td style="width: 30%;"><strong>Nom</strong></td><td>${formData.lastName}</td></tr>
                    <tr><td><strong>Prénom</strong></td><td>${formData.firstName}</td></tr>
                    <tr><td><strong>Date de Naissance</strong></td><td>${formData.birthDate}</td></tr>
                    <tr><td><strong>Email</strong></td><td><a href="mailto:${formData.email}">${formData.email}</a></td></tr>
                    <tr><td><strong>Téléphone</strong></td><td><a href="tel:${formData.phone}">${formData.phone}</a></td></tr>
                    <tr><td><strong>Ville / Pays</strong></td><td>${formData.city}, ${formData.country}</td></tr>
                    <tr style="background-color: #f2f2f2;"><td colspan="2"><strong>Mensurations</strong></td></tr>
                    <tr><td><strong>Taille</strong></td><td>${formData.height} cm</td></tr>
                    <tr><td><strong>Poids</strong></td><td>${formData.weight} kg</td></tr>
                    <tr><td><strong>Poitrine</strong></td><td>${formData.chest} cm</td></tr>
                    <tr><td><strong>Taille (vêtement)</strong></td><td>${formData.waist} cm</td></tr>
                    <tr><td><strong>Hanches</strong></td><td>${formData.hips} cm</td></tr>
                    <tr><td><strong>Pointure</strong></td><td>${formData.shoeSize}</td></tr>
                    <tr><td><strong>Couleur des yeux</strong></td><td>${formData.eyeColor}</td></tr>
                    <tr><td><strong>Couleur des cheveux</strong></td><td>${formData.hairColor}</td></tr>
                    <tr style="background-color: #f2f2f2;"><td colspan="2"><strong>Expérience</strong></td></tr>
                    <tr><td colspan="2">${formData.experience || 'Aucune'}</td></tr>
                </table>
            `;

            const response = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'api-key': API_KEY,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    sender: { name: "Site PMM Candidature", email: "noreply@perfectmodels.ga" },
                    to: [{ email: "perfectmodels.ga@gmail.com", name: "Perfect Models Management" }],
                    replyTo: { email: formData.email, name: `${formData.firstName} ${formData.lastName}` },
                    subject: `Nouvelle Candidature: ${formData.firstName} ${formData.lastName}`,
                    htmlContent: emailHtmlBody,
                    attachment: [
                        { content: headshotBase64, name: `headshot_${files.headshot.name}` },
                        { content: fullBodyBase64, name: `fullbody_${files.fullBody.name}` },
                        { content: profileBase64, name: `profile_${files.profile.name}` },
                    ]
                })
            });

            if (!response.ok) {
                 const errorData = await response.json().catch(() => null);
                 const errorMessage = errorData?.message || response.statusText;
                 throw new Error(`Erreur ${response.status}: ${errorMessage}`);
            }

            setStatus({ type: 'success', message: 'Votre candidature a été envoyée avec succès ! Nous vous contacterons bientôt.' });
            // Reset form
            setFormData({
                lastName: '', firstName: '', birthDate: '', email: '', phone: '',
                height: '', weight: '', chest: '', waist: '', hips: '', shoeSize: '',
                eyeColor: '', hairColor: '', city: '', country: 'Gabon', experience: '', consent: false
            });
            setFiles({});
            (e.target as HTMLFormElement).reset();

        } catch (error) {
            console.error("Erreur de soumission:", error);
            const errorMessage = error instanceof Error ? error.message : 'Une erreur inconnue est survenue.';
            setStatus({ type: 'error', message: `Une erreur est survenue. ${errorMessage}. Veuillez réessayer plus tard ou nous contacter directement.` });
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
                            <div className={`p-4 mb-4 rounded-md text-center ${status.type === 'success' ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
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
