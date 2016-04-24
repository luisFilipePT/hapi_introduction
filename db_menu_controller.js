'use strict';

// json file will simplify the process of working with the json file
var jsonFile = require('jsonfile');

// get our json file (our database)
var menuFile = './menu.json';

// object variable to hold our json content
var menuObj = jsonFile.readFileSync(menuFile);

// var to hold the response code of each response
var code  = 200; // Ok (Default)

// Get pizzas by query
exports.getPizzas = function (query) {

    // There is no query so return all pizzas
    if (Object.keys(query).length === 0) {

        return menuObj;
    } // Get the results that match the query
    else {
        // Array to keep the results of the query search
        var filteredPizzas = [];

        // For each pizza in our menu
        for (var i = 0; i < menuObj.pizzas.length; i++) {

            // If there is a pizza with the key/value of the query add it to our filtered pizzas
            if (menuObj.pizzas[i][Object.keys(query)[0]] === query[Object.keys(query)[0]])
                filteredPizzas.push(menuObj.pizzas[i]);
        }

        if (filteredPizzas.length === 0)
            code = 404 // Not Found

        return filteredPizzas;
    }
};

// Get pizza by id
exports.getPizzaById = function (pizzaId) {

    var out = {"result": "not found"};

    for (var i = 0; i < menuObj.pizzas.length; i++) {

        if (menuObj.pizzas[i].id === parseInt(pizzaId))
            out = menuObj.pizzas[i];
        else
            code = 404 // Not Found
    }

    return out;
};

// Add new pizza
exports.postNewPizza = function (newPizza) {

    newPizza.id = (menuObj.pizzas.length + 1);
    menuObj.pizzas.push(newPizza);
    code = 201 // Created

    jsonFile.writeFile(menuFile, menuObj, {spaces: 2}, function (err) {
        code = 500 //Internal Server Error
        return {"result": "Internal Server Error"};
    });

    return newPizza;
};


// Update pizza by id
exports.putUpdatePizza = function (pizzaId, pizzaToUpdate) {

    for (var i = 0; i < menuObj.pizzas.length; i++) {

        if (menuObj.pizzas[i].id === parseInt(pizzaId)) {

            menuObj.pizzas[i] = pizzaToUpdate;
            menuObj.pizzas[i].id = parseInt(pizzaId);
        }
    }

    jsonFile.writeFile(menuFile, menuObj, {spaces: 2}, function (err) {
        code = 500 //Internal Server Error
        return {"result": "Internal Server Error"};
    });

    return pizzaToUpdate;
};

// Remove pizza by id
exports.deleteRemovePizza = function (pizzaId) {

    for (var i = 0; i < menuObj.pizzas.length; i++) {

        if (menuObj.pizzas[i].id === parseInt(pizzaId)) {
            menuObj.pizzas.splice(i, 1);
        }
    }

    jsonFile.writeFile(menuFile, menuObj, {spaces: 2}, function (err) {
        code = 500 //Internal Server Error
        return {"result": "Internal Server Error"};
    });

    return {"result": "success"};
};

// Response code
exports.responseCode = function () {
    return code;
};
