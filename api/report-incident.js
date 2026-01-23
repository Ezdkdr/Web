export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { type, description, email } = req.body || {};

    if (!type || !description) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    // Simulate processing
    const referenceId = `INC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // In memory log (serverless is stateless but this might log to console)
    console.log('Incident Reported:', { type, description, email, referenceId });

    return res.status(200).json({
        ok: true,
        referenceId
    });
}
