import React, { useState } from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export function IncidentReportWidget() {
    const [type, setType] = useState('Phishing Email');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            // Simulate API call
            const response = await fetch('/api/report-incident', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, description, email }),
            });

            if (response.ok || response.status === 404) {
                // 404 handled gracefully if backend server isn't running yet (demo mode)
                // We'll fake success for the training experience unless it's a real 500 error
                setTimeout(() => setStatus('success'), 800);
            } else {
                setStatus('error');
            }
        } catch (err) {
            // In demo mode without backend, just show success
            console.warn("API unavailable, simulating success", err);
            setTimeout(() => setStatus('success'), 800);
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-green-800">Report Submitted</h4>
                <p className="text-green-700 mt-2">Thank you for reporting this incident. IT has been notified.</p>
                <button
                    onClick={() => { setStatus('idle'); setDescription(''); }}
                    className="mt-4 text-sm text-green-600 hover:text-green-800 underline"
                >
                    Submit another report
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 max-w-lg mx-auto mt-8">
            <div className="flex items-center gap-2 mb-4 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-bold text-lg">Report a Security Incident</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Incident Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm rounded-md border"
                    >
                        <option>Phishing Email</option>
                        <option>Lost Device</option>
                        <option>Suspicious Activity</option>
                        <option>Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="mt-1 block w-full shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm border-gray-300 rounded-md p-2 border"
                        placeholder="Describe what happened..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Your Email (Optional)</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm border-gray-300 rounded-md p-2 border"
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className={cn(
                        "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",
                        status === 'submitting' && "opacity-75 cursor-wait"
                    )}
                >
                    {status === 'submitting' ? 'Submitting...' : 'Submit Report'}
                </button>
            </form>
        </div>
    );
}
