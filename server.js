const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const DB_FILE = './db.json';

app.get('/load/:userId', (req, res) => {
    const db = fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE)) : {};
    res.json(db[req.params.userId] || { level: 1, scrap: 0 });
});

app.post('/save', (req, res) => {
    const { userId, level, scrap } = req.body;
    const db = fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE)) : {};
    db[userId] = { level, scrap };
    fs.writeFileSync(DB_FILE, JSON.stringify(db));
    res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));