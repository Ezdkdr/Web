import { createContext, useContext, useEffect, useState } from 'react';


interface TrainingState {
    completedSections: string[];
    currentSection: string;
    isTrainingStarted: boolean;
    finalScore: number | null;
    hasPassed: boolean;
    markSectionComplete: (sectionId: string) => void;
    setCurrentSection: (sectionId: string) => void;
    startTraining: () => void;
    submitFinalScore: (score: number, passed: boolean) => void;
    resetProgress: () => void;
}

const TrainingContext = createContext<TrainingState | undefined>(undefined);

export function TrainingProvider({ children }: { children: React.ReactNode }) {
    const [completedSections, setCompletedSections] = useState<string[]>(() => {
        const saved = localStorage.getItem('completedSections');
        return saved ? JSON.parse(saved) : [];
    });

    const [currentSection, setCurrentSection] = useState<string>('');

    const [isTrainingStarted, setIsTrainingStarted] = useState<boolean>(() => {
        return localStorage.getItem('isTrainingStarted') === 'true';
    });

    const [finalScore, setFinalScore] = useState<number | null>(() => {
        const saved = localStorage.getItem('finalScore');
        return saved ? Number(saved) : null;
    });

    const [hasPassed, setHasPassed] = useState<boolean>(() => {
        return localStorage.getItem('hasPassed') === 'true';
    });

    useEffect(() => {
        localStorage.setItem('completedSections', JSON.stringify(completedSections));
    }, [completedSections]);

    useEffect(() => {
        localStorage.setItem('isTrainingStarted', String(isTrainingStarted));
    }, [isTrainingStarted]);

    useEffect(() => {
        if (finalScore !== null) localStorage.setItem('finalScore', String(finalScore));
        localStorage.setItem('hasPassed', String(hasPassed));
    }, [finalScore, hasPassed]);

    const markSectionComplete = (sectionId: string) => {
        setCompletedSections(prev => {
            if (prev.includes(sectionId)) return prev;
            return [...prev, sectionId];
        });
    };

    const startTraining = () => {
        setIsTrainingStarted(true);
        // Scroll to section 1? Handled by component.
    };

    const submitFinalScore = (score: number, passed: boolean) => {
        setFinalScore(score);
        setHasPassed(passed);
    };

    const resetProgress = () => {
        setCompletedSections([]);
        setIsTrainingStarted(false);
        setFinalScore(null);
        setHasPassed(false);
        localStorage.clear();
    };

    return (
        <TrainingContext.Provider value={{
            completedSections,
            currentSection,
            isTrainingStarted,
            finalScore,
            hasPassed,
            markSectionComplete,
            setCurrentSection,
            startTraining,
            submitFinalScore,
            resetProgress
        }}>
            {children}
        </TrainingContext.Provider>
    );
}

export function useTraining() {
    const context = useContext(TrainingContext);
    if (context === undefined) {
        throw new Error('useTraining must be used within a TrainingProvider');
    }
    return context;
}
