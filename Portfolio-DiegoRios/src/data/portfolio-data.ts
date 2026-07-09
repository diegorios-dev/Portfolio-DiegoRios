// Datos estáticos del portafolio
export const portfolioData = {
    home: {
        title: "Diego Ríos",
        hero_title: "Soy Diego Ríos,\nDesarrollador Web Full Stack",
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
                            value: 'Soy desarrollador web con '
                        },
                        {
                            type: 'strong',
                            value: '2 años de experiencia'
                        },
                        {
                            type: 'text',
                            value: ' construyendo productos digitales para '
                        },
                        {
                            type: 'strong',
                            value: 'organismos públicos de investigación'
                        },
                        {
                            type: 'text',
                            value: '. Me especializo en crear '
                        },
                        {
                            type: 'strong',
                            value: 'interfaces intuitivas'
                        },
                        {
                            type: 'text',
                            value: ' y '
                        },
                        {
                            type: 'strong',
                            value: 'sistemas backend eficientes'
                        },
                        {
                            type: 'text',
                            value: '. Disfruto aprender tecnologías nuevas, '
                        },
                        {
                            type: 'strong',
                            value: 'colaborar con equipos multidisciplinarios'
                        },
                        {
                            type: 'text',
                            value: ' y '
                        },
                        {
                            type: 'strong',
                            value: 'entregar soluciones que generen impacto real'
                        },
                        {
                            type: 'text',
                            value: '.'
                        }
                    ]
                }
            ]
        },
        soft_skills: [
            'Comunicación clara: traduzco requerimientos técnicos a lenguaje de negocio',
            'Colaboración efectiva: experiencia en equipos ágiles y trabajo remoto'
        ],
        education_title: "Educación",
        education_text: "Formación técnica con enfoque en Desarrollo Web full Stack y buenas prácticas de programación.",
        education_degrees: [
            {
                degree: "Técnico Universitario en Desarrollo de Páginas Web",
                university: "Universidad Nacional del Comahue",
                year: "2025"
            }
        ],
        work_history_title: "Historial laboral",
        work_history_items: [
            {
                company_name: "Conicet - Argentina",
                year: 2025,
                achievements: [
                    "Desarrollé una solución Full Stack (Móvil/Web) para digitalizar el monitoreo climático en zonas rurales, ayudando a reducir las pérdidas de ganado en un 40% mediante la anticipación de sequías.",
                    "Implementé arquitectura offline-first con sincronización automática, lo que eliminó el uso de papel y la logística de traslado físico, optimizando la eficiencia operativa en un 80%. ",
                    "El sistema centraliza la información en tiempo real y permite la exportación de reportes precisos para investigadores y productores"
                ]
            },
            {
                company_name: "INTA - Argentina",
                year: 2024,
                achievements: [
                    "Diseñé plataforma de gestión agropecuaria que automatizó comparación de presupuestos, eliminando 80% del trabajo manual en Excel y reduciendo errores de cálculo.",
                    "Implementé arquitectura frontend con React que mejoró mantenibilidad del código y redujo tiempo de onboarding de nuevos desarrolladores en 40%."
                ]
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
                title: 'Inta - Calculadora de Presupuesto Agropecuaria',
                theme: '#6366F1',
                cover_image: {
                    alt: 'proyectTwo',
                    src: '/portada1.png',
                    width: 800,
                    height: 600
                },
                desktop_gallery: [
                    { alt: 'Vista principal', src: '/portada1.png' },
                    { alt: 'Vista principal', src: '/proyectTwo.png' },
                    { alt: 'Vista 2', src: '/proyectTwo-part-2.png' },
                    { alt: 'Vista 3', src: '/proyectTwo-part-3.png' }
                ],
                gallery: [
                    {
                        alt: 'proyectTwo',
                        src: '/portada2.png',
                        width: 800,
                        height: 600
                    }
                ],
                description: 'Plataforma web para gestión integral de proyectos agropecuarios. Permite crear, editar y comparar presupuestos dinámicamente, optimizando la toma de decisiones financieras.',
                features: [
                    'Comparación dinámica de presupuestos',
                    'Dashboard con métricas en tiempo real',
                    'Exportación de reportes PDF'
                ],
                metrics: [
                    { value: '80%', label: 'Reducción trabajo manual' },
                    { value: '40%', label: 'Menos errores de cálculo' }
                ],
                tech_stack: {
                    frontend: ['React', 'TypeScript', 'Tailwind CSS'],
                    backend: [],
                    mobile: []
                },
                categories: ['React', 'Tailwind CSS' , "JavaScript"],
                live_url: 'https://inta-calculadora.vercel.app/',
            },
            {
                slug: 'project-2',
                title: 'Conicet - Sistema Monitoreo',
                theme: '#10B981',
                cover_image: {
                    alt: 'Dashboard del sistema de monitoreo',
                    src: '/proyectOne.png',
                    width: 800,
                    height: 600
                },
                desktop_gallery: [
                    { alt: 'Dashboard principal', src: '/portada2.png' },
                    { alt: 'Dashboard principal', src: '/proyectOne.png' },
                    { alt: 'Vista 2', src: '/proyectOne-part-2.png' },
                    { alt: 'Vista 3', src: '/proyectOne.png' }
                ],
                gallery: [
                    {
                        alt: 'App móvil - Vista principal',
                        src: '/proyectUno-App-part-1.png',
                        width: 800,
                        height: 600
                    }
                ],
                description: 'Solución <strong>Full Stack</strong> (Móvil/Web) para digitalizar el monitoreo climático en zonas rurales. Arquitectura <strong>offline-first</strong> con <strong>sincronización automática</strong>, eliminando el uso de papel y centralizando información en <strong>tiempo real</strong>.',
                features: [
                    'Arquitectura <strong>offline-first</strong> con sync automático',
                    'Dashboard con mapas interactivos (Leaflet)',
                    'API REST robusta con Laravel',
                    'App móvil multiplataforma'
                ],
                metrics: [
                    { value: '40%', label: 'Reducción pérdidas de ganado' },
                    { value: '80%', label: 'Eficiencia operativa' },
                    { value: '0', label: 'Uso de papel' },
                    { value: '24/7', label: 'Monitoreo en tiempo real' }
                ],
                tech_stack: {
                    frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Leaflet'],
                    backend: ['Laravel', 'PHP', 'MySQL'],
                    mobile: ['React Native', 'SQLite', 'Offline Sync']
                },
                categories: ['React', 'Laravel', 'MySQL', 'TypeScript', 'Tailwind CSS'],
                cta: 'Ver caso',
                live_url: '',
                github_links: {
                    frontend: 'https://github.com/diegorios-dev/PlataformaWeb-Conicet',
                    backend: 'https://github.com/diegorios-dev/Backend-Pluvia-Conicet',
                    mobile: 'https://github.com/diegorios-dev/Pluvia-Conicet-App'
                }
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
