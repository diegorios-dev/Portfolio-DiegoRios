import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Animation presets
export const ANIMATION_PRESETS = {
    fadeInUp: {
        from: { opacity: 0, y: 60 },
        to: { opacity: 1, y: 0 },
    },
    fadeInDown: {
        from: { opacity: 0, y: -60 },
        to: { opacity: 1, y: 0 },
    },
    fadeInLeft: {
        from: { opacity: 0, x: -60 },
        to: { opacity: 1, x: 0 },
    },
    fadeInRight: {
        from: { opacity: 0, x: 60 },
        to: { opacity: 1, x: 0 },
    },
    scaleIn: {
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1 },
    },
    rotateIn: {
        from: { opacity: 0, rotation: -15, y: 30 },
        to: { opacity: 1, rotation: 0, y: 0 },
    },
    blurIn: {
        from: { opacity: 0, filter: 'blur(10px)' },
        to: { opacity: 1, filter: 'blur(0px)' },
    },
};

// Easing functions
export const EASINGS = {
    smooth: 'power2.out',
    bounce: 'back.out(1.7)',
    elastic: 'elastic.out(1, 0.3)',
    expo: 'expo.out',
    circ: 'circ.out',
    power3: 'power3.out',
    power4: 'power4.out',
};

interface UseScrollAnimationOptions {
    trigger?: string;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
    once?: boolean;
    duration?: number;
    delay?: number;
    stagger?: number;
    ease?: string;
    preset?: keyof typeof ANIMATION_PRESETS;
}

/**
 * Hook for scroll-triggered animations
 */
export const useScrollAnimation = <T extends HTMLElement>(
    options: UseScrollAnimationOptions = {}
) => {
    const ref = useRef<T>(null);
    const {
        start = 'top 85%',
        end = 'bottom 20%',
        scrub = false,
        markers = false,
        once = true,
        duration = 1,
        delay = 0,
        stagger = 0,
        ease = EASINGS.power3,
        preset = 'fadeInUp',
    } = options;

    useEffect(() => {
        if (!ref.current || typeof window === 'undefined') return;

        const element = ref.current;
        const animationPreset = ANIMATION_PRESETS[preset];

        // Set initial state
        gsap.set(element, animationPreset.from);

        const animation = gsap.to(element, {
            ...animationPreset.to,
            duration,
            delay,
            ease,
            scrollTrigger: {
                trigger: element,
                start,
                end,
                scrub,
                markers,
                toggleActions: once ? 'play none none none' : 'play reverse play reverse',
            },
        });

        return () => {
            animation.kill();
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [start, end, scrub, markers, once, duration, delay, ease, preset]);

    return ref;
};

/**
 * Hook for staggered children animations on scroll
 */
export const useStaggerAnimation = <T extends HTMLElement>(
    childSelector: string,
    options: UseScrollAnimationOptions = {}
) => {
    const containerRef = useRef<T>(null);
    const {
        start = 'top 85%',
        duration = 0.8,
        stagger = 0.1,
        ease = EASINGS.power3,
        preset = 'fadeInUp',
    } = options;

    useEffect(() => {
        if (!containerRef.current || typeof window === 'undefined') return;

        const container = containerRef.current;
        const children = container.querySelectorAll(childSelector);
        const animationPreset = ANIMATION_PRESETS[preset];

        // Set initial state for all children
        gsap.set(children, animationPreset.from);

        const animation = gsap.to(children, {
            ...animationPreset.to,
            duration,
            stagger,
            ease,
            scrollTrigger: {
                trigger: container,
                start,
            },
        });

        return () => {
            animation.kill();
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === container) {
                    trigger.kill();
                }
            });
        };
    }, [childSelector, start, duration, stagger, ease, preset]);

    return containerRef;
};

/**
 * Hook for parallax effects
 */
export const useParallax = <T extends HTMLElement>(
    speed: number = 0.5,
    direction: 'vertical' | 'horizontal' = 'vertical'
) => {
    const ref = useRef<T>(null);

    useEffect(() => {
        if (!ref.current || typeof window === 'undefined') return;

        const element = ref.current;
        const property = direction === 'vertical' ? 'y' : 'x';
        const distance = 100 * speed;

        gsap.to(element, {
            [property]: distance,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [speed, direction]);

    return ref;
};

/**
 * Hook for entrance animations (no scroll trigger)
 */
export const useEntranceAnimation = <T extends HTMLElement>(
    options: {
        delay?: number;
        duration?: number;
        ease?: string;
        preset?: keyof typeof ANIMATION_PRESETS;
    } = {}
) => {
    const ref = useRef<T>(null);
    const { delay = 0, duration = 1, ease = EASINGS.power3, preset = 'fadeInUp' } = options;

    useEffect(() => {
        if (!ref.current || typeof window === 'undefined') return;

        const element = ref.current;
        const animationPreset = ANIMATION_PRESETS[preset];

        gsap.fromTo(
            element,
            animationPreset.from,
            {
                ...animationPreset.to,
                duration,
                delay,
                ease,
            }
        );
    }, [delay, duration, ease, preset]);

    return ref;
};

/**
 * Hook for magnetic hover effect
 */
export const useMagneticEffect = <T extends HTMLElement>(strength: number = 0.3) => {
    const ref = useRef<T>(null);

    useEffect(() => {
        if (!ref.current || typeof window === 'undefined') return;

        const element = ref.current;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) * strength;
            const deltaY = (e.clientY - centerY) * strength;

            gsap.to(element, {
                x: deltaX,
                y: deltaY,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)',
            });
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    return ref;
};

/**
 * Hook for text reveal animation (split text)
 */
export const useTextReveal = <T extends HTMLElement>(
    options: {
        delay?: number;
        duration?: number;
        stagger?: number;
        ease?: string;
    } = {}
) => {
    const ref = useRef<T>(null);
    const { delay = 0, duration = 0.8, stagger = 0.02, ease = EASINGS.power4 } = options;

    useEffect(() => {
        if (!ref.current || typeof window === 'undefined') return;

        const element = ref.current;
        const text = element.textContent || '';
        
        // Split text into spans
        element.innerHTML = text
            .split('')
            .map(char => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`)
            .join('');

        const chars = element.querySelectorAll('.char');

        gsap.set(chars, { opacity: 0, y: 20, rotateX: -90 });

        gsap.to(chars, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration,
            stagger,
            delay,
            ease,
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [delay, duration, stagger, ease]);

    return ref;
};

/**
 * Utility function for GSAP timeline animations
 */
export const createTimeline = (options?: gsap.TimelineVars) => {
    return gsap.timeline(options);
};

export default {
    useScrollAnimation,
    useStaggerAnimation,
    useParallax,
    useEntranceAnimation,
    useMagneticEffect,
    useTextReveal,
    createTimeline,
    ANIMATION_PRESETS,
    EASINGS,
};
