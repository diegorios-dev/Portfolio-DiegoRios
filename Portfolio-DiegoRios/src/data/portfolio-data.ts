// Datos estáticos del portafolio
export const portfolioData = {
    home: {
        title: "Diego Ríos",
        hero_title: "Soy Diego Ríos, Desarrollador Web Full Stack",
        hero_description: {
            nodes: [
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            value: 'Diseño y desarrollo aplicaciones web modernas con foco en rendimiento, accesibilidad y experiencia de usuario. Código limpio, arquitectura escalable y entregas que cumplen plazos.'
                        }
                    ] 
                }
            ]
        },
        hero_value_props: [
            'Resolución de problemas complejos con pensamiento sistémico',
            'Adaptabilidad a contextos y requerimientos cambiantes',
            'Entrega confiable: alineación de expectativas, plazos y calidad'
        ],
        hero_cta: {
            primary: {
                label: 'Iniciar proyecto',
                microcopy: 'Primera consulta sin costo. Respuesta en menos de 24 h.'
            },
            secondary: {
                label: 'Ver proyectos',
                href: '/portfolio'
            }
        },
        image: {
            alt: 'Retrato de Diego Ríos, desarrollador web',
            src: '/face2.jpg',
            width: 800,
            height: 1000,
        },
        seo: {
            title: 'Diego Ríos · Desarrollador Web Full Stack | React & Node.js',
            description: 'Desarrollador web en Argentina especializado en React, TypeScript y Node.js. Creo aplicaciones escalables con foco en performance y UX. Contactame.'
        }
    },
     
    about: {
        title: "Sobre mí",
        description: {
            nodes: [
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            value: 'Soy desarrollador web con 2 años de experiencia construyendo productos digitales para organismos públicos de investigación. Me especializo en crear interfaces intuitivas y sistemas backend eficientes. Disfruto aprender tecnologías nuevas, colaborar con equipos multidisciplinarios y entregar soluciones que generen impacto real.'
                        }
                    ]
                }
            ]
        },
        soft_skills: [
            'Comunicación clara: traduzco requerimientos técnicos a lenguaje de negocio',
            'Colaboración efectiva: experiencia en equipos ágiles y trabajo remoto',
            'Ownership total: asumo responsabilidad end-to-end, desde diseño hasta deploy'
        ],
        education_title: "Educación",
        education_text: "Formación técnica con enfoque en desarrollo web full stack y buenas prácticas de programación.",
        education_degrees: [
            {
                degree: "Técnico en Desarrollo de Páginas Web",
                university: "Universidad Nacional del Comahue",
                year: "2020"
            }
        ],
        work_history_title: "Historial laboral",
        work_history_STAR: [
            "Desarrollé sistema de monitoreo con mapas interactivos para instituto de investigación, reduciendo tiempos de consulta en 60% y mejorando la toma de decisiones con datos en tiempo real.",
            "Diseñé plataforma de gestión agropecuaria que automatizó comparación de presupuestos, eliminando 80% del trabajo manual en Excel y reduciendo errores de cálculo.",
            "Implementé arquitectura frontend con React + TypeScript que mejoró mantenibilidad del código y redujo tiempo de onboarding de nuevos desarrolladores en 40%."
        ],
        work_history_text: [
            "El proyecto del INTA, diseñado para el sector agropecuario, facilitó significativamente la comparación de presupuestos de producción al digitalizar y automatizar el proceso, reduciendo el uso de múltiples planillas de Excel.",
            "El proyecto para el Conicet proporcionó una plataforma digital que facilitó la gestión y organización de proyectos de investigación, permitiendo a los científicos enfocarse más en sus investigaciones."
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
        title: "Proyectos destacados",
        description: {
            nodes: [
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            value: 'Casos reales con resultados medibles. Cada proyecto representa un desafío técnico resuelto con foco en usuario y negocio.'
                        }
                    ]
                }
            ]
        },
        items: [
            {
                slug: 'project-1',
                title: 'Próximamente',
                theme: '#6366F1',
                cover_image: {
                    alt: 'Próximamente',
                    src: '',
                    width: 800,
                    height: 600
                },
                gallery: [
                    {
                        alt: 'Próximamente',
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
                                    value: 'Plataforma de visualización con mapas interactivos, filtros por período y capas satelitales. Permite análisis histórico de precipitaciones y exportación de reportes para investigación científica. Stack: React, Leaflet, Node.js, PostgreSQL.' 
                                }
                            ]
                        }
                    ]
                },
                categories: ['html', 'css', 'javascript', 'react', 'laravel', 'mysql', 'typescript', 'tailwindcss'],
                cta: 'Ver caso'
            }
        ]
    },

    contact: {
        title: "Trabajemos juntos",
        subtitle: "¿Tenés un proyecto en mente? Me encantaría escucharte.",
        cta: {
            label: "Enviar mensaje",
            microcopy: "Tiempo de respuesta: menos de 24 h. Incluí alcance y plazo deseado."
        },
        calendar_link: "https://calendly.com/tu-usuario/consulta-15min"
    }
};

export type PortfolioData = typeof portfolioData;
