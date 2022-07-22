const express = require("express");
const app = express();

const cors = require('cors');
const multer = require('multer');

// const upload = multer({dest: './uploads'});

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/', require('./Routes'))

app.listen(3000, () => console.log(`Server Up: ${PORT}`))
require('./DL/db').connect();

