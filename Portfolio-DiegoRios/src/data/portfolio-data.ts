// Datos estáticos del portafolio
export const portfolioData = {
    home: {
        title: "Diego Rios",
        hero_title: "Soy Diego Rios , Desarrollador Web.",
        hero_description: {
            nodes: [
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            value: 'Especializado en desarrollo web moderno y diseño de experiencias digitales. Transformo ideas en soluciones tecnológicas escalables y elegantes, con enfoque en código limpio y arquitecturas eficientes.'
                        }
                    ] 
                }
            ]
        },
        image: {
            alt: 'Diego Rios - Full Stack Developer',
            src: '/imgMia.webp',
        },
        seo: {
            title: 'Diego Rios - Desarrollador Full Stack',
            description: 'Portfolio profesional de Diego Rios - Desarrollador Full Stack especializado en soluciones web modernas'
        }
    },
     
    about: {
        title: "Sobre Mí",
        description: {
            nodes: [
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            value: 'Soy un Desarrollador dedicado con pasión por crear soluciones innovadoras y aprender nuevas tecnologías.'
                        }
                    ]
                }
            ]
        },
        education_title: "Educación",
        education_text: "Puedo desempeñarme tanto en el ámbito público como privado, desarrollando aplicaciones y sitios web, participando de forma colaborativa en proyectos de software y equipos de trabajo, y realizando el desarrollo y mantenimiento de soluciones web de manera ordenada y profesional.",
        education_degrees: [
            {
                degree: "Tecnico en Desarrollo de Paginas Web",
                university: "Universidad Nacional del Comahue",
                year: "2020"
            }
        ],
        work_history_title: "Historial Laboral",
        work_history_text: [
            "El proyecto del INTA, diseñado para el sector agropecuario, facilitó significativamente la comparación de presupuestos de producción al digitalizar y automatizar el proceso. Como resultado, se logró reducir considerablemente el uso de múltiples planillas de Excel, simplificando el trabajo del encargado y disminuyendo errores asociados al manejo manual. Esto optimizó el tiempo destinado a la comparación, mejoró la precisión en el análisis y permitió tomar decisiones más rápidas y acertadas en la gestión productiva.",
            "El Proyecto para el Conicet diseñado para los cientificos del area de investigacion, proporciono una plataforma digital que facilito la gestion y organizacion de sus proyectos de investigacion. Al centralizar la informacion y automatizar tareas administrativas, se redujo significativamente el tiempo dedicado a la gestion manual de datos. Esto permitio a los cientificos enfocarse mas en sus investigaciones, mejorando la eficiencia y productividad del equipo de trabajo."
        ],
        work_history_items: [
            {
                company_name: "Conicet - Argentina",
                job_title: "Desarrollador Full Stack",
                duration: "2021 - Presente",
                from: {
                    timestamp: new Date('2021-01-01').getTime()
                },
                to: {
                    timestamp: new Date().getTime()
                },
                description: {
                    nodes: [
                        {
                            type: 'paragraph',
                            content: [
                                {
                                    type: 'text',
                                    value: 'Developing web applications and leading projects.'
                                }
                            ]
                        }
                    ]
                }
            },
            {
                company_name: "INTA - Argentina",
                job_title: "Desarrollador Full Stack",
                duration: "2021 - Presente",
                from: {
                    timestamp: new Date('2021-01-01').getTime()
                },
                to: {
                    timestamp: new Date().getTime()
                },
                description: {
                    nodes: [
                        {
                            type: 'paragraph',
                            content: [
                                {
                                    type: 'text',
                                    value: 'Developing web applications and leading projects.'
                                }
                            ]
                        }
                    ]
                }
            }
        ]
    },
    
    portfolio: {
        title: "Portfolio",
        description: {
            nodes: [
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            value: 'Una muestra de mis proyectos recientes y trabajos.'
                        }
                    ]
                }
            ]
        },
        items: [
            {
                slug: 'project-1',
                title: 'Proximamente',
                theme: '#6366F1',
                cover_image: {
                    alt: 'Proximamente',
                    src: '',
                    width: 800,
                    height: 600
                },
                gallery: [
                    {
                        alt: 'Proximamente',
                        src: '',
                        width: 800,
                        height: 600
                    }
                ],
                description: {
                    nodes: [
                        {
                            type: 'paragraph',
                            content: [
                                {
                                    type: 'text',
                                    value: 'A description of the first project.'
                                }
                            ]
                        }
                    ]
                },
                categories: ['Web Development', 'Design']
            },
            {
                slug: 'project-2',
                title: 'Conicet - Sistema Monitoreo',
                theme: '#10B981',
                cover_image: {
                    alt: 'Project 2',
                    src: '/proyectOne.png',
                    width: 800,
                    height: 600
                },
                gallery: [
                    {
                        alt: 'Project 2',
                        src: '/proyectOne.png',
                        width: 800,
                        height: 600
                    }
                ],
                description: {
                    nodes: [
                        {
                            type: 'paragraph',
                            content: [
                                {
                                    type: 'text',
                                    value: 'Este sistema permite monitorear en tiempo real datos de precipitaciones enviados por la aplicación de celular para investigaciones científicas.' 
                                }
                            ]
                        }
                    ]
                },
                categories: ['Mobile', 'Development']

            }
        ]
    }
};

export type PortfolioData = typeof portfolioData;
