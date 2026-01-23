import express from 'express';
import submitAssessment from './api/submit-assessment.js';
import reportIncident from './api/report-incident.js';

const app = express();
app.use(express.json());

// Wrapper to adapt Vercel-style handler to Express
const adapt = (handler) => (req, res) => {
    return handler(req, res);
};

app.post('/api/submit-assessment', adapt(submitAssessment));
app.post('/api/report-incident', adapt(reportIncident));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API Server running on http://localhost:${PORT}`);
});
