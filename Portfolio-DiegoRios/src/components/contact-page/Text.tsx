import { type ChangeEvent } from 'react';
import classNames from 'classnames';

interface Props {
    value: string;
    type?: 'email' | 'text' | 'textarea';
    isReadOnly?: boolean;
    placeholder?: string;
    label?: string;
    onChange?: (value: string) => void;
    className?: string;
    error?: boolean;
    errorMessage?: string;
    icon?: React.ReactNode;
}

const FormText: React.FC<Props> = ({
    onChange,
    label,
    type = 'text',
    value,
    isReadOnly,
    placeholder,
    className,
    error = false,
    errorMessage,
    icon,
}) => {
    const handleInput = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        if (onChange !== undefined) {
            onChange(event.target.value);
        }
    };

    const inputBaseStyles = classNames(
        'w-full bg-transparent text-content dark:text-content-dark',
        'text-base leading-relaxed',
        'placeholder:text-content-subtle dark:placeholder:text-content-dark-subtle',
        'focus:outline-none transition-colors duration-200',
        { 'cursor-not-allowed opacity-60': isReadOnly },
    );

    const containerStyles = classNames(
        'relative px-4 py-3 rounded-xl border-2 transition-all duration-200',
        'bg-surface dark:bg-surface-dark-subtle',
        'focus-within:border-accent-blue dark:focus-within:border-accent-blue-dark',
        'focus-within:ring-4 focus-within:ring-accent-blue/10 dark:focus-within:ring-accent-blue-dark/10',
        {
            'border-border dark:border-border-dark hover:border-content-subtle dark:hover:border-content-dark-subtle': !error && !isReadOnly,
            'border-red-400 dark:border-red-500 ring-4 ring-red-500/10': error,
            'border-border-muted dark:border-border-dark-muted bg-surface-muted dark:bg-surface-dark-muted': isReadOnly,
        },
    );

    return (
        <div className={classNames('flex flex-col gap-2', className)}>
            {/* Label */}
            {label && (
                <label
                    className={classNames(
                        'text-sm font-medium leading-none transition-colors duration-200',
                        {
                            'text-content dark:text-content-dark': !error,
                            'text-red-500 dark:text-red-400': error,
                        },
                    )}
                >
                    {label}
                    {!isReadOnly && <span className="text-accent-blue dark:text-accent-blue-dark ml-1">*</span>}
                </label>
            )}

            {/* Input Container */}
            <div className={containerStyles}>
                <div className="flex items-start gap-3">
                    {/* Icon */}
                    {icon && (
                        <span className={classNames(
                            'flex-shrink-0 transition-colors duration-200',
                            {
                                'text-content-subtle dark:text-content-dark-subtle': !error,
                                'text-red-500 dark:text-red-400': error,
                            }
                        )}>
                            {icon}
                        </span>
                    )}

                    {/* Input or Textarea */}
                    {type === 'textarea' ? (
                        <textarea
                            value={value}
                            placeholder={placeholder}
                            readOnly={isReadOnly}
                            rows={4}
                            className={classNames(inputBaseStyles, 'resize-none')}
                            onChange={handleInput}
                        />
                    ) : (
                        <input
                            value={value}
                            type={type}
                            placeholder={placeholder}
                            readOnly={isReadOnly}
                            className={inputBaseStyles}
                            onChange={handleInput}
                        />
                    )}
                </div>
            </div>

            {/* Error Message */}
            {error && errorMessage && (
                <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1.5 animate-fadeIn">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

export default FormText;
