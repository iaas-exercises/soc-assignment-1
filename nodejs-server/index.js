/* MIT License - 2020 */
/* Author: Ghareeb Falazi */
/* Based on: https://www.digitalocean.com/community/tutorials/nodejs-express-routing */
 
/* Configuration */
const express = require('express');
const path = require('path');
const shoppingCartController = require('./shopping-cart-controller');
const loginController = require('./login-controller');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.raw());



/* '/' path */
app.get('/', (req, res)=>{
    res.send('This is the root path!');
});

/* '/wisdom' path */
app.get('/wisdom', (req, res)=>{
    res.sendFile(path.join(__dirname, '/resources/my_daily_wisdom.html'));
});

app.use('/shopping-cart', shoppingCartController);

app.use('/login', loginController);


app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));

