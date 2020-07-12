const express = require('express');
const router = express.Router();
const path = require('path');
const common = require('./common');
const fs = require('fs');


router.route('/')
    .get((req, res) => {
        res.status(200).json(parseShoppingCartSync());
    })
    .post((req, res) => {
        console.debug('Post: item: %j', req.body);
        var newKey = addItemToShoppingCartSync(req.body);
        res.setHeader('Location', common.getBaseUrl(req) + '/shopping-cart/' + newKey);
        res.sendStatus(201);
    });


router.route('/:itemIndex')
    .get((req, res) => {
        var itemIndex = req.params.itemIndex;
        var jsonAll = parseShoppingCartSync();

        if (itemIndex in jsonAll) {
            if (req.accepts('application/json') && req.accepts('text/html')) {
                var html =
                    `
                <!DOCTYPE html>
                    <html>
                    
                    <head>
                        <meta charset='utf-8'>
                        <title>Mutliple Choices</title>
                    </head>
                    
                    <body>
                        <H3>Multiple Choices</H3>
                        <H4>Multiple representation of the requested item exist:</H4>
                        <ul>
                            <li> 
                                JSON representation can be accessed via <a href="${common.getBaseUrl(req)}/shopping-cart/${itemIndex}/json">/shooping-cart/${itemIndex}/json</a>
                            </li>
                            <li> 
                                HTML representation can be accessed via <a href="${common.getBaseUrl(req)}/shopping-cart/${itemIndex}/html">/shooping-cart/${itemIndex}/html</a>
                            </li>
                        </ul>
                    </body>
                    
                    </html>
                `;

                res.status(300).contentType('text/html').send(html);
            } else if (req.accepts('application/json')) {
                var jsonRepresentation = jsonAll[itemIndex];
                res.status(200).json(jsonRepresentation);
            } else if (req.accepts('text/html')) {
                res.setHeader('Content-type', 'text/html');
                var html = generateHtmlRepresentation(itemIndex, jsonAll);
                res.send(html);
            } else {
                var html =
                    `
                <!DOCTYPE html>
                    <html>
                    
                    <head>
                        <meta charset='utf-8'>
                        <title>Not Accepted</title>
                    </head>
                    
                    <body>
                        <H3>Not Accepted</H3>
                        <H4>User prferences cannot be matched by the server. Available options are:</H4>
                        <ul>
                            <li> 
                                JSON representation can be accessed via <a href="${common.getBaseUrl(req)}/shopping-cart/${itemIndex}/json">/shooping-cart/${itemIndex}/json</a>
                            </li>
                            <li> 
                                HTML representation can be accessed via <a href="${common.getBaseUrl(req)}/shopping-cart/${itemIndex}/html">/shooping-cart/${itemIndex}/html</a>
                            </li>
                        </ul>
                    </body>
                    
                    </html>
                `;

                res.status(406).contentType('text/html').send(html);
            }
        } else {
            res.sendStatus(404);
        }
    })
    .delete((req, res) => {
        var itemIndex = req.params.itemIndex;
        var jsonAll = parseShoppingCartSync();

        if (itemIndex in jsonAll) {
            delete jsonAll[itemIndex];
            storeShoppingCartSync(jsonAll);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    })
    .put((req, res) => {
        var itemIndex = req.params.itemIndex;
        var item = req.body;
        console.debug('PUT id: %d value: %j', itemIndex, item);

        var jsonAll = parseShoppingCartSync();

        if (itemIndex in jsonAll) {
            jsonAll[itemIndex] = item;
            storeShoppingCartSync(jsonAll);
            res.sendStatus(200);
        } else {
            jsonAll[itemIndex] = item;
            storeShoppingCartSync(jsonAll);
            res.setHeader('Location', common.getBaseUrl(req) + '/shopping-cart/' + itemIndex);
            res.sendStatus(201);
        }
    });

router.route('/:itemIndex/json')
    .get((req, res) => {
        var itemIndex = req.params.itemIndex;
        var jsonAll = parseShoppingCartSync();

        if (itemIndex in jsonAll) {
            var jsonRepresentation = jsonAll[itemIndex];
            res.status(200).json(jsonRepresentation);
        } else {
            res.sendStatus(404);
        }
    });

router.route('/:itemIndex/html')
    .get((req, res) => {
        var itemIndex = req.params.itemIndex;
        var jsonAll = parseShoppingCartSync();

        if (itemIndex in jsonAll) {
            var html = generateHtmlRepresentation(itemIndex, jsonAll);
            res.status(200).contentType('text/html').send(html);
        } else {
            res.sendStatus(404);
        }
    });

/* Helper Methods */
function parseShoppingCartSync() {
    var obj = JSON.parse(fs.readFileSync(path.join(__dirname, '/resources/shopping-cart.json'), 'utf8'));

    return obj;
}

function generateNewKey(allItemsDict) {
    var allKeys = Object.keys(allItemsDict);
    var maxKey = Math.max(...allKeys);

    return maxKey + 1;
}

function addItemToShoppingCartSync(item) {
    var allItemsDict = parseShoppingCartSync();
    var newKey = generateNewKey(allItemsDict);
    allItemsDict[newKey] = item;
    storeShoppingCartSync(allItemsDict);

    return newKey;
}

function storeShoppingCartSync(allItemsDict) {
    try {
        fs.writeFileSync(path.join(__dirname, '/resources/shopping-cart.json'), JSON.stringify(allItemsDict));
    } catch (err) {
        // An error occurred
        console.error(err);
    }
}

function generateHtmlRepresentation(itemIndex, jsonAll) {
    var htmlRepresentation =
        `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset='utf-8'>
        <title>Shopping List Item</title>
    </head>
    
    <body>
        <H3>Shopping Cart Item</H3>
        <p> <b>Item Key: </b> ${itemIndex}</p>
        <p> <b>Item Name: </b> ${jsonAll[itemIndex].name} </p>
        <p> <b>Item Quantity: </b> ${jsonAll[itemIndex].quantity} </p>
    </body>
    
    </html>`;

    return htmlRepresentation;
}


module.exports = router