import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface Props {
    title: string;
    subtitle: string;
    backgroundImage: string;
}

const PortfolioHero: React.FC<Props> = ({ title, subtitle, backgroundImage }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // Initial states
            gsap.set(imageRef.current, { scale: 1.2, opacity: 0 });
            gsap.set(overlayRef.current, { opacity: 0 });
            gsap.set(titleRef.current, { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' });
            gsap.set(subtitleRef.current, { opacity: 0, y: 40 });
            gsap.set(ctaRef.current, { opacity: 0, y: 30, scale: 0.9 });

            // Animation sequence
            tl.to(imageRef.current, { 
                scale: 1, 
                opacity: 1, 
                duration: 1.2,
                ease: 'power2.out'
            })
            .to(overlayRef.current, { 
                opacity: 1, 
                duration: 0.8 
            }, '-=0.8')
            .to(titleRef.current, { 
                opacity: 1, 
                y: 0, 
                clipPath: 'inset(0% 0 0 0)',
                duration: 0.8 
            }, '-=0.4')
            .to(subtitleRef.current, { 
                opacity: 1, 
                y: 0, 
                duration: 0.6 
            }, '-=0.4')
            .to(ctaRef.current, { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.7)'
            }, '-=0.3');

            // Parallax effect on scroll
            gsap.to(imageRef.current, {
                yPercent: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]">
            <div className="container">
                <div className="relative rounded-3xl overflow-hidden">
                    {/* Imagen de fondo */}
                    <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
                        <img
                            ref={imageRef}
                            src={backgroundImage}
                            alt="Portfolio hero background"
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay oscuro */}
                        <div 
                            ref={overlayRef}
                            className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" 
                        />
                        
                        {/* Contenido */}
                        <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-12 lg:px-16">
                            <h1 
                                ref={titleRef}
                                className="text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4"
                            >
                                {title}
                            </h1>
                            
                            <p 
                                ref={subtitleRef}
                                className="text-white/90 text-base md:text-lg lg:text-xl max-w-md mb-8"
                            >
                                {subtitle}
                            </p>
                            
                            <a
                                ref={ctaRef}
                                href="#projects"
                                className="group inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full bg-white text-appText text-sm md:text-base font-medium transition-all duration-300 hover:bg-appGray-100 hover:shadow-lg hover:scale-105"
                            >
                                Ver Proyectos
                                <svg 
                                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M17 8l4 4m0 0l-4 4m4-4H3" 
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PortfolioHero;
