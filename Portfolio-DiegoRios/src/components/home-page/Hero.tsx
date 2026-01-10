import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContentManager from '../ContentManager';
import LinkedInIcon from '../../assets/icons/linkedin.svg?raw';

// Register plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const GitHubIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`;

const CheckIcon = `<svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 flex-shrink-0"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>`;

interface MediaData {
    alt: string;
    src: string;
    width: number;
    height: number;
}

interface RichTextData {
    nodes: any[];
}

interface Props {
    title: string;
    description: RichTextData;
    image: MediaData;
    valueProps?: string[];
} 

const HomeHero: React.FC<Props> = ({title, description, image, valueProps}) => {
    const sectionRef = useRef<HTMLElement>(null);
    const infoCardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLDivElement>(null);
    const valuePropRefs = useRef<(HTMLLIElement | null)[]>([]);
    const ctaRef = useRef<HTMLDivElement>(null);
    const socialsRef = useRef<HTMLUListElement>(null);
    const blobsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // Initial states
            gsap.set([infoCardRef.current, imageRef.current], { opacity: 0 });
            gsap.set(titleRef.current, { opacity: 0, y: 40, clipPath: 'inset(100% 0 0 0)' });
            gsap.set(descRef.current, { opacity: 0, y: 30 });
            gsap.set(valuePropRefs.current, { opacity: 0, x: -30 });
            gsap.set(ctaRef.current, { opacity: 0, y: 20 });
            gsap.set(socialsRef.current, { opacity: 0 });
            gsap.set(blobsRef.current, { scale: 0, opacity: 0 });

            // Animation sequence
            tl.to(infoCardRef.current, { opacity: 1, duration: 0.6 })
              .to(titleRef.current, { 
                  opacity: 1, 
                  y: 0, 
                  clipPath: 'inset(0% 0 0 0)', 
                  duration: 0.8 
              }, '-=0.3')
              .to(descRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
              .to(valuePropRefs.current, { 
                  opacity: 1, 
                  x: 0, 
                  duration: 0.5,
                  stagger: 0.1 
              }, '-=0.3')
              .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
              .to(socialsRef.current, { opacity: 1, duration: 0.5 }, '-=0.3')
              .to(imageRef.current, { 
                  opacity: 1, 
                  duration: 0.8,
                  ease: 'power2.out' 
              }, '-=0.8')
              .to(blobsRef.current, { 
                  scale: 1, 
                  opacity: 0.5, 
                  duration: 1.2,
                  stagger: 0.2,
                  ease: 'elastic.out(1, 0.5)' 
              }, '-=0.6');

            // Floating animation for blobs
            blobsRef.current.forEach((blob, i) => {
                if (blob) {
                    gsap.to(blob, {
                        y: i % 2 === 0 ? '+=20' : '-=20',
                        x: i % 2 === 0 ? '-=15' : '+=15',
                        duration: 3 + i * 0.5,
                        ease: 'sine.inOut',
                        repeat: -1,
                        yoyo: true,
                    });
                }
            });

            // Parallax effect on image
            if (imageRef.current) {
                gsap.to(imageRef.current.querySelector('img'), {
                    yPercent: 10,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);
    
    const socials = [
        {
            label: 'LinkedIn',
            icon: LinkedInIcon,
            href: 'https://www.linkedin.com/in/diego-rios-fullstack/',
        },
        {
            label: 'GitHub',
            icon: GitHubIcon,
            href: 'https://github.com/diegorios-dev',
        }
    ];

    const defaultValueProps = [
    'Resolución de problemas complejos con pensamiento sistémico',
    'Adaptabilidad a contextos y requerimientos cambiantes',
    'Entrega confiable: alineación de expectativas, plazos y calidad'
    ];

    const bullets = valueProps || defaultValueProps;

    return (
        <section ref={sectionRef} className="py-8 lg:pb-14 overflow-hidden">
            <div className="container">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr,3fr] lg:grid-cols-[500px,1fr] xl:grid-cols-[615px,1fr]">
                    {/* Info Card */}
                    <div 
                        ref={infoCardRef}
                        className="relative bg-surface-subtle dark:bg-surface-dark-subtle rounded-3xl p-6 overflow-hidden xl:p-10 dark:border dark:border-white/[0.06] transition-colors duration-300 hover:shadow-2xl hover:shadow-accent-blue/5 dark:hover:shadow-accent-blue-dark/10"
                    >
                        <div className="relative z-10 h-full flex flex-col items-start">
                            <h1 
                                ref={titleRef}
                                className="text-xl leading-[1.2] tracking-[-0.41px] mb-3 lg:text-[32px] lg:leading-[1.2] lg:mb-4 text-content dark:text-content-dark transition-colors duration-300"
                            >
                                {title}
                            </h1>
                            <div ref={descRef}>
                                <ContentManager
                                    items={description.nodes}
                                    className="text-sm leading-[1.5] tracking-[-0.41px] text-content-muted dark:text-content-dark-muted mb-5 lg:text-base lg:leading-[1.5] lg:mb-6 transition-colors duration-300"
                                />
                            </div>
                            
                            {/* Value Props */}
                            <ul className="space-y-2.5 mb-6 lg:mb-8">
                                {bullets.map((prop, index) => (
                                    <li 
                                        key={index} 
                                        ref={(el) => { valuePropRefs.current[index] = el; }}
                                        className="flex items-start gap-2.5 text-xs lg:text-sm text-content-muted dark:text-content-dark-muted group"
                                    >
                                        <span 
                                            dangerouslySetInnerHTML={{ __html: CheckIcon }} 
                                            className="mt-0.5 text-accent-blue dark:text-accent-blue-dark transition-transform duration-300 group-hover:scale-125" 
                                        />
                                        <span className="transition-colors duration-300 group-hover:text-content dark:group-hover:text-content-dark">{prop}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTAs */}
                            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 mb-8 lg:mb-10 w-full sm:w-auto">
                                <a
                                    href="/contact"
                                    className="relative flex items-center justify-center px-5 py-3.5 rounded-xl bg-accent-blue dark:bg-accent-blue-dark text-white text-sm font-medium transition-all duration-300 hover:scale-[1.05] shadow-lg shadow-accent-blue/20 dark:shadow-accent-blue-dark/20 overflow-hidden group"
                                >
                                    <span className="relative z-10">Iniciar proyecto</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-accent-blue-dark to-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </a>
                                <a
                                    href="/portfolio"
                                    className="relative flex items-center justify-center px-5 py-3.5 rounded-xl border border-border-muted dark:border-white/20 text-sm font-medium text-content-muted dark:text-content-dark-muted transition-all duration-300 hover:bg-content dark:hover:bg-content-dark hover:text-content-inverted dark:hover:text-content-dark-inverted hover:border-content dark:hover:border-content-dark overflow-hidden group"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Ver proyectos
                                        <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </a>
                            </div>

                            {/* Socials */}
                            <ul ref={socialsRef} className="flex items-center gap-4 mt-auto">
                                {socials.map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-content dark:text-content-dark transition-all duration-300 hover:text-accent-blue dark:hover:text-accent-blue-dark group"
                                            aria-label={`Visitar perfil de ${item.label}`}
                                        >
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: item.icon,
                                                }}
                                                className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                                            />
                                            <span className="text-sm leading-none tracking-[-0.41px] lg:text-base lg:leading-none relative">
                                                {item.label}
                                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-blue dark:bg-accent-blue-dark transition-all duration-300 group-hover:w-full" />
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Gradient Blobs */}
                        <div 
                            ref={(el) => { blobsRef.current[0] = el; }}
                            className="absolute top-0 right-0 w-[244px] h-[244px] translate-x-1/2 -translate-y-1/2 bg-accent-blue dark:bg-accent-blue-dark bg-blend-overlay rounded-full opacity-50 dark:opacity-40 blur-[100px] transition-opacity duration-500" 
                        />
                        <div 
                            ref={(el) => { blobsRef.current[1] = el; }}
                            className="absolute bottom-0 left-0 w-[244px] h-[244px] -translate-x-1/2 translate-y-1/2 bg-accent-gold dark:bg-accent-gold-dark bg-blend-overlay rounded-full opacity-50 dark:opacity-35 blur-[100px] xl:-translate-y-1/3 transition-opacity duration-500" 
                        />
                    </div>
                    {/* Image */}
                    <div 
                        ref={imageRef}
                        className="relative rounded-3xl overflow-hidden aspect-square md:aspect-[4/3] lg:aspect-[1.3] dark:border dark:border-white/[0.08] group"
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            width={image.width}
                            height={image.height}
                            className="size-full object-cover w-full h-full rounded-3xl mx-auto dark:saturate-[0.95] dark:contrast-[1.05] transition-all duration-700 group-hover:scale-105"
                            style={{ imageRendering: 'auto' }}
                        />
                        {/* Animated overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-accent-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        {/* Dark mode gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/30 to-transparent opacity-0 dark:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeHero;
