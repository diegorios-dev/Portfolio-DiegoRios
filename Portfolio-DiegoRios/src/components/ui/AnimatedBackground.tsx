import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    element: HTMLDivElement;
}

interface Props {
    count?: number;
    color?: string;
    className?: string;
}

const AnimatedBackground: React.FC<Props> = ({
    count = 30,
    color = 'accent-blue',
    className = '',
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>();

    useEffect(() => {
        if (!containerRef.current || typeof window === 'undefined') return;

        const container = containerRef.current;
        const particles: Particle[] = [];

        // Create particles
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 4 + 2;
            
            particle.className = `absolute rounded-full bg-${color} dark:bg-${color}-dark pointer-events-none`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            const x = Math.random() * container.offsetWidth;
            const y = Math.random() * container.offsetHeight;
            const speedX = (Math.random() - 0.5) * 0.5;
            const speedY = (Math.random() - 0.5) * 0.5;
            const opacity = Math.random() * 0.5 + 0.1;

            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.opacity = `${opacity}`;

            container.appendChild(particle);

            particles.push({
                x,
                y,
                size,
                speedX,
                speedY,
                opacity,
                element: particle,
            });
        }

        particlesRef.current = particles;

        // Animate particles
        const animate = () => {
            particles.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Bounce off edges
                if (particle.x <= 0 || particle.x >= container.offsetWidth) {
                    particle.speedX *= -1;
                }
                if (particle.y <= 0 || particle.y >= container.offsetHeight) {
                    particle.speedY *= -1;
                }

                // Apply position
                particle.element.style.left = `${particle.x}px`;
                particle.element.style.top = `${particle.y}px`;
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Mouse interaction
        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            particles.forEach(particle => {
                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    particle.speedX -= (dx / distance) * force * 0.5;
                    particle.speedY -= (dy / distance) * force * 0.5;
                }
            });
        };

        container.addEventListener('mousemove', handleMouseMove);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            container.removeEventListener('mousemove', handleMouseMove);
            particles.forEach(p => p.element.remove());
        };
    }, [count, color]);

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
            aria-hidden="true"
        />
    );
};

// Floating geometric shapes background
export const FloatingShapes: React.FC<{ className?: string }> = ({ className = '' }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || typeof window === 'undefined') return;

        const shapes = containerRef.current.querySelectorAll('.floating-shape');
        
        shapes.forEach((shape, index) => {
            gsap.to(shape, {
                y: `${Math.random() * 40 - 20}`,
                x: `${Math.random() * 40 - 20}`,
                rotation: Math.random() * 360,
                duration: 5 + index * 0.5,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
            });
        });
    }, []);

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
            aria-hidden="true"
        >
            {/* Circle */}
            <div className="floating-shape absolute top-[10%] left-[10%] w-20 h-20 rounded-full border-2 border-accent-blue/20 dark:border-accent-blue-dark/20" />
            
            {/* Square */}
            <div className="floating-shape absolute top-[20%] right-[15%] w-16 h-16 border-2 border-accent-gold/20 dark:border-accent-gold-dark/20 rotate-45" />
            
            {/* Triangle (using CSS) */}
            <div 
                className="floating-shape absolute bottom-[30%] left-[20%] w-0 h-0"
                style={{
                    borderLeft: '20px solid transparent',
                    borderRight: '20px solid transparent',
                    borderBottom: '35px solid rgba(59, 130, 246, 0.15)',
                }}
            />
            
            {/* Small circles */}
            <div className="floating-shape absolute top-[60%] right-[10%] w-8 h-8 rounded-full bg-accent-blue/10 dark:bg-accent-blue-dark/10" />
            <div className="floating-shape absolute bottom-[20%] right-[30%] w-12 h-12 rounded-full bg-accent-gold/10 dark:bg-accent-gold-dark/10" />
            
            {/* Lines */}
            <div className="floating-shape absolute top-[40%] left-[5%] w-24 h-0.5 bg-gradient-to-r from-accent-blue/20 to-transparent dark:from-accent-blue-dark/20" />
            <div className="floating-shape absolute bottom-[40%] right-[5%] w-32 h-0.5 bg-gradient-to-l from-accent-gold/20 to-transparent dark:from-accent-gold-dark/20" />
            
            {/* Dots pattern */}
            <div className="floating-shape absolute top-[70%] left-[40%] grid grid-cols-3 gap-2">
                {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-content/10 dark:bg-content-dark/10" />
                ))}
            </div>
        </div>
    );
};

// Gradient orbs background
export const GradientOrbs: React.FC<{ className?: string }> = ({ className = '' }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || typeof window === 'undefined') return;

        const orbs = containerRef.current.querySelectorAll('.gradient-orb');
        
        orbs.forEach((orb, index) => {
            gsap.to(orb, {
                x: `${Math.random() * 100 - 50}`,
                y: `${Math.random() * 100 - 50}`,
                scale: 0.8 + Math.random() * 0.4,
                duration: 8 + index * 2,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
            });
        });
    }, []);

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
            aria-hidden="true"
        >
            <div className="gradient-orb absolute -top-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-accent-blue/20 dark:bg-accent-blue-dark/30 blur-[100px]" />
            <div className="gradient-orb absolute -bottom-1/4 -right-1/4 w-[400px] h-[400px] rounded-full bg-accent-gold/20 dark:bg-accent-gold-dark/30 blur-[100px]" />
            <div className="gradient-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-purple-500/10 dark:bg-purple-400/20 blur-[80px]" />
        </div>
    );
};

export default AnimatedBackground;
