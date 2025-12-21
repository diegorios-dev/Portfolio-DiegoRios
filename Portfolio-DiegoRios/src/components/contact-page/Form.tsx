import React, { useState } from 'react';
import FormText from './Text';

interface ContactForm {
    phone: string;
    fullName: string;
    email: string;
    message: string;
}

const Form: React.FC = () => {
    const [form, setForm] = useState<ContactForm>({
        phone: '',
        fullName: '',
        email: ' ',
        message: '',
    });

    const [formErrors, setFormErrors] = useState<
        Record<keyof Omit<ContactForm, 'phone'>, boolean>
    >({
        fullName: false,
        email: false,
        message: false,
    });

    const me = {
        phone: '',
        email: 'diegoavilaaa0@gmail.com',
    };

    const handleUpdateForm = (
        field: keyof ContactForm,
        value: string,
    ): void => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleFormSubmit = () => {
        // Reset form errors
        setFormErrors({
            fullName: false,
            email: false,
            message: false,
        });

        // Validate form fields
        const errors: Record<string, boolean> = {};
        if (!form.fullName) {
            errors.fullName = true;
        }
        if (!form.email) {
            errors.email = true;
        }
        if (!form.message) {
            errors.message = true;
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            // Submit the form if there are no errors
        }
    };

    return (
        <form className="md:grid md:grid-cols-2 md:gap-x-[72px]">
            {/* <FormText
                value={me.phone}
                label="Telefono"
                className="mb-5"
                isReadOnly={true}
                onChange={(value) => handleUpdateForm('phone', value)}
            /> */}
            <FormText
                value={me.email}
                type="email"
                label="Email"
                isReadOnly={true}
                className="mb-8 md:mb-14 lg:mb-16"
            />
            <FormText
                error={formErrors.fullName}
                value={form.fullName}
                label="Llena tu nombre"
                placeholder="Full name"
                className="mb-5 lg:mb-4"
                onChange={(value) => handleUpdateForm('fullName', value)}
            />
            <FormText
                error={formErrors.email}
                value={form.email}
                onChange={(value) => handleUpdateForm('email', value)}
                type="email"
                label="Llena tu email"
                placeholder="Dirección de email"
                className="mb-5 lg:mb-4"
            />
            <FormText
                error={formErrors.message}
                value={form.message}
                onChange={(value) => handleUpdateForm('message', value)}
                label="Escríbeme un mensaje"
                placeholder="Escríbeme un mensaje"
                className="mb-8 md:col-span-2"
            />
            <button
                type="button"
                className="flex items-center justify-center px-4 py-[9px] border rounded-[32px] text-white border-appText bg-appText max-w-max lg:px-7 lg:py-3"
                onClick={() => handleFormSubmit()}
            >
                <span>Submit</span>
            </button>
        </form>
    );
};

export default Form;
