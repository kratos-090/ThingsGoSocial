require('./db/mongoose');

const express = require('express');
const app = express();
const StudentRoute = require('./routes/student.route');

app.use(express.json());
app.use(StudentRoute);




module.exports = app;