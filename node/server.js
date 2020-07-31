const express = require('express');

const app = express();

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
    console.log('<h1>Hellloooo</h1>')
    next()
})

app.get('/', (req, res) => {
    res.send("getting root");
})





app.listen(3000)

//req.headers instead of req.header
