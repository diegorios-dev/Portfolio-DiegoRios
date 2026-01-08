import React, { useState } from 'react';
import classNames from 'classnames';
import PinIcon from '../../assets/icons/pin.svg?raw';
import MenuIcon from '../../assets/icons/menu.svg?raw';
import XIcon from '../../assets/icons/x.svg?raw';
import ThemeToggle from '../ui/ThemeToggle';

const Header: React.FC = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const timeNow = new Date().toLocaleTimeString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    const nav = [
        {
            label: 'Inicio',
            href: '/',
        },
        {
            label: 'Sobre mí',
            href: '/about',
        },
        {
            label: 'Portfolio',
            href: '/portfolio',
        },
        {
            label: 'Contacto',
            href: '/contact',
        },
    ];

    return (
        <header className="relative z-50">
            {/* Mobile Menu Overlay */}
            <div 
                className={classNames(
                    'fixed inset-0 w-screen h-screen md:hidden z-40 transition-all duration-300',
                    'bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]',
                    {
                        'opacity-100 pointer-events-auto': showMobileMenu,
                        'opacity-0 pointer-events-none': !showMobileMenu,
                    }
                )}
            />
            
            {/* Mobile Menu Content */}
            <div
                className={classNames(
                    'fixed inset-0 z-[60] md:hidden flex flex-col transition-all duration-300 overflow-y-auto',
                    {
                        'opacity-100 pointer-events-auto': showMobileMenu,
                        'opacity-0 pointer-events-none': !showMobileMenu,
                    }
                )}
            >
                {/* Mobile Header */}
                <div className="container pt-6 flex items-center justify-between">
                    <a href="/" className="flex" aria-label="Home page">
                        <img
                            src="/marca.png"
                            alt="Logo"
                            className="w-[100px] invert"
                        />
                    </a>
                    <div className="flex items-center gap-2">
                        <ThemeToggle variant="mobile" className="text-white relative z-[100]" />
                        <button
                            type="button"
                            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200 relative z-[100]"
                            aria-label="Cerrar menú"
                            onClick={toggleMobileMenu}
                        >
                            <div
                                dangerouslySetInnerHTML={{ __html: XIcon }}
                                className="w-6 h-6 text-white"
                            />
                        </button>
                    </div>
                </div>

                {/* Separator */}
                <div className="container mt-6">
                    <div className="h-px bg-white/[0.08]" />
                </div>

                {/* Navigation Links */}
                <nav className="container mt-10">
                    <ul className="flex flex-col gap-2">
                        {nav.map((item, index) => (
                            <li 
                                key={index}
                                className="overflow-hidden"
                                style={{ 
                                    animationDelay: `${index * 50}ms`,
                                }}
                            >
                                <a
                                    href={item.href}
                                    className="group flex items-center gap-4 py-4 transition-all duration-200 hover:translate-x-2"
                                >
                                    <span className="text-xs font-mono text-white/30 w-6">
                                        0{index + 1}
                                    </span>
                                    <span className="text-2xl font-light tracking-tight text-white/70 group-hover:text-white transition-colors duration-200">
                                        {item.label}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Spacer */}
                <div className="flex-1 min-h-[60px]" />

                {/* Footer Section */}
                <div className="container pb-10">
                    {/* Separator */}
                    <div className="h-px bg-white/[0.08] mb-8" />
                    
                    {/* CTA Button */}
                    <a 
                        href="/Cv_Diego_Rios.pdf"
                        download
                        className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 rounded-full text-sm font-medium uppercase tracking-widest text-white/90 hover:bg-white hover:text-[#0a0a0a] transition-all duration-300"
                    >
                        Descargar CV
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </a>

                    {/* Availability Status */}
                    <div className="flex items-center gap-2 mt-6">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        <span className="text-sm text-white/50">Disponible para proyectos</span>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-6 mt-8">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-200">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-200">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-200">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Desktop Header */}
            <div className="relative z-50 container">
                <nav className="relative flex items-center justify-between pt-6">
                    <a
                        href="/"
                        className="flex md:flex-1"
                        aria-label="Home page"
                    >
                        <img
                            src="/marca.png"
                            alt="Logo"
                            className="w-[100px] md:w-[120px] dark:invert transition-all duration-300"
                        />
                    </a>
                    <ul className="hidden md:flex md:flex-row md:flex-1 md:justify-center lg:gap-10 gap-8 text-content-muted dark:text-content-dark-muted">
                        {nav.map((item, index) => (
                            <li key={index}>
                                <a
                                    href={item.href}
                                    className="text-base leading-none font-medium tracking-[-0.41px] transition-colors duration-300 hover:text-content dark:hover:text-content-dark"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center justify-end flex-1 leading-none font-medium tracking-[-0.41px] max-lg:hidden gap-4">
                        <div className="flex items-center">
                            <div
                                dangerouslySetInnerHTML={{ __html: PinIcon }}
                                className="w-4 h-4 mr-1"
                            />
                            <span>Argentina</span>
                            <div className="w-4 h-4 bg-blue-500 rounded-full mx-2" />
                            <span>{timeNow}</span>
                        </div>
                        <ThemeToggle />
                    </div>
                    <button
                        type="button"
                        className="flex md:hidden w-11 h-11 items-center justify-center"
                        aria-label="Abrir menú"
                        onClick={toggleMobileMenu}
                    >
                        <div
                            dangerouslySetInnerHTML={{ __html: MenuIcon }}
                            className="w-6 h-6 text-content dark:text-white"
                        />
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
