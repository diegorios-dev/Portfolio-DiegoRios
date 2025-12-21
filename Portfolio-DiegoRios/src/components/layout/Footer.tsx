import LinkedInIcon from '../../assets/icons/linkedin.svg?raw';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const nav = [
        {
            label: 'diegoavilaa0@gmail.com',
            href: 'mailto:diegoavilaa0@gmail.com',
        },
    ];

    const socials = [
        {
            label: 'LinkedIn',
            icon: LinkedInIcon,
            href: 'https://www.linkedin.com/in/diego-rios-fullstack/',
        },
        {
            label: 'Contacto',
            href: '/contact',
        },
    ];

    return (
        <footer className="pb-10">
            <div className="container">
                <div className="pb-6 border-b border-appGray-100 mb-6 md:flex md:items-end md:justify-between md:pb-8 md:mb-8">
                    <div className="text-lg leading-[1.2] tracking-[-0.41px] font-Helvetica max-w-[174px] max-md:mb-6 md:text-3xl md:leading-[1.2] md:max-w-[300px] lg:text-[40px] lg:max-w-[394px]">
                        Contactame
                    </div>
                    <nav>
                        <ul className="grid grid-cols-[repeat(2,auto)] gap-4 md:flex md:items-center md:gap-6">
                            {nav.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.href}
                                        className="text-sm leading-none tracking-[-0.41px] lg:text-base lg:leading-none"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="sm:grid sm:grid-cols-2 lg:flex lg:items-center lg:justify-between">
                    <div className="pb-6 border-b border-appGray-100 mb-6 sm:col-span-2 md:pb-8 md:mb-8 lg:col-span-1 lg:order-2 lg:border-none lg:pb-0 lg:mb-0">
                        <ul className="grid grid-cols-2 gap-3 max-w-max sm:grid-cols-4">
                            {socials.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center justify-center px-4 py-[9px] border rounded-[32px] lg:py-3 ${
                                            item.icon
                                                ? 'text-appGray-500 border-appGray-200'
                                                : 'text-white border-appText bg-appText'
                                        }`}
                                    >
                                        {item.icon && (
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: item.icon,
                                                }}
                                                className="w-[14px] h-[14px] mr-2 lg:w-4 lg:h-4"
                                            />
                                        )}
                                        <span className="text-sm leading-none font-medium tracking-[-0.41px] uppercase lg:text-base lg:leading-none">
                                            {item.label}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="text-sm leading-none tracking-[-0.41px] sm:text-right lg:order-3 lg:text-base lg:leading-none">
                        &copy; {currentYear} Personal Website. Todos los derechos
                        reservados.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
