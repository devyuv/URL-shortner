const express = require('express');
const { connectToMongoDB } = require('./connect');
const urlRoute = require('./routes/url');
const URL = require("./models/url");
const app = express(); //creates an application
const PORT = 8002;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(() => console.log('Mongodb connected')  //applying listener
);
app.use(express.json());

app.use("/url", urlRoute);

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, { $push: {
        visitHistory: {
            timestamp: Date.now(),
        },
    }, 
});
    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`)); //Converting to string literals
//then proceed to create route, model, view and controllers
