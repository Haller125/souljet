const express = require('express');
const app = express();

const path = require('path');
const PORT = 5000;

app.use(express.static(path.join(__dirname, 'Html')));
app.use(express.static(path.join(__dirname, 'Css')));
app.use(express.static(path.join(__dirname, 'Javascript')));
app.use(express.static(path.join(__dirname, 'Images')));
app.use('/Css', express.static(path.join(__dirname, 'Css')));
app.use('/Javascript', express.static(path.join(__dirname, 'Javascript')));
app.use('/Images', express.static(path.join(__dirname, '/Images')));

app.get('/', (req, res) => {
res.sendFile(`${__dirname}/Html/MainPage.html`);
});

app.get('/profile', (req, res) => {
    res.sendFile(`${__dirname}/Html/profile.html`);
});

app.get('/registration', (req, res) => {
    res.sendFile(`${__dirname}/Html/Registration.html`);
});

app.get('/notes', (req, res) => {
    res.sendFile(`${__dirname}/Html/notes.html`);
});

app.post('/profile', (req, res) => {
    console.log(req.body);
   res.send("recieved your request!");
});

app.listen(PORT, () => {
    console.log('Application listening on port ' + PORT);
});