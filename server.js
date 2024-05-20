
const express = require('express');
const cors = require('cors');
const { getData } = require('./try');
// server.js

const app = express();
const port = 3000;

// Define a route

app.use(cors());
app.use(express.json())

app.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const length = 10;
    const data = await getData(page, length);
    const totalPages = Math.ceil(data.recordsTotal / length);
    res.json({status: "ok", page: page, recordsTotal: data.recordsTotal, totalPages: totalPages, data: data.data,});
});

// Start the server 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
