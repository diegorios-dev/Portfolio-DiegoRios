import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface MediaData {
    alt: string;
    src: string;
    width: number;
    height: number;
}

interface RichTextData {
    nodes: any[];
}

interface PortfolioItem {
    slug: string;
    title: string;
    theme: string;
    cover_image: MediaData;
    categories: string[];
    description: RichTextData;
}

interface Props {
    items: PortfolioItem[];
}

const ProjectsGrid: React.FC<Props> = ({ items }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const ctx = gsap.context(() => {
            // Animate each card on scroll
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                // Staggered entrance animation
                gsap.fromTo(card,
                    { 
                        opacity: 0, 
                        y: 80,
                        scale: 0.95,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        }
                    }
                );

                // Animate the color indicator on scroll
                const indicator = card.querySelector('.color-indicator');
                if (indicator) {
                    gsap.fromTo(indicator,
                        { height: '0%' },
                        {
                            height: '100%',
                            duration: 0.6,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 80%',
                            }
                        }
                    );
                }

                // Animate categories
                const categories = card.querySelectorAll('.category-tag');
                gsap.fromTo(categories,
                    { opacity: 0, y: 10, scale: 0.9 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.4,
                        stagger: 0.05,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 75%',
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [items]);

    return (
        <section ref={sectionRef} id="projects" className="py-8 md:py-16 lg:py-20 overflow-hidden">
            <div className="container">
                <div className="flex flex-col gap-6 lg:gap-8">
                    {items.map((project, index) => (
                        <a
                            key={index}
                            ref={(el) => { cardsRef.current[index] = el; }}
                            href={`/portfolio/${project.slug}`}
                            className="group relative rounded-3xl overflow-hidden bg-surface-subtle dark:bg-surface-dark-subtle transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                        >
                            <div className="relative h-[500px] overflow-hidden">
                                <img
                                    src={project.cover_image.src}
                                    alt={project.cover_image.alt}
                                    width={project.cover_image.width}
                                    height={project.cover_image.height}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    style={{ imageRendering: 'auto' }}
                                />
                                {/* Overlay con gradiente */}
                                <div 
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `linear-gradient(to bottom, transparent, ${project.theme}99)`
                                    }}
                                />
                                {/* Shine effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                            </div>
                            
                            <div className="p-6 lg:p-8">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-content dark:text-content-dark mb-3 transition-all duration-300 group-hover:translate-x-2">
                                    {project.title}
                                </h3>
                                
                                <p className="text-sm md:text-base text-content-muted dark:text-content-dark-muted mb-4 line-clamp-2 transition-colors duration-300">
                                    {project.description.nodes[0]?.content[0]?.value}
                                </p>
                                
                                <div className="flex flex-wrap gap-2">
                                    {project.categories.map((category, idx) => (
                                        <span
                                            key={idx}
                                            className="category-tag px-3 py-1 text-xs md:text-sm rounded-full bg-surface-muted dark:bg-surface-dark-muted text-content-muted dark:text-content-dark font-medium transition-all duration-300 hover:scale-105"
                                        >
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Indicador de acento de color */}
                            <div 
                                className="color-indicator absolute top-0 left-0 w-1 transition-all duration-300 group-hover:w-2"
                                style={{ backgroundColor: project.theme }}
                            />
                            
                            {/* Arrow indicator */}
                            <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 w-12 h-12 rounded-full flex items-center justify-center bg-content dark:bg-content-dark text-content-inverted dark:text-content-dark-inverted opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsGrid;
