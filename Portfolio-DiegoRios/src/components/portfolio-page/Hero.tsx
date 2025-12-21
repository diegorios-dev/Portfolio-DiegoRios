interface Props {
    title: string;
    subtitle: string;
    backgroundImage: string;
}

const PortfolioHero: React.FC<Props> = ({ title, subtitle, backgroundImage }) => {
    return (
        <section className="relative pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]">
            <div className="container">
                <div className="relative rounded-3xl overflow-hidden">
                    {/* Imagen de fondo */}
                    <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
                        <img
                            src={backgroundImage}
                            alt="Portfolio hero background"
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay oscuro */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
                        
                        {/* Contenido */}
                        <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-12 lg:px-16">
                            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4">
                                {title}
                            </h1>
                            
                            <p className="text-white/90 text-base md:text-lg lg:text-xl max-w-md mb-8">
                                {subtitle}
                            </p>
                            
                            <a
                                href="#projects"
                                className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full bg-white text-appText text-sm md:text-base font-medium transition-all duration-300 hover:bg-appGray-100 hover:shadow-lg"
                            >
                                Ver Proyectos
                                <svg 
                                    className="w-4 h-4" 
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
