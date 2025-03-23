const crypto = require('crypto');
const URL = require("../models/url"); //importing model

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: 'url is required' });
    
    // Check if URL already exists in database
    const existingURL = await URL.findOne({ redirectURL: body.url });
    if (existingURL) {
        return res.json({ id: existingURL.shortId });
    }
    
    const hash = crypto.createHash('md5').update(body.url).digest('hex');
    // Take first 8 characters of hash
    const shortID = hash.substring(0, 8);
    
    await URL.create({
        //creating new url in our db
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],  //createdata and updatedata itself managed
    });

    return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res){
    try {
        const shortId = req.params.shortId;
        const result = await URL.findOne({ shortId });
        
        if (!result) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        
        return res.json({ totalClicks: result.visitHistory.length });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
} 

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};
