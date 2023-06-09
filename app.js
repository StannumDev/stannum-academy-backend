const express = require('express')
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const cors = require('cors');
app.use(express.json());
app.use(cors());
require('./database/db');

const users = require('./routes/users');
const photos = require('./routes/photos');
const test = require('./routes/test');
const log = require('./routes/log');

app.use('/', users, photos, test, log);

app.listen(port, () =>  {
    console.log(`Working on port ${port}`);
});