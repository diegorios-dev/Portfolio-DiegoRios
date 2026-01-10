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
    job_title: string;
    duration: string;
    from: { timestamp: number };
    to: { timestamp: number };
    description: RichTextData;
}

interface Props {
    description: RichTextData;
    soft_skills?: string[];
    education_title: string;
    education_text: string;
    education_degrees: EducationDegree[];
    work_history_title: string;
    work_history_text: string[];
    work_history_STAR?: string[];
    work_history_items: WorkHistoryItem[];
}

const CheckIcon = `<svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 flex-shrink-0"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>`;

const AboutContent: React.FC<Props> = ({
    description,
    soft_skills,
    education_title,
    education_text,
    education_degrees,
    work_history_title,
    work_history_text,
    work_history_STAR,
    work_history_items,
}) => {
    return (
        <section className="">
            <div className="relative container">
                {/* Descripción principal */}
                <ContentManager
                    items={description.nodes}
                    className="text-base md:text-lg text-content-muted dark:text-content-dark-muted mb-8 transition-colors duration-300"
                />

                {/* Soft Skills */}
                {soft_skills && soft_skills.length > 0 && (
                    <ul className="space-y-3 mb-12 md:mb-16">
                        {soft_skills.map((skill, index) => (
                            <li key={index} className="flex items-start gap-3 text-sm md:text-base text-content-muted dark:text-content-dark-muted">
                                <span 
                                    dangerouslySetInnerHTML={{ __html: CheckIcon }} 
                                    className="mt-0.5 text-accent-blue dark:text-accent-blue-dark" 
                                />
                                <span>{skill}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Education Section */}
                <div className="mb-12 md:mb-16">
                    <div className="flex items-start gap-3 md:gap-4 mb-6">
                        <div className="w-2 h-2 bg-content dark:bg-content-dark rounded-full mt-2 transition-colors duration-300" />
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-content dark:text-content-dark transition-colors duration-300">
                            {education_title}
                        </h2>
                    </div>
                    
                    <p className="text-sm md:text-base text-content-muted dark:text-content-dark-muted mb-6 transition-colors duration-300">
                        {education_text}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                        {education_degrees.map((edu, index) => (
                            <span
                                key={index}
                                className="px-4 py-2 rounded-full border border-border-muted dark:border-border-dark-muted text-sm md:text-base text-content-muted dark:text-content-dark font-medium transition-colors duration-300"
                            >
                                {edu.degree}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Work History Section */}
                <div>
                    <div className="flex items-start gap-3 md:gap-4 mb-6">
                        <div className="w-2 h-2 bg-content dark:bg-content-dark rounded-full mt-2 transition-colors duration-300" />
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-content dark:text-content-dark transition-colors duration-300">
                            {work_history_title}
                        </h2>
                    </div>
                    
                    {/* Logros STAR */}
                    {work_history_STAR && work_history_STAR.length > 0 && (
                        <ul className="space-y-4 mb-8">
                            {work_history_STAR.map((achievement, index) => (
                                <li key={index} className="flex items-start gap-3 text-sm md:text-base text-content-muted dark:text-content-dark-muted">
                                    <span 
                                        dangerouslySetInnerHTML={{ __html: CheckIcon }} 
                                        className="mt-0.5 text-accent-gold dark:text-accent-gold-dark flex-shrink-0" 
                                    />
                                    <span>{achievement}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="flex flex-wrap gap-3">
                        {work_history_items.map((work, index) => (
                            <span
                                key={index}
                                className="px-4 py-2 rounded-full border border-border-muted dark:border-border-dark-muted text-sm md:text-base text-content-muted dark:text-content-dark font-medium transition-colors duration-300"
                            >
                                {work.company_name} • {new Date(work.from.timestamp).getFullYear()}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutContent;
