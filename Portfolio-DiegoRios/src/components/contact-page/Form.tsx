import React, { useState } from 'react';
import FormText from './Text';

interface ContactForm {
    fullName: string;
    email: string;
    message: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

// Iconos SVG inline para mejor rendimiento
const UserIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const EmailIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const MessageIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const SendIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

const LoadingSpinner = () => (
    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
);

const SuccessIcon = () => (
    <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const Form: React.FC = () => {
    const [form, setForm] = useState<ContactForm>({
        fullName: '',
        email: '',
        message: '',
    });

    const [formErrors, setFormErrors] = useState<Record<keyof ContactForm, string>>({
        fullName: '',
        email: '',
        message: '',
    });

    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

    // 🔑 Tu Access Key de Web3Forms
    const WEB3FORMS_ACCESS_KEY = '167f7261-f395-4df5-a76c-17dc812bc331';

    const handleUpdateForm = (field: keyof ContactForm, value: string): void => {
        setForm((prev) => ({ ...prev, [field]: value }));
        // Limpiar error al escribir
        if (formErrors[field]) {
            setFormErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const validateEmail = (email: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleFormSubmit = async () => {
        // Validar campos
        const errors: Record<keyof ContactForm, string> = {
            fullName: '',
            email: '',
            message: '',
        };

        if (!form.fullName.trim()) {
            errors.fullName = 'Por favor, ingresa tu nombre';
        }

        if (!form.email.trim()) {
            errors.email = 'Por favor, ingresa tu email';
        } else if (!validateEmail(form.email)) {
            errors.email = 'Ingresa un email válido';
        }

        if (!form.message.trim()) {
            errors.message = 'Por favor, escribe un mensaje';
        } else if (form.message.trim().length < 10) {
            errors.message = 'El mensaje debe tener al menos 10 caracteres';
        }

        const hasErrors = Object.values(errors).some((e) => e !== '');
        if (hasErrors) {
            setFormErrors(errors);
            return;
        }

        // Enviar formulario
        setSubmitStatus('loading');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    name: form.fullName,
                    email: form.email,
                    message: form.message,
                    subject: `Nuevo mensaje de ${form.fullName} desde tu Portfolio`,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitStatus('success');
                setForm({ fullName: '', email: '', message: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error al enviar:', error);
            setSubmitStatus('error');
        }
    };

    const resetForm = () => {
        setSubmitStatus('idle');
        setFormErrors({ fullName: '', email: '', message: '' });
    };

    // Vista de éxito
    if (submitStatus === 'success') {
        return (
            <div className="w-full max-w-2xl mx-auto">
                <div className="bg-surface dark:bg-surface-dark-subtle rounded-2xl shadow-xl shadow-black/5 dark:shadow-black/20 p-8 md:p-12 border border-border dark:border-border-dark">
                    <div className="flex flex-col items-center text-center animate-fadeIn">
                        <div className="mb-6 animate-bounce">
                            <SuccessIcon />
                        </div>
                        <h3 className="text-2xl font-semibold text-content dark:text-content-dark mb-3">
                            ¡Mensaje enviado!
                        </h3>
                        <p className="text-content-muted dark:text-content-dark-muted mb-8 max-w-md">
                            Gracias por contactarme. Te responderé lo antes posible.
                        </p>
                        <button
                            type="button"
                            onClick={resetForm}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-accent-blue dark:text-accent-blue-dark border-2 border-accent-blue dark:border-accent-blue-dark hover:bg-accent-blue hover:text-white dark:hover:bg-accent-blue-dark dark:hover:text-white transition-all duration-200"
                        >
                            Enviar otro mensaje
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Card Container */}
            <div className="bg-surface dark:bg-surface-dark-subtle rounded-2xl shadow-xl shadow-black/5 dark:shadow-black/20 p-6 md:p-10 border border-border dark:border-border-dark">
                {/* Header */}
                <div className="text-center mb-8 md:mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-content dark:text-content-dark mb-3">
                        Contáctame
                    </h2>
                    <p className="text-content-muted dark:text-content-dark-muted text-base md:text-lg max-w-md mx-auto">
                        Cuéntame sobre tu proyecto, te respondo en menos de 24 horas.
                    </p>
                </div>

                {/* Form */}
                <form
                    className="space-y-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleFormSubmit();
                    }}
                >
                    {/* Grid para nombre y email en desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormText
                            error={!!formErrors.fullName}
                            errorMessage={formErrors.fullName}
                            value={form.fullName}
                            label="Nombre completo"
                            placeholder="Tu nombre"
                            icon={<UserIcon />}
                            onChange={(value) => handleUpdateForm('fullName', value)}
                        />
                        <FormText
                            error={!!formErrors.email}
                            errorMessage={formErrors.email}
                            value={form.email}
                            type="email"
                            label="Correo electrónico"
                            placeholder="tu@email.com"
                            icon={<EmailIcon />}
                            onChange={(value) => handleUpdateForm('email', value)}
                        />
                    </div>

                    {/* Mensaje - ancho completo */}
                    <FormText
                        error={!!formErrors.message}
                        errorMessage={formErrors.message}
                        value={form.message}
                        type="textarea"
                        label="Mensaje"
                        placeholder="Cuéntame sobre tu proyecto..."
                        icon={<MessageIcon />}
                        onChange={(value) => handleUpdateForm('message', value)}
                    />

                    {/* Error global */}
                    {submitStatus === 'error' && (
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 animate-fadeIn">
                            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm text-red-700 dark:text-red-400">
                                Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.
                            </p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={submitStatus === 'loading'}
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-white bg-accent-blue dark:bg-accent-blue-dark hover:bg-accent-blue/90 dark:hover:bg-accent-blue-dark/90 focus:outline-none focus:ring-4 focus:ring-accent-blue/30 dark:focus:ring-accent-blue-dark/30 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-accent-blue/25 dark:shadow-accent-blue-dark/25"
                    >
                        {submitStatus === 'loading' ? (
                            <>
                                <LoadingSpinner />
                                <span>Enviando...</span>
                            </>
                        ) : (
                            <>
                                <SendIcon />
                                <span>Enviar mensaje</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Form;
