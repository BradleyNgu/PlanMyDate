require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

app.post('/api/get-suggestions', async (req, res) => {
    const { prompt, max_tokens } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPEN_AI_API_KEY}`
            },
            body: JSON.stringify({
                prompt,
                max_tokens
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching from OpenAI:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});