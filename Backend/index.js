const connectToMongo = require('./db');
connectToMongo();
const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`iNoteBook backend listening at http://localhost:${port}`);
});