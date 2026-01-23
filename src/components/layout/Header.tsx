
import { useTraining } from '../../store/useTrainingStore';
import { trainingContent } from '../../data/content';
import { Menu, ShieldCheck } from 'lucide-react';


export function Header({ onMenuClick }: { onMenuClick: () => void }) {
    const { completedSections, isTrainingStarted, startTraining, resetProgress } = useTraining();

    const totalSections = trainingContent.sections.length;
    // We count unique completed sections. 
    // Note: completedSections is a list of IDs.
    const progress = Math.round((completedSections.length / totalSections) * 100);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <button
                            type="button"
                            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500"
                            onClick={onMenuClick}
                        >
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <div className="flex-shrink-0 flex items-center ml-2 md:ml-0 gap-2">
                            <ShieldCheck className="h-8 w-8 text-brand-600" />
                            <span className="font-bold text-xl text-gray-900 hidden sm:block">
                                CyberSecure Canada
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {!isTrainingStarted ? (
                            <button
                                onClick={startTraining}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                            >
                                Start Training
                            </button>
                        ) : (
                            <div className="flex flex-col items-end min-w-[140px]">
                                <div className="flex justify-between w-full text-xs text-gray-500 mb-1">
                                    <span>Progress</span>
                                    <span className="font-semibold text-gray-700">{progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-brand-600 h-2 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        )}
                        {progress === 100 && (
                            <button
                                onClick={resetProgress}
                                className="text-xs text-gray-400 hover:text-red-500 underline ml-2"
                            >
                                Reset
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
