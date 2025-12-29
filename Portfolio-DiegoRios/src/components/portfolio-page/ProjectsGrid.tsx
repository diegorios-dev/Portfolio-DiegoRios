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
    return (
        <section id="projects" className="py-8 md:py-16 lg:py-20">
            <div className="container">
                <div className="flex flex-col gap-6 lg:gap-8">
                    {items.map((project, index) => (
                        <a
                            key={index}
                            href={`/portfolio/${project.slug}`}
                            className="group relative rounded-3xl overflow-hidden bg-surface-subtle dark:bg-surface-dark-subtle transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                        >
                            <div className="relative h-[500px] overflow-hidden">
                                <img
                                    src={project.cover_image.src}
                                    alt={project.cover_image.alt}
                                    width={project.cover_image.width}
                                    height={project.cover_image.height}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    style={{ imageRendering: 'auto' }}
                                />
                                {/* Overlay con gradiente */}
                                <div 
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background: `linear-gradient(to bottom, transparent, ${project.theme}99)`
                                    }}
                                />
                            </div>
                            
                            <div className="p-6 lg:p-8">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-content dark:text-content-dark mb-3 group-hover:opacity-80 transition-all duration-300">
                                    {project.title}
                                </h3>
                                
                                <p className="text-sm md:text-base text-content-muted dark:text-content-dark-muted mb-4 line-clamp-2 transition-colors duration-300">
                                    {project.description.nodes[0]?.content[0]?.value}
                                </p>
                                
                                <div className="flex flex-wrap gap-2">
                                    {project.categories.map((category, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 text-xs md:text-sm rounded-full bg-surface-muted dark:bg-surface-dark-muted text-content-muted dark:text-content-dark font-medium transition-colors duration-300"
                                        >
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Indicador de acento de color */}
                            <div 
                                className="absolute top-0 left-0 w-1 h-full transition-all duration-300 group-hover:w-2"
                                style={{ backgroundColor: project.theme }}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsGrid;
