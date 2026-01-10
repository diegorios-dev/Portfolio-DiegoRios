import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import classNames from 'classnames';

import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TitleProps {
    title: string;
    titleClassName?: string;
    className?: string;
    animationType?: 'scroll' | 'split' | 'wave' | 'glitch' | 'reveal';
    delay?: number;
}

const AnimatedTitle: React.FC<TitleProps> = ({
    title,
    titleClassName = '',
    className = '',
    animationType = 'scroll',
    delay = 0,
}) => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!titleRef.current || typeof window === 'undefined') return;

        const ctx = gsap.context(() => {
            switch (animationType) {
                case 'scroll':
                    // Original scroll animation
                    const containerWidth = document.querySelector('.container')?.clientWidth || 0;
                    gsap.to(titleRef.current, {
                        x: containerWidth - (titleRef.current?.clientWidth || 0),
                        scrollTrigger: {
                            start: 'top left',
                            end: 'bottom right',
                            scrub: 1,
                        },
                    });
                    break;

                case 'split':
                    // Split text animation
                    if (titleRef.current) {
                        const text = titleRef.current.textContent || '';
                        titleRef.current.innerHTML = text
                            .split('')
                            .map((char, i) => 
                                `<span class="char inline-block" style="animation-delay: ${i * 0.03}s">${char === ' ' ? '&nbsp;' : char}</span>`
                            )
                            .join('');

                        const chars = titleRef.current.querySelectorAll('.char');
                        gsap.set(chars, { opacity: 0, y: 50, rotateX: -90 });

                        gsap.to(chars, {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            duration: 0.6,
                            stagger: 0.03,
                            delay,
                            ease: 'back.out(1.7)',
                            scrollTrigger: {
                                trigger: titleRef.current,
                                start: 'top 85%',
                            },
                        });
                    }
                    break;

                case 'wave':
                    // Wave animation
                    if (titleRef.current) {
                        const text = titleRef.current.textContent || '';
                        titleRef.current.innerHTML = text
                            .split('')
                            .map(char => `<span class="char inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
                            .join('');

                        const chars = titleRef.current.querySelectorAll('.char');
                        
                        gsap.fromTo(chars,
                            { y: 0 },
                            {
                                y: -10,
                                duration: 0.3,
                                stagger: {
                                    each: 0.05,
                                    repeat: -1,
                                    yoyo: true,
                                },
                                ease: 'sine.inOut',
                            }
                        );
                    }
                    break;

                case 'glitch':
                    // Glitch effect
                    if (titleRef.current) {
                        const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
                        
                        tl.to(titleRef.current, {
                            skewX: 5,
                            duration: 0.1,
                        })
                        .to(titleRef.current, {
                            skewX: -5,
                            duration: 0.1,
                        })
                        .to(titleRef.current, {
                            skewX: 0,
                            duration: 0.1,
                        })
                        .to(titleRef.current, {
                            opacity: 0.8,
                            duration: 0.05,
                        })
                        .to(titleRef.current, {
                            opacity: 1,
                            duration: 0.05,
                        });
                    }
                    break;

                case 'reveal':
                    // Clip-path reveal
                    gsap.fromTo(titleRef.current,
                        { 
                            clipPath: 'inset(0 100% 0 0)',
                            opacity: 0 
                        },
                        {
                            clipPath: 'inset(0 0% 0 0)',
                            opacity: 1,
                            duration: 1,
                            delay,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: titleRef.current,
                                start: 'top 85%',
                            },
                        }
                    );
                    break;
            }
        }, containerRef);

        // Intersection observer for visibility
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            ctx.revert();
            observer.disconnect();
        };
    }, [animationType, delay, title]);

    return (
        <div ref={containerRef} className={classNames('flex overflow-hidden', className)}>
            <h1
                ref={titleRef}
                className={classNames(
                    'transition-colors duration-300',
                    titleClassName,
                    { 'opacity-0': !isVisible && animationType !== 'scroll' }
                )}
            >
                {title}
            </h1>
        </div>
    );
};

export default AnimatedTitle;
