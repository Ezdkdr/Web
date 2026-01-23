export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { answers } = req.body || {};
    if (!answers || !Array.isArray(answers)) {
        return res.status(400).json({ message: 'Invalid payload' });
    }

    // Scoring Logic (duplicated/shared with frontend, but server is authority)
    // In a real app, fetch questions from DB. Here we hardcode or import.
    // We'll define the answers here for security.
    const correctAnswers = {
        "fa-1": "Phishing emails",
        "fa-2": "Use unique passwords and MFA",
        "fa-3": "Report it to IT",
        "fa-4": "Data can be intercepted",
        "fa-5": "Everyone"
    };

    let correctCount = 0;
    const feedback = [];

    for (const answer of answers) {
        const correctVal = correctAnswers[answer.id];
        if (correctVal) {
            const isCorrect = answer.value === correctVal;
            if (isCorrect) correctCount++;
            feedback.push({
                id: answer.id,
                correct: isCorrect,
                message: isCorrect ? "Correct" : `Incorrect. Correct answer: ${correctVal}`
            });
        }
    }

    const score = Math.round((correctCount / Object.keys(correctAnswers).length) * 100);
    const pass = score >= 80;

    return res.status(200).json({
        score,
        pass,
        feedback
    });
}
