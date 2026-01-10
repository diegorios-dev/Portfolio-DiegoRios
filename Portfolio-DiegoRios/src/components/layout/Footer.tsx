import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LinkedInIcon from '../../assets/icons/linkedin.svg?raw';

// Register plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const footerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLUListElement>(null);
    const socialsRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const ctx = gsap.context(() => {
            // Title animation
            gsap.fromTo(titleRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: 'top 90%',
                    }
                }
            );

            // Nav items stagger
            if (navRef.current) {
                const navItems = navRef.current.querySelectorAll('li');
                gsap.fromTo(navItems,
                    { opacity: 0, x: 20 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: footerRef.current,
                            start: 'top 90%',
                        }
                    }
                );
            }

            // Social buttons stagger
            if (socialsRef.current) {
                const socialItems = socialsRef.current.querySelectorAll('li');
                gsap.fromTo(socialItems,
                    { opacity: 0, y: 20, scale: 0.9 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: socialsRef.current,
                            start: 'top 95%',
                        }
                    }
                );
            }
        }, footerRef);

        return () => ctx.revert();
    }, []);

    const nav = [
        {
            label: 'diegoavilaaa0@gmail.com',
            href: 'mailto:diegoavilaaa0@gmail.com',
        },
    ];

    const socials = [
        {
            label: 'LinkedIn',
            icon: LinkedInIcon,
            href: 'https://www.linkedin.com/in/diego-rios-fullstack/',
        },
        {
            label: 'Contacto',
            href: '/contact',
        },
    ];

    return (
        <footer ref={footerRef} className="pb-10 overflow-hidden">
            <div className="container">
                <div className="pb-6 border-b border-border dark:border-border-dark mb-6 md:flex md:items-end md:justify-between md:pb-8 md:mb-8 transition-colors duration-300">
                    <div 
                        ref={titleRef}
                        className="text-lg leading-[1.2] tracking-[-0.41px] font-Helvetica max-w-[174px] max-md:mb-6 md:text-3xl md:leading-[1.2] md:max-w-[300px] lg:text-[40px] lg:max-w-[394px] text-content dark:text-content-dark transition-colors duration-300"
                    >
                        Contactame
                    </div>
                    <nav>
                        <ul ref={navRef} className="grid grid-cols-[repeat(2,auto)] gap-4 md:flex md:items-center md:gap-6">
                            {nav.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.href}
                                        className="group relative text-sm leading-none tracking-[-0.41px] lg:text-base lg:leading-none text-content dark:text-content-dark hover:text-accent-blue dark:hover:text-accent-blue-dark transition-all duration-300"
                                    >
                                        {item.label}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-blue dark:bg-accent-blue-dark transition-all duration-300 group-hover:w-full" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="sm:grid sm:grid-cols-2 lg:flex lg:items-center lg:justify-between">
                    <div className="pb-6 border-b border-border dark:border-border-dark mb-6 sm:col-span-2 md:pb-8 md:mb-8 lg:col-span-1 lg:order-2 lg:border-none lg:pb-0 lg:mb-0 transition-colors duration-300">
                        <ul ref={socialsRef} className="grid grid-cols-2 gap-3 max-w-max sm:grid-cols-4">
                            {socials.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`group flex items-center justify-center px-4 py-[9px] border rounded-[32px] lg:py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                                            item.icon
                                                ? 'text-content-muted dark:text-content-dark border-border-muted dark:border-border-dark-muted hover:border-accent-blue dark:hover:border-accent-blue-dark hover:text-accent-blue dark:hover:text-accent-blue-dark'
                                                : 'text-content-inverted dark:text-content-dark-inverted border-content dark:border-content-dark bg-content dark:bg-content-dark hover:bg-accent-blue dark:hover:bg-accent-blue-dark hover:border-accent-blue dark:hover:border-accent-blue-dark'
                                        }`}
                                    >
                                        {item.icon && (
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: item.icon,
                                                }}
                                                className="w-[14px] h-[14px] mr-2 lg:w-4 lg:h-4 transition-transform duration-300 group-hover:scale-110"
                                            />
                                        )}
                                        <span className="text-sm leading-none font-medium tracking-[-0.41px] uppercase lg:text-base lg:leading-none">
                                            {item.label}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="text-sm leading-none tracking-[-0.41px] sm:text-right lg:order-3 lg:text-base lg:leading-none text-content-muted dark:text-content-dark-muted transition-colors duration-300">
                        &copy; {currentYear} Personal Website. Todos los derechos
                        reservados.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
