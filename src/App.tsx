
import { AppShell } from './components/layout/AppShell';
import { Section } from './components/training/Section';
import { trainingContent } from './data/content';
import { TrainingProvider, useTraining } from './store/useTrainingStore';
import { Shield, Clock, Users } from 'lucide-react';

function TrainingApp() {
  const { startTraining, isTrainingStarted } = useTraining();

  return (
    <AppShell>
      {!isTrainingStarted ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
          <div className="bg-brand-50 p-6 rounded-full mb-8">
            <Shield className="w-20 h-20 text-brand-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-6 max-w-4xl">
            {trainingContent.title}
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 text-gray-500 mb-12">
            <div className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              <span>{trainingContent.audience}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{trainingContent.estimatedDuration}</span>
            </div>
          </div>

          <div className="max-w-2xl text-lg text-gray-600 mb-12 leading-relaxed">
            {trainingContent.purpose}
          </div>

          <button
            onClick={startTraining}
            className="px-8 py-4 text-xl font-bold rounded-lg shadow-lg text-white bg-brand-600 hover:bg-brand-700 hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-brand-500 focus:ring-opacity-50"
          >
            Start Training
          </button>
        </div>
      ) : (
        <div className="pb-24">
          {trainingContent.sections.map(section => (
            <Section key={section.id} section={section} />
          ))}
        </div>
      )}
    </AppShell>
  );
}

export default function App() {
  return (
    <TrainingProvider>
      <TrainingApp />
    </TrainingProvider>
  );
}
