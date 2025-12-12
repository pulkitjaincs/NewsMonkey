

export default async function handler(req, res) {
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { category, page, pageSize, country, q } = req.query;
    const apiKey = process.env.VITE_NEWS_API;

    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    try {
        let url = `https://newsapi.org/v2/top-headlines?country=${country || 'in'}&category=${category || 'general'}&apiKey=${apiKey}&page=${page || 1}&pageSize=${pageSize || 10}`;

        // If there's a search query, assume 'everything' endpoint or handle accordingly
        // For this app, it seems we primarily use top-headlines based on categories
        // If 'q' is present for search (future feature), we might use 'everything' endpoint

        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'error') {
            return res.status(response.status).json(data);
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news', details: error.message });
    }
}
