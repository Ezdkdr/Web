import { useState } from 'react';
import { finalAssessmentQuestions } from '../../data/content';
import { useTraining } from '../../store/useTrainingStore';
import { CompletionCertificate } from '../completion/CompletionCertificate';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

export function FinalAssessment() {
    const { submitFinalScore, hasPassed, finalScore } = useTraining();

    // State for answers: { questionId: selectedOption }
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<Array<{ id: string, correct: boolean, message: string }>>([]);
    const [showCertificate, setShowCertificate] = useState(false);

    const handleOptionChange = (qId: string, val: string) => {
        setAnswers(prev => ({ ...prev, [qId]: val }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        // Create payload
        const payload = {
            answers: Object.entries(answers).map(([id, value]) => ({ id, value }))
        };

        try {
            const res = await fetch('/api/submit-assessment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            let data;
            if (res.ok) {
                data = await res.json();
            } else {
                // Fallback for demo if API fails
                data = mockScoring(payload.answers);
            }

            submitFinalScore(data.score, data.pass);
            setFeedback(data.feedback);

            if (data.pass) {
                setShowCertificate(true);
            }
        } catch (e) {
            // Fallback
            console.error("Submission failed, using mock", e);
            const data = mockScoring(payload.answers);
            submitFinalScore(data.score, data.pass);
            setFeedback(data.feedback);
            if (data.pass) setShowCertificate(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Mock scoring logic for client-side fallback
    const mockScoring = (submittedAnswers: any[]) => {
        let correctCount = 0;
        const feedbackArr = [];

        for (const q of finalAssessmentQuestions) {
            const answer = submittedAnswers.find((a: any) => a.id === q.id);
            const isCorrect = answer?.value === q.correctAnswer;
            if (isCorrect) correctCount++;
            feedbackArr.push({
                id: q.id,
                correct: isCorrect,
                message: isCorrect ? "Correct" : `Incorrect. Correct answer: ${q.correctAnswer}`
            });
        }

        const score = Math.round((correctCount / finalAssessmentQuestions.length) * 100);
        return { score, pass: score >= 80, feedback: feedbackArr };
    };

    const handleRetake = () => {
        setAnswers({});
        setFeedback([]);
        submitFinalScore(0, false); // Reset score in context? Or simplified
        // Ideally we reset context specific pass state but keep progress.
        // The store's submitFinalScore updates state.
    };

    if (hasPassed && showCertificate) {
        return (
            <div className="py-12">
                <div className="bg-green-50 p-6 rounded-lg text-center mb-8 max-w-2xl mx-auto">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-green-900 mb-2">Congratulations!</h2>
                    <p className="text-green-800 text-lg">You passed the assessment with a score of {finalScore}%.</p>
                </div>
                <CompletionCertificate />
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Final Assessment</h2>
            <p className="text-gray-600 mb-8">
                Answer the following questions to complete the training. You need 80% to pass.
            </p>

            {feedback.length > 0 && !hasPassed && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-md flex items-center gap-3">
                    <XCircle className="w-8 h-8 text-red-600" />
                    <div>
                        <h4 className="font-bold text-red-900">Assessment Failed</h4>
                        <p className="text-red-700">You scored {finalScore}%. Please review the answers and try again.</p>
                    </div>
                    <button
                        onClick={handleRetake}
                        className="ml-auto px-4 py-2 bg-white border border-red-300 rounded text-red-700 hover:bg-red-50 font-medium flex items-center"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retake
                    </button>
                </div>
            )}

            <div className="space-y-8">
                {finalAssessmentQuestions.map((q, idx) => {
                    const fb = feedback.find(f => f.id === q.id);
                    const isCorrect = fb?.correct;

                    return (
                        <div key={q.id} className="pb-6 border-b border-gray-100 last:border-0">
                            <p className="font-medium text-lg text-gray-900 mb-4">
                                {idx + 1}. {q.text}
                            </p>
                            <div className="space-y-3">
                                {q.options?.map(option => (
                                    <label
                                        key={option}
                                        className={`flex items-center p-3 rounded border cursor-pointer ${fb
                                            ? (option === q.correctAnswer ? 'bg-green-50 border-green-500' : (answers[q.id] === option ? 'bg-red-50 border-red-500' : 'bg-gray-50 border-gray-200 opacity-50'))
                                            : (answers[q.id] === option ? 'bg-brand-50 border-brand-500 ring-1 ring-brand-500' : 'hover:bg-gray-50 border-gray-300')
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name={q.id}
                                            value={option}
                                            checked={answers[q.id] === option}
                                            onChange={(e) => !fb && handleOptionChange(q.id, e.target.value)}
                                            disabled={!!fb}
                                            className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300"
                                        />
                                        <span className="ml-3 text-gray-800">{option}</span>
                                    </label>
                                ))}
                            </div>
                            {fb && !isCorrect && (
                                <p className="mt-2 text-sm text-red-600 font-medium">
                                    {fb.message}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            {!hasPassed && (
                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || Object.keys(answers).length < finalAssessmentQuestions.length}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
                    </button>
                </div>
            )}
        </div>
    );
}
