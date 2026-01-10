import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { A11y, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';
import classNames from 'classnames';
import ContentManager from '../ContentManager';
import './portfolio.css';
import 'swiper/css';

// Register plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface RichTextData {
    nodes: any[];
}

interface MediaData {
    alt: string;
    src: string;
    width: number;
    height: number;
}

interface PortfolioItem {
    slug: string;
    title: string;
    cover_image: MediaData;
    description: RichTextData;
    categories: string[];
    theme?: string;
    gallery?: MediaData[];
}

interface Props {
    title: string;
    description: RichTextData;
    items: PortfolioItem[];
}

SwiperCore.use([A11y, Pagination]);

const sliderOptions = {
    slidesPerView: 1,
    watchOverflow: true,
    spaceBetween: 12,
};

const HomePortfolio: React.FC<Props> = ({
    title,
    description,
    items,
}) => {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: 'top 85%',
                    }
                }
            );

            // Staggered card animations
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                gsap.fromTo(card,
                    { 
                        opacity: 0, 
                        y: 60,
                        scale: 0.95
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        delay: index * 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [items]);

    return (
        <section ref={sectionRef} className="pb-10 lg:pb-14 overflow-hidden">
            <div className="container">
                <div ref={headerRef} className="mb-8 md:flex md:items-start md:justify-between md:gap-16 lg:gap-20 lg:mb-10">
                    <div className="flex items-center mb-[14px] md:mt-4">
                        <div className="w-1.5 h-1.5 bg-content dark:bg-content-dark rounded-full mr-2 lg:w-2.5 lg:h-2.5 lg:mr-4 lg:mt-1 transition-colors duration-300" />
                        <h2 className="text-lg leading-none tracking-[-0.41px] font-Helvetica lg:text-[32px] lg:leading-none text-content dark:text-content-dark transition-colors duration-300">
                            {title}
                        </h2>
                    </div>
                    <div>
                        <ContentManager
                            items={description.nodes}
                            className="text-sm leading-[1.4] tracking-[-0.41px] text-content-muted dark:text-content-dark-muted md:max-w-[761px] lg:text-base lg:leading-[1.4] transition-colors duration-300"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-4 xl:grid-cols-[repeat(16,1fr)]">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => { cardsRef.current[index] = el; }}
                            className={classNames(
                                'portfolio-card flex flex-col rounded-3xl p-6 lg:p-8 lg:pb-4 transition-all duration-500 hover:shadow-2xl',
                                index % 2 === 2 || index % 3 === 0
                                    ? 'xl:col-span-7'
                                    : 'xl:col-span-9',
                            )}
                            style={{ backgroundColor: item.theme }}
                        >
                            <h3 className="leading-none tracking-[-0.41px] text-white mb-5 lg:text-xl lg:leading-none lg:mb-6">
                                {item.title}
                            </h3>
                            <a
                                href={`/portfolio/${item.slug}`}
                                className="group relative flex mb-auto w-full xl:flex-1"
                            >
                                <Swiper
                                    {...sliderOptions}
                                    pagination={{
                                        el: `.homePortfolio--galleryPagination_${index}`,
                                    }}
                                    className="w-full rounded-3xl overflow-hidden"
                                >
                                    {item.gallery &&
                                        item.gallery.map(
                                            (galleryItem, galleryIndex) => (
                                                <SwiperSlide
                                                    key={galleryIndex}
                                                    className="w-full"
                                                >
                                                    <img
                                                        src={galleryItem.src}
                                                        alt={galleryItem.alt}
                                                        width={galleryItem.width}
                                                        height={galleryItem.height}
                                                        loading="lazy"
                                                        className={classNames(
                                                            'size-full aspect-[1.45] object-cover rounded-3xl overflow-hidden',
                                                            index % 2 === 2 ||
                                                                index % 3 === 0
                                                                ? 'xl:aspect-[1.45]'
                                                                : 'xl:aspect-[1.84]',
                                                        )}
                                                        style={{ imageRendering: 'auto' }}
                                                    />
                                                </SwiperSlide>
                                            ),
                                        )}
                                </Swiper>
                                <div
                                    className="absolute z-10 top-0 left-0 w-full h-full rounded-3xl flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100"
                                    style={{
                                        background:
                                            'radial-gradient(50% 50% at 50% 50%, rgba(217, 217, 217, 0) 0%, #FFFFFF 100%)',
                                    }}
                                >
                                    <div className="px-6 py-4 bg-appText rounded-[32px] leading-none font-medium tracking-[-0.41px] text-white">
                                        Ver caso
                                    </div>
                                </div>
                            </a>
                            {item.gallery && item.gallery.length > 0 && (
                                <div
                                    className={`homePortfolio--galleryPagination homePortfolio--galleryPagination_${index} mt-6 lg:mt-8`}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomePortfolio;
