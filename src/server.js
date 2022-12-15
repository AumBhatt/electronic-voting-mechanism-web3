var express = require('express');
var app = express();

//JSON file for deployed contract and network information
const electionJSON = require('../build/contracts/Election.json')

// require("dotenv").config();

app.use(express.static("./"));

app.get('/', (req,res) => {
    console.log(req.url);
    res.send('index.html');
});

app.all('/electionJSON', (req,res) => {
    console.log("electionJSON");
    res.send(electionJSON);
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started at 3000');
});