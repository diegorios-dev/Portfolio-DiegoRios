import ContentManager from '../ContentManager';

interface RichTextData {
    nodes: any[];
}

interface EducationDegree {
    degree: string;
    university: string;
    year: string;
}

interface WorkHistoryItem {
    company_name: string;
    year: number;
    achievements: string[];
}

interface Props {
    description: RichTextData;
    soft_skills?: string[];
    education_title: string;
    education_text: string;
    education_degrees: EducationDegree[];
    work_history_title: string;
    work_history_items: WorkHistoryItem[];
}

const CheckIcon = `<svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 flex-shrink-0"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>`;

const BriefcaseIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path stroke-linecap="round" stroke-linejoin="round" d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>`;

const GraduationIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 14v7"/></svg>`;

const AboutContent: React.FC<Props> = ({
    description,
    soft_skills,
    education_title,
    education_text,
    education_degrees,
    work_history_title,
    work_history_items,
}) => {
    return (
        <section className="pb-16 md:pb-24">
            <div className="container">
                {/* Descripción principal - Hero style */}
                <div className="max-w-4xl mx-auto mb-12 md:mb-20">
                    <ContentManager
                        items={description.nodes}
                        className="text-lg md:text-xl lg:text-2xl text-content-muted dark:text-content-dark-muted leading-relaxed text-center transition-colors duration-300"
                    />
                </div>

                {/* Soft Skills - Cards en grid */}
                {soft_skills && soft_skills.length > 0 && (
                    <div className="mb-16 md:mb-24">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {soft_skills.map((skill, index) => (
                                <div 
                                    key={index} 
                                    className="group p-5 md:p-6 rounded-2xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark hover:border-accent-blue dark:hover:border-accent-blue-dark transition-all duration-300 hover:shadow-lg"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent-blue/10 dark:bg-accent-blue-dark/10 flex items-center justify-center">
                                            <span 
                                                dangerouslySetInnerHTML={{ __html: CheckIcon }} 
                                                className="text-accent-blue dark:text-accent-blue-dark" 
                                            />
                                        </div>
                                        <p className="text-sm md:text-base text-content-muted dark:text-content-dark-muted leading-relaxed">
                                            {skill}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Grid de 2 columnas en desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    
                    {/* Education Section */}
                    <div className="p-6 md:p-8 rounded-3xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark transition-colors duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-accent-blue/10 dark:bg-accent-blue-dark/10 flex items-center justify-center">
                                <span 
                                    dangerouslySetInnerHTML={{ __html: GraduationIcon }} 
                                    className="text-accent-blue dark:text-accent-blue-dark" 
                                />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-content dark:text-content-dark transition-colors duration-300">
                                {education_title}
                            </h2>
                        </div>
                        
                        <p className="text-sm md:text-base text-content-muted dark:text-content-dark-muted mb-6 leading-relaxed transition-colors duration-300">
                            {education_text}
                        </p>
                        
                        <div className="space-y-3">
                            {education_degrees.map((edu, index) => (
                                <div
                                    key={index}
                                    className="p-4 rounded-xl bg-background dark:bg-background-dark border border-border-muted dark:border-border-dark-muted transition-colors duration-300"
                                >
                                    <p className="font-semibold text-content dark:text-content-dark mb-1">
                                        {edu.degree}
                                    </p>
                                    <p className="text-sm text-content-muted dark:text-content-dark-muted">
                                        {edu.university} • {edu.year}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Work History Section */}
                    <div className="p-6 md:p-8 rounded-3xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark transition-colors duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-accent-gold/10 dark:bg-accent-gold-dark/10 flex items-center justify-center">
                                <span 
                                    dangerouslySetInnerHTML={{ __html: BriefcaseIcon }} 
                                    className="text-accent-gold dark:text-accent-gold-dark" 
                                />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-content dark:text-content-dark transition-colors duration-300">
                                {work_history_title}
                            </h2>
                        </div>
                        
                        {/* Timeline de trabajos */}
                        <div className="space-y-6">
                            {work_history_items.map((work, index) => (
                                <div 
                                    key={index} 
                                    className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-accent-gold before:to-accent-gold/20 dark:before:from-accent-gold-dark dark:before:to-accent-gold-dark/20"
                                >
                                    {/* Dot en la línea */}
                                    <div className="absolute left-0 top-1 w-2 h-2 -translate-x-[3px] rounded-full bg-accent-gold dark:bg-accent-gold-dark ring-4 ring-surface dark:ring-surface-dark" />
                                    
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <h3 className="text-base md:text-lg font-semibold text-content dark:text-content-dark transition-colors duration-300">
                                            {work.company_name}
                                        </h3>
                                        <span className="px-2.5 py-1 rounded-full bg-accent-gold/10 dark:bg-accent-gold-dark/10 text-accent-gold dark:text-accent-gold-dark text-xs md:text-sm font-medium">
                                            {work.year}
                                        </span>
                                    </div>
                                    
                                    {work.achievements && work.achievements.length > 0 && (
                                        <ul className="space-y-2">
                                            {work.achievements.map((achievement, achIndex) => (
                                                <li key={achIndex} className="flex items-start gap-2 text-sm text-content-muted dark:text-content-dark-muted leading-relaxed">
                                                    <span className="text-accent-gold dark:text-accent-gold-dark mt-1.5 flex-shrink-0">•</span>
                                                    <span>{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default AboutContent;
