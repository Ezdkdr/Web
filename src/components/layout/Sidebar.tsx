import { trainingContent } from '../../data/content';
import { useTraining } from '../../store/useTrainingStore';
import { cn } from '../../lib/utils';
import { CheckCircle, Circle } from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { completedSections, currentSection } = useTraining();

    const handleLinkClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // Offset for sticky header (64px)
            const y = element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
        onClose();
    };

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar panel */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen md:overflow-y-auto pt-16 md:pt-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="h-full flex flex-col">
                    <div className="px-6 py-4 border-b border-gray-100 hidden md:block">
                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Table of Contents</h2>
                    </div>

                    <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                        {trainingContent.sections.map((section) => {
                            // Requirement said: "Clicking a section scrolls smoothly to that section". No strict locking mentioned, but typically training enforces sequential. 
                            // Prompt core UX: "Highlight current section". "Mark Complete when user reaches bottom".
                            // Prompt didn't explicitly forbid jumping, but "Training" implies sequence.
                            // I won't lock it for now to keep UX friendly as per "Table of contents... clicking scrolls to section".

                            const isCompleted = completedSections.includes(section.id);
                            const isActive = currentSection === section.id;

                            return (
                                <button
                                    key={section.id}
                                    onClick={() => handleLinkClick(section.id)}
                                    className={cn(
                                        "w-full group flex items-start px-3 py-3 text-sm font-medium rounded-md transition-colors",
                                        isActive ? "bg-brand-50 text-brand-700" : "text-gray-700 hover:bg-gray-50",
                                    )}
                                >
                                    <div className="flex-shrink-0 mt-0.5">
                                        {isCompleted ? (
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                        ) : isActive ? (
                                            <Circle className="h-5 w-5 text-brand-600 fill-current" />
                                        ) : (
                                            <Circle className="h-5 w-5 text-gray-300" />
                                        )}
                                    </div>
                                    <div className="ml-3 text-left">
                                        <span className={cn(
                                            "block truncate",
                                            isActive ? "font-semibold" : ""
                                        )}>
                                            {section.title}
                                        </span>
                                        <span className="text-xs text-gray-400 mt-1 block">
                                            {section.duration}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-gray-200">
                        <p className="text-xs text-gray-400 text-center">
                            © 2026 CyberSecure Canada
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
