const express = require('express');
const app = express();
const fs = require('fs');

const cartFileName = "server/json/cart.json";

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

app.get('/cart', (req, res) => {
    if (fs.existsSync(cartFileName)) {
        fs.readFile(cartFileName, 'utf-8', (err, data) => {
            if (err) {
                res.sendStatus(404, JSON.stringify({result: 0, text: err}));
            } else {
                if (!data)
                    data = [];
                res.send(data);
            }
        });
    } else {
        res.send([]);
    }
});

app.post('/cart', (req, res) => {
    fs.readFile(cartFileName, 'utf-8', (err, data) => {
        if (err) {
            console.log('error');
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            let cart = [];
            if (data) {
                cart = JSON.parse(data);
            }
            fs.writeFile(cartFileName, JSON.stringify(cart.concat(req.body)), err => {
                if (err) {
                    res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                } else {
                    res.send(JSON.stringify({result: 1}));
                }
            });
        }
    });
});

app.put('/cart/:id', (req, res) => {
    fs.readFile(cartFileName, 'utf-8', (err, data) => {
        if (err) {
            console.log('error');
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            let cart = [];
            if (data) {
                cart = JSON.parse(data);
            }
            let find = cart.find(el => el.id == +req.params.id);
            if (find)
                find.quantity += req.body.quantity;
            fs.writeFile(cartFileName, JSON.stringify(cart), err => {
                if (err) {
                    res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                } else {
                    res.send(JSON.stringify({result: 1}));
                }
            });
        }
    });
});

app.delete('/cart', (req, res) => {
    fs.readFile(cartFileName, 'utf-8', (err, data) => {
        if (err) {
            console.log('error');
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            let cart = [];
            if (data) {
                cart = JSON.parse(data);
            }
            console.log(`cart before ${cart} idx=${req.body.id} prod=${cart.indexOf(req.body)} body=${req.body}`);
            cart.splice(cart.indexOf(req.body), 1);
            console.log(cart);
            fs.writeFile(cartFileName, JSON.stringify(cart), err => {
                if (err) {
                    res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                } else {
                    res.send(JSON.stringify({result: 1}));
                }
            });
        }
    });
});

const port = 3000;
app.listen(port, () => console.log(`Listening on localhost:${port}`));