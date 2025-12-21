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
    education_title: string;
    education_text: string;
    education_degrees: EducationDegree[];
    work_history_title: string;
    work_history_text: string[];
    work_history_items: WorkHistoryItem[];
}

const AboutContent: React.FC<Props> = ({
    description,
    education_title,
    education_text,
    education_degrees,
    work_history_title,
    work_history_text,
    work_history_items,
}) => {
    return (
        <section className="py-10 md:py-16 lg:py-20">
            <div className="relative container">
                {/* Descripción principal */}
                <ContentManager
                    items={description.nodes}
                    className="text-base md:text-lg text-appGray-400 mb-12 md:mb-16 lg:mb-20"
                />

                {/* Education Section */}
                <div className="mb-12 md:mb-16 lg:mb-20">
                    <div className="flex items-start gap-3 md:gap-4 mb-6">
                        <div className="w-2 h-2 bg-appText rounded-full mt-2" />
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-appText">
                            {education_title}
                        </h2>
                    </div>
                    
                    <p className="text-sm md:text-base text-appGray-400 mb-6">
                        {education_text}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                        {education_degrees.map((edu, index) => (
                            <span
                                key={index}
                                className="px-4 py-2 rounded-full border border-appGray-200 text-sm md:text-base text-appGray-500 font-medium"
                            >
                                {edu.degree}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Work History Section */}
                <div>
                    <div className="flex items-start gap-3 md:gap-4 mb-6">
                        <div className="w-2 h-2 bg-appText rounded-full mt-2" />
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-appText">
                            {work_history_title}
                        </h2>
                    </div>
                    
                    {work_history_text.map((text, index) => (
                        <p key={index} className="text-sm md:text-base text-appGray-400 mb-6">
                            {text}
                        </p>
                    ))}

                    <div className="flex flex-wrap gap-3">
                        {work_history_items.map((work, index) => (
                            <span
                                key={index}
                                className="px-4 py-2 rounded-full border border-appGray-200 text-sm md:text-base text-appGray-500 font-medium"
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
