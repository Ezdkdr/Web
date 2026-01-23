import { useState } from 'react';
import type { Question } from '../../types';
import { cn } from '../../lib/utils';
import { Check, X, HelpCircle, Eye } from 'lucide-react';

export function KnowledgeCheck({ question }: { question: Question }) {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [textAnswer, setTextAnswer] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleSubmit = () => {
        setIsSubmitted(true);
        if (question.type === 'mcq' || question.type === 'boolean') {
            setIsCorrect(selectedOption === question.correctAnswer);
        } else {
            // Simple keyword match for text (very basic client-side check)
            // "correctAnswer" in our data for text is a space-separated list of keywords for this simple implementation
            // or exact match. The Prompt said "client-side OK" for Knowledge Checks.
            const keywords = question.correctAnswer.toLowerCase().split(' ');
            const input = textAnswer.toLowerCase();
            // Check if at least one keyword is present? Or all?
            // Let's assume loose matching: if any major keyword is found.
            const match = keywords.some(k => input.includes(k));
            setIsCorrect(match);
        }
    };

    const handleReveal = () => {
        setShowAnswer(true);
    };

    return (
        <div className="mt-8 mb-8 bg-brand-50 rounded-lg p-6 border border-brand-100">
            <div className="flex items-start gap-3 mb-4">
                <HelpCircle className="w-6 h-6 text-brand-600 mt-1 flex-shrink-0" />
                <h4 className="text-lg font-semibold text-gray-900">Knowledge Check</h4>
            </div>

            <p className="text-gray-800 mb-4 font-medium">{question.text}</p>

            <div className="space-y-4">
                {question.type === 'mcq' || question.type === 'boolean' ? (
                    <div className="space-y-2">
                        {question.options?.map((option) => (
                            <label
                                key={option}
                                className={cn(
                                    "flex items-center p-3 rounded-md border cursor-pointer transition-colors",
                                    selectedOption === option
                                        ? "bg-brand-100 border-brand-500 ring-1 ring-brand-500"
                                        : "bg-white border-gray-300 hover:bg-gray-50",
                                    isSubmitted && option === question.correctAnswer && "bg-green-50 border-green-500",
                                    isSubmitted && selectedOption === option && selectedOption !== question.correctAnswer && "bg-red-50 border-red-500"
                                )}
                            >
                                <input
                                    type="radio"
                                    name={question.id}
                                    value={option}
                                    checked={selectedOption === option}
                                    onChange={(e) => !isSubmitted && setSelectedOption(e.target.value)}
                                    disabled={isSubmitted}
                                    className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300"
                                />
                                <span className="ml-3 text-sm text-gray-900">{option}</span>
                                {isSubmitted && option === question.correctAnswer && (
                                    <Check className="ml-auto w-5 h-5 text-green-600" />
                                )}
                                {isSubmitted && selectedOption === option && selectedOption !== question.correctAnswer && (
                                    <X className="ml-auto w-5 h-5 text-red-600" />
                                )}
                            </label>
                        ))}
                    </div>
                ) : (
                    <div>
                        <textarea
                            className="w-full shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm border-gray-300 rounded-md p-2"
                            rows={3}
                            placeholder="Type your answer here..."
                            value={textAnswer}
                            onChange={(e) => setTextAnswer(e.target.value)}
                            disabled={isSubmitted}
                        />
                    </div>
                )}

                <div className="flex items-center gap-4 pt-2">
                    {!isSubmitted && (
                        <button
                            onClick={handleSubmit}
                            disabled={question.type !== 'text' && !selectedOption || question.type === 'text' && !textAnswer}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                        >
                            Check Answer
                        </button>
                    )}

                    <button
                        onClick={handleReveal}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        Reveal Answer
                    </button>
                </div>

                {/* Feedback Area */}
                {isSubmitted && (
                    <div className={cn(
                        "p-4 rounded-md mt-4 text-sm flex items-start",
                        isCorrect ? "bg-green-50 text-green-800" : "bg-yellow-50 text-yellow-800"
                    )}>
                        {isCorrect ? (
                            <Check className="w-5 h-5 mr-2 flex-shrink-0 text-green-600" />
                        ) : (
                            <X className="w-5 h-5 mr-2 flex-shrink-0 text-yellow-600" />
                        )}
                        <div>
                            <p className="font-bold">{isCorrect ? "Correct!" : "Not quite."}</p>
                            <p className="mt-1">{question.feedback}</p>
                        </div>
                    </div>
                )}

                {showAnswer && !isSubmitted && (
                    <div className="p-4 rounded-md mt-4 bg-gray-100 text-gray-700 text-sm">
                        <p className="font-bold">Recommended Answer:</p>
                        <p>{question.correctAnswer}</p>
                        <p className="mt-1 text-gray-500 text-xs">(Based on keywords for text answers)</p>
                    </div>
                )}
            </div>
        </div>
    );
}
