const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const correctAnswers = {
    q1: 'B',  // Paris is correct
    q2: 'A',  // Shakespeare is correct
    // Add other correct answers here
};

app.post('/submit', (req, res) => {
    const { roll, answers } = req.body;
    let marks = 0;

    // Check answers and calculate marks
    for (let question in answers) {
        if (answers[question] === correctAnswers[question]) {
            marks++;
        }
    }

    // Send result to Telegram
    const message = `Roll: ${roll}\nMarks: ${marks}`;
    const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`;

    axios.post(telegramUrl, {
        chat_id: '906269717',  // Your Telegram chat ID
        text: message
    }).then(() => {
        console.log('Message sent to Telegram');
    }).catch(err => {
        console.error('Error sending to Telegram:', err);
    });

    res.json({ marks });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
