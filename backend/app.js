require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', require('./router.js'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server running on port 3000');
});
