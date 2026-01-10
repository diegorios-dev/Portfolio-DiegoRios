import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CursorState {
    isHovering: boolean;
    isClicking: boolean;
    text: string;
}

const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorTextRef = useRef<HTMLSpanElement>(null);
    const [cursorState, setCursorState] = useState<CursorState>({
        isHovering: false,
        isClicking: false,
        text: '',
    });
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile || typeof window === 'undefined') return;

        const cursor = cursorRef.current;
        const cursorDot = cursorDotRef.current;
        if (!cursor || !cursorDot) return;

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            setIsVisible(true);

            // Move dot immediately
            gsap.to(cursorDot, {
                x: mouseX,
                y: mouseY,
                duration: 0.1,
            });
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        // Smooth cursor follow
        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;

            gsap.set(cursor, {
                x: cursorX,
                y: cursorY,
            });

            requestAnimationFrame(animateCursor);
        };

        // Interactive elements handlers
        const handleElementEnter = (e: Event) => {
            const target = e.target as HTMLElement;
            const cursorText = target.dataset.cursorText || '';
            
            setCursorState(prev => ({ 
                ...prev, 
                isHovering: true,
                text: cursorText 
            }));

            gsap.to(cursor, {
                scale: 2.5,
                duration: 0.3,
                ease: 'power2.out',
            });

            gsap.to(cursorDot, {
                scale: 0,
                duration: 0.3,
            });
        };

        const handleElementLeave = () => {
            setCursorState(prev => ({ 
                ...prev, 
                isHovering: false,
                text: '' 
            }));

            gsap.to(cursor, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
            });

            gsap.to(cursorDot, {
                scale: 1,
                duration: 0.3,
            });
        };

        const handleMouseDown = () => {
            setCursorState(prev => ({ ...prev, isClicking: true }));
            gsap.to(cursor, {
                scale: cursorState.isHovering ? 2 : 0.8,
                duration: 0.1,
            });
        };

        const handleMouseUp = () => {
            setCursorState(prev => ({ ...prev, isClicking: false }));
            gsap.to(cursor, {
                scale: cursorState.isHovering ? 2.5 : 1,
                duration: 0.1,
            });
        };

        // Add event listeners
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        // Add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, [data-cursor-hover], input, textarea, [role="button"]'
        );

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleElementEnter);
            el.addEventListener('mouseleave', handleElementLeave);
        });

        // Start animation loop
        animateCursor();

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);

            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleElementEnter);
                el.removeEventListener('mouseleave', handleElementLeave);
            });
        };
    }, [isMobile, cursorState.isHovering]);

    if (isMobile) return null;

    return (
        <>
            {/* Main cursor ring */}
            <div
                ref={cursorRef}
                className={`fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transform: 'translate(-50%, -50%)' }}
            >
                <div 
                    className={`w-full h-full rounded-full border-2 border-white flex items-center justify-center transition-all duration-300 ${
                        cursorState.isHovering ? 'bg-white/10' : ''
                    }`}
                >
                    {cursorState.text && (
                        <span 
                            ref={cursorTextRef}
                            className="text-[8px] font-medium uppercase tracking-wider text-white whitespace-nowrap"
                        >
                            {cursorState.text}
                        </span>
                    )}
                </div>
            </div>
            
            {/* Cursor dot */}
            <div
                ref={cursorDotRef}
                className={`fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transform: 'translate(-50%, -50%)' }}
            />
            
            {/* Hide default cursor */}
            <style>{`
                @media (min-width: 768px) {
                    * {
                        cursor: none !important;
                    }
                }
            `}</style>
        </>
    );
};

export default CustomCursor;
