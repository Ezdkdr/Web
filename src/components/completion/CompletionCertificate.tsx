
import { useTraining } from '../../store/useTrainingStore';
import { Award, Download } from 'lucide-react';

export function CompletionCertificate() {
    const { finalScore } = useTraining();
    const date = new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="bg-white border-4 border-double border-brand-200 p-8 md:p-12 rounded-lg text-center max-w-3xl mx-auto my-8 shadow-xl print:shadow-none print:border-4 print:my-0 print:w-full">
            <div className="flex justify-center mb-6">
                <Award className="w-20 h-20 text-brand-600" />
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2 uppercase tracking-widest">
                Certificate of Completion
            </h1>

            <p className="text-gray-500 italic mb-8">This is to certify that the employee has successfully completed</p>

            <h2 className="text-2xl font-bold text-brand-800 mb-8 max-w-xl mx-auto">
                Cybersecurity Awareness Training for Small Businesses in Canada
            </h2>

            <div className="grid grid-cols-2 gap-8 text-left max-w-md mx-auto mb-10 border-t border-b border-gray-100 py-6">
                <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Date Completed</p>
                    <p className="font-semibold text-gray-900">{date}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Score</p>
                    <p className="font-semibold text-gray-900">{finalScore}%</p>
                </div>
            </div>

            <div className="text-sm text-gray-500 mb-8">
                "I understand basic cybersecurity risks, know how to apply best practices, and agree to follow company security policies."
            </div>

            <div className="print:hidden">
                <button
                    onClick={handlePrint}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                >
                    <Download className="w-5 h-5 mr-2" />
                    Print / Save Certificate
                </button>
            </div>

            <div className="hidden print:block text-xs text-center text-gray-400 mt-12">
                Verified Training Record • CyberSecure Canada
            </div>
        </div>
    );
}
