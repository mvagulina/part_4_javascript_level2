const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use('/', express.static('client'));
app.get('/products', (req, res) => {
    fs.readFile('server/json/catalog.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    });
});

const port = 3000;
app.listen(port, () => console.log(`Listening on localhost:${port}`));