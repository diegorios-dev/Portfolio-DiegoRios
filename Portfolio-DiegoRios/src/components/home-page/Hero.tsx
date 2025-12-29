import ContentManager from '../ContentManager';
import LinkedInIcon from '../../assets/icons/linkedin.svg?raw';

const GitHubIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`;

interface MediaData {
    alt: string;
    src: string;
    width: number;
    height: number;
}

interface RichTextData {
    nodes: any[];
}

interface Props {
    title: string;
    description: RichTextData;
    image: MediaData;
} 

const HomeHero: React.FC<Props> = ({title,description,image}) => {
    
    const socials = [
        {
            label: 'LinkedIn',
            icon: LinkedInIcon,
            href: 'https://www.linkedin.com/in/diego-rios-fullstack/',
        },
        {
            label: 'Github',
            icon: GitHubIcon,
            href: 'https://github.com/diego-rios-fullstack/',
        }

    ];

    return (
        <section className="py-8 lg:pb-14">
            <div className="container">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr,3fr] lg:grid-cols-[500px,1fr] xl:grid-cols-[615px,1fr]">
                    {/* Info Card */}
                    <div className="relative bg-surface-subtle dark:bg-surface-dark-subtle rounded-3xl p-6 overflow-hidden xl:p-10 dark:border dark:border-white/[0.06] transition-colors duration-300">
                        <div className="relative z-10 h-full flex flex-col items-start">
                            <h1 className="leading-[1.2] tracking-[-0.41px] mb-2.5 lg:text-[34px] lg:leading-[1.2] lg:mb-4 text-content dark:text-content-dark transition-colors duration-300">
                                {title}
                            </h1>
                            <ContentManager
                                items={description.nodes}
                                className="text-xs leading-[1.4] tracking-[-0.41px] text-content-muted dark:text-content-dark-muted pr-[70px] mb-8 lg:text-base lg:leading-[1.4] lg:mb-8 transition-colors duration-300"
                            />
                            <a
                                href="/contact"
                                className="flex px-[18px] py-[14px] rounded-[32px] border border-border-muted dark:border-white/20 text-xs leading-none tracking-[-0.41px] font-medium text-content-muted dark:text-content-dark-muted uppercase mb-14 transition-all duration-300 hover:bg-content dark:hover:bg-content-dark hover:text-content-inverted dark:hover:text-content-dark-inverted hover:border-content dark:hover:border-content-dark lg:px-6 lg:py-4 lg:text-sm lg:leading-none"
                            >
                                Iniciar Proyecto
                            </a>
                            <ul className="flex items-center gap-3 mt-auto lg:gap-5">
                                {socials.map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-content dark:text-content-dark transition-colors duration-300 hover:opacity-70"
                                        >
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: item.icon,
                                                }}
                                                className="w-4 h-4 mr-1.5"
                                            />
                                            <span className="text-xs leading-none tracking-[-0.41px] lg:text-base lg:leading-none">
                                                {item.label}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Gradient Blobs */}
                        <div className="absolute top-0 right-0 w-[244px] h-[244px] translate-x-1/2 -translate-y-1/2 bg-accent-blue dark:bg-accent-blue-dark bg-blend-overlay rounded-full opacity-50 dark:opacity-40 blur-[100px] transition-opacity duration-500" />
                        <div className="absolute bottom-0 left-0 w-[244px] h-[244px] -translate-x-1/2 translate-y-1/2 bg-accent-gold dark:bg-accent-gold-dark bg-blend-overlay rounded-full opacity-50 dark:opacity-35 blur-[100px] xl:-translate-y-1/3 transition-opacity duration-500" />
                    </div>
                    {/* Image */}
                    <div className="relative rounded-3xl overflow-hidden aspect-square md:aspect-[4/3] lg:aspect-[1.3] dark:border dark:border-white/[0.08]">
                        <img
                            src={image.src}
                            alt={image.alt}
                            width={image.width}
                            height={image.height}
                            className="size-full object-cover w-full h-full rounded-3xl mx-auto dark:saturate-[0.95] dark:contrast-[1.05] transition-all duration-300"
                            style={{ imageRendering: 'auto' }}
                        />
                        {/* Dark mode gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/30 to-transparent opacity-0 dark:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeHero;
