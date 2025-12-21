import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import PinIcon from '../../assets/icons/pin.svg?raw';
import MenuIcon from '../../assets/icons/menu.svg?raw';
import XIcon from '../../assets/icons/x.svg?raw';

const Header: React.FC = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const timeNow = new Date().toLocaleTimeString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    const containerRef = useRef<HTMLDivElement | null>(null);

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    const handleContainerClick = (e: React.MouseEvent) => {
        if (containerRef.current === e.target) {
            toggleMobileMenu();
        }
    };

    const nav = [
        {
            label: 'Incio',
            href: '/',
        },
        {
            label: 'Sobre Mí',
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
            <div
                className="relative z-10 container"
                onClick={handleContainerClick}
                ref={containerRef}
            >
                <nav className="relative flex items-center justify-between pt-6">
                    <a
                        href="/"
                        className="flex md:flex-1"
                        aria-label="Home page"
                    >
                        <img
                            src="/marca.png"
                            alt="Logo"
                            className={classNames('w-[100px] md:w-[120px]', {
                                'max-md:grayscale max-md:brightness-100 max-md:invert':
                                    showMobileMenu,
                            })}
                        />
                    </a>
                    <ul
                        className={classNames(
                            'flex flex-col gap-8 transition-colors duration-300 max-md:absolute max-md:left-0 max-md:-bottom-8 max-md:translate-y-full max-md:w-full md:flex-row md:flex-1 md:justify-center lg:gap-10',
                            {
                                'flex flex-col text-white md:text-appGray-500':
                                    showMobileMenu,
                                'text-appGray-500 max-md:hidden':
                                    !showMobileMenu,
                            },
                        )}
                    >
                        {nav.map((item, index) => (
                            <li key={index}>
                                <a
                                    href={item.href}
                                    className="text-sm leading-none font-medium tracking-[-0.41px] md:text-base md:leading-none transition-colors duration-300 md:hover:text-appText"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center justify-end flex-1 leading-none font-medium tracking-[-0.41px] max-lg:hidden">
                        <div
                            dangerouslySetInnerHTML={{ __html: PinIcon }}
                            className="w-4 h-4 mr-1"
                        />
                        <span>Argentina</span>
                        <div className="w-4 h-4 bg-blue-500 rounded-full mx-2" />
                        <span>{timeNow}</span>
                    </div>
                    <button
                        className="flex md:hidden"
                        aria-label="Toggle mobile menu"
                        onClick={toggleMobileMenu}
                    >
                        {showMobileMenu ? (
                            <div
                                dangerouslySetInnerHTML={{ __html: XIcon }}
                                className="w-6 h-6 text-white"
                            />
                        ) : (
                            <div
                                dangerouslySetInnerHTML={{ __html: MenuIcon }}
                                className="w-6 h-6"
                            />
                        )}
                    </button>
                </nav>
            </div>
            {showMobileMenu && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-appText md:hidden" />
            )}
        </header>
    );
};

export default Header;
