import { useEffect, useRef } from 'react';
import type { Section as SectionType } from '../../types';
import { useTraining } from '../../store/useTrainingStore';
import { KnowledgeCheck } from './KnowledgeCheck';
import { IncidentReportWidget } from './IncidentReportWidget';
import { FinalAssessment } from './FinalAssessment';

import { CheckCircle } from 'lucide-react';

export function Section({ section }: { section: SectionType }) {
    const { markSectionComplete, setCurrentSection, completedSections } = useTraining();
    const sectionRef = useRef<HTMLDivElement>(null);

    // Intersection Observer to update current section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setCurrentSection(section.id);
                    }
                });
            },
            { threshold: 0.3 } // Trigger when 30% visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [section.id, setCurrentSection]);

    const isCompleted = completedSections.includes(section.id);

    return (
        <section
            id={section.id}
            ref={sectionRef}
            className="py-12 px-6 md:px-12 border-b border-gray-200 last:border-0 scroll-mt-20"
        >
            <div className="max-w-3xl mx-auto">
                <header className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-brand-600 uppercase tracking-wider">
                            {section.duration}
                        </span>
                        {isCompleted && (
                            <span className="inline-flex items-center text-green-600 text-sm font-medium">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Completed
                            </span>
                        )}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{section.title}</h2>
                </header>

                <div className="prose prose-blue max-w-none text-gray-700">
                    {section.content.map((block, index) => {
                        switch (block.type) {
                            case 'heading':
                                return <h3 key={index} className="text-xl font-bold text-gray-900 mt-8 mb-4">{block.content}</h3>;
                            case 'subheading':
                                return <h4 key={index} className="text-lg font-semibold text-gray-800 mt-6 mb-3">{block.content}</h4>;
                            case 'paragraph':
                                return <p key={index} className="mb-4 leading-relaxed whitespace-pre-line">{block.content}</p>;
                            case 'list':
                                return (
                                    <ul key={index} className="list-disc pl-5 mb-4 space-y-1">
                                        {(block.content as string[]).map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                );
                            case 'widget':
                                if (block.content === 'IncidentReportWidget') return <IncidentReportWidget key={index} />;
                                if (block.content === 'FinalAssessment') return <FinalAssessment key={index} />;
                                return null;
                            default:
                                return null;
                        }
                    })}
                </div>

                {section.knowledgeCheck && (
                    <div className="mt-10">
                        {section.knowledgeCheck.map(q => (
                            <KnowledgeCheck key={q.id} question={q} />
                        ))}
                    </div>
                )}

                <div className="mt-12 flex justify-center">
                    {!isCompleted ? (
                        <button
                            onClick={() => markSectionComplete(section.id)}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all transform hover:scale-105"
                        >
                            Mark Section Complete
                        </button>
                    ) : (
                        <button
                            disabled
                            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-400 bg-gray-50 cursor-not-allowed"
                        >
                            Section Completed
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
