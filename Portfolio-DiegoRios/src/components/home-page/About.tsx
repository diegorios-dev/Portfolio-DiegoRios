import React, { useState, useMemo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContentManager from '../ContentManager';

// Register plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface RichTextData {
    nodes: any[];
}

interface WorkHistoryItem {
    company_name: string;
    job_title: string;
    duration: string;
    from?: {
        timestamp: number;
    };
    to?: {
        timestamp: number;
    };
    description: RichTextData;
}

interface Props {
    title: string;
    description: RichTextData;
    education_title: string;
    education_degrees: any[];
    work_history_title: string;
    work_history_items: WorkHistoryItem[];
}

const HomeAbout: React.FC<Props> = ({
    title,
    description,
    education_title,
    education_degrees,
    work_history_title,
    work_history_items,
}) => {
    const [degreesToShow, setDegreesToShow] = useState<number>(3);
    const [workHistoryItemsToShow, setWorkHistoryItemsToShow] =
        useState<number>(3);

    // Animation refs
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const educationRef = useRef<HTMLDivElement>(null);
    const workHistoryRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

    const visibleDegrees = useMemo(() => {
        return education_degrees.slice(0, degreesToShow);
    }, [degreesToShow, education_degrees]);

    const visibleWorkHistoryItems = useMemo(() => {
        return work_history_items.slice(0, workHistoryItemsToShow);
    }, [workHistoryItemsToShow, work_history_items]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const ctx = gsap.context(() => {
            // Title animation
            gsap.fromTo(titleRef.current, 
                { opacity: 0, x: -50 },
                { 
                    opacity: 1, 
                    x: 0, 
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 85%',
                    }
                }
            );

            // Description animation
            gsap.fromTo(descriptionRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: descriptionRef.current,
                        start: 'top 85%',
                    }
                }
            );

            // Education section animation with stagger
            if (educationRef.current) {
                const educationItems = educationRef.current.querySelectorAll('.degree-item');
                gsap.fromTo(educationItems,
                    { opacity: 0, y: 20, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: educationRef.current,
                            start: 'top 85%',
                        }
                    }
                );
            }

            // Work history animation with stagger
            if (workHistoryRef.current) {
                const workItems = workHistoryRef.current.querySelectorAll('.work-item');
                gsap.fromTo(workItems,
                    { opacity: 0, x: -20 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: workHistoryRef.current,
                            start: 'top 85%',
                        }
                    }
                );
            }

            // CTA animation
            gsap.fromTo(ctaRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: ctaRef.current,
                        start: 'top 90%',
                    }
                }
            );

            // Floating blobs animation
            blobRefs.current.forEach((blob, i) => {
                if (blob) {
                    gsap.to(blob, {
                        y: i % 2 === 0 ? '+=30' : '-=30',
                        x: i % 2 === 0 ? '+=20' : '-=20',
                        duration: 4 + i,
                        ease: 'sine.inOut',
                        repeat: -1,
                        yoyo: true,
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [visibleDegrees, visibleWorkHistoryItems]);

    return (
        <section ref={sectionRef} className="pb-10 lg:pb-14 overflow-hidden">
            <div className="relative container">
                <div className="relative z-10 md:flex md:items-start md:justify-between md:gap-16 lg:gap-20">
                    <div ref={titleRef} className="flex items-center mb-[14px] md:mt-4">
                        <div className="w-1.5 h-1.5 bg-content dark:bg-content-dark rounded-full mr-2 lg:w-2.5 lg:h-2.5 lg:mr-4 lg:mt-1 transition-colors duration-300 animate-pulse" />
                        <h2 className="text-lg leading-none tracking-[-0.41px] font-Helvetica lg:text-[32px] lg:leading-none text-content dark:text-content-dark transition-colors duration-300">
                            {title}
                        </h2>
                    </div>
                    <div>
                        <div ref={descriptionRef}>
                            <ContentManager
                                items={description.nodes}
                                className="text-sm leading-[1.4] tracking-[-0.41px] text-content-muted dark:text-content-dark-muted pb-6 border-b border-border dark:border-border-dark mb-6 md:max-w-[761px] lg:text-base lg:leading-[1.4] lg:pb-8 lg:mb-8 transition-colors duration-300"
                            />
                        </div>
                        <div ref={educationRef} className="pb-6 border-b border-border dark:border-border-dark mb-6 lg:pb-8 lg:mb-8 transition-colors duration-300">
                            <div className="leading-none font-medium tracking-[-0.41px] mb-5 lg:text-xl lg:leading-none text-content dark:text-content-dark transition-colors duration-300">
                                {education_title}
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {visibleDegrees.map((degree, index) => (
                                    <div 
                                        key={index} 
                                        className="degree-item flex text-sm leading-none tracking-[-0.41px] text-content-muted dark:text-content-dark px-4 py-3 border border-border-muted dark:border-border-dark-muted rounded-[32px] lg:text-base lg:leading-none transition-all duration-300 hover:border-accent-blue dark:hover:border-accent-blue-dark hover:scale-105 hover:shadow-lg cursor-default"
                                    >
                                        {typeof degree === 'string' 
                                            ? degree 
                                            : `${degree.degree} - ${degree.university} (${degree.year})`
                                        }
                                    </div>
                                ))}
                                {visibleDegrees.length < education_degrees.length && (
                                    <button
                                        className="flex px-4 py-3 text-sm leading-none tracking-[-0.41px] text-white bg-content dark:bg-content-dark dark:text-content-dark-inverted font-medium rounded-[32px] lg:text-base lg:leading-none transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                        onClick={() => setDegreesToShow(999)}
                                    >
                                        See all
                                    </button>
                                )}
                            </div>
                        </div>
                        <div ref={workHistoryRef} className="pb-6 border-b border-border dark:border-border-dark lg:pb-8 lg:mb-8 transition-colors duration-300">
                            <div className="leading-none font-medium tracking-[-0.41px] mb-5 lg:text-xl lg:leading-none text-content dark:text-content-dark transition-colors duration-300">
                                {work_history_title}
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {visibleWorkHistoryItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="work-item flex items-center text-sm leading-none tracking-[-0.41px] text-content-muted dark:text-content-dark px-4 py-3 border border-border-muted dark:border-border-dark-muted rounded-[32px] lg:text-base lg:leading-none transition-all duration-300 hover:border-accent-gold dark:hover:border-accent-gold-dark hover:scale-105 hover:shadow-lg cursor-default"
                                    >
                                        <span>{item.company_name}</span>
                                        <span className="w-[3px] h-[3px] rounded-full bg-content-muted dark:bg-content-dark-muted mx-1.5 lg:mx-2 transition-colors duration-300" />
                                        <span>
                                            {item.from?.timestamp
                                                ? new Date(
                                                      item.from.timestamp,
                                                  ).getFullYear()
                                                : 'Present'}
                                        </span>
                                    </div>
                                ))}
                                {visibleWorkHistoryItems.length < work_history_items.length && (
                                    <button
                                        className="flex px-4 py-3 text-sm leading-none tracking-[-0.41px] text-white bg-content dark:bg-content-dark dark:text-content-dark-inverted font-medium rounded-[32px] lg:text-base lg:leading-none transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                        onClick={() => setWorkHistoryItemsToShow(999)}
                                    >
                                        See all
                                    </button>
                                )}
                            </div>
                        </div>
                        
                        {/* Botón para ir a la página About */}
                        <div ref={ctaRef} className="mt-6 lg:mt-8">
                            <a
                                href="/about"
                                className="group inline-flex items-center gap-2 px-6 py-3 text-sm md:text-base leading-none tracking-[-0.41px] font-medium text-content dark:text-content-dark border-2 border-content dark:border-content-dark rounded-full transition-all duration-300 hover:bg-content dark:hover:bg-content-dark hover:text-content-inverted dark:hover:text-content-dark-inverted hover:scale-105 hover:shadow-xl"
                            >
                                Ver Mas
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
            <div 
                ref={(el) => { blobRefs.current[0] = el; }}
                className="absolute top-[40%] -translate-y-1/2 left-0 w-[296px] h-[296px] rounded-full opacity-20 dark:opacity-30 blur-[120px] bg-blend-overlay bg-accent-gold dark:bg-accent-gold-dark pointer-events-none max-md:hidden transition-opacity duration-500" 
            />
            <div 
                ref={(el) => { blobRefs.current[1] = el; }}
                className="absolute top-[80%] -translate-y-1/2 -left-[15%] w-[296px] h-[296px] rounded-full opacity-20 dark:opacity-30 blur-[120px] bg-blend-overlay bg-accent-blue dark:bg-accent-blue-dark pointer-events-none max-md:hidden transition-opacity duration-500" 
            />
        </section>
    );
};

export default HomeAbout;
