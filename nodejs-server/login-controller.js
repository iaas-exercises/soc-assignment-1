const express = require('express');
const router = express.Router();
const common = require('./common');

router.route('/')
.get((req, res) => {
    console.debug('I am the GET login!');

    if (req.query.username === 'admin' && req.query.password === 'admin'){
        res.send('You accessed the treasure!');
    } else {
        res.send('Login Failed!');
    }
    
})
.post((req, res) => {
    console.debug('I am the POST login!');
    console.debug(req.body);
    if (req.body.username === 'admin' && req.body.password === 'admin'){
        res.send('You accessed the treasure!');
    } else {
        res.send('Login Failed!');
    }
});

module.exports = router