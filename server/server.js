require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const apiRouter = require('./routes/apiRouter.js');
const loginRouter = require('./routes/loginRouter.js');
const db = require("./db/db.js");
const cookieParser = require('cookie-parser');

db.connect();

/* GLOBAL HANDLERS */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 

app.use(cors());

/* ROUTES */

app.use('/api', apiRouter);

app.use('/login', loginRouter);

app.use('/build', express.static(path.join(__dirname, '/build')));

app.get('*', (req, res) => {res.sendFile(path.join(__dirname, '../index.html'))});

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));