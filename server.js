'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

// Require our json file / "database" controller
var menuController = require('./db_menu_controller');

// Create a new server instance
const server = new Hapi.Server();

// Set the connection 
server.connection({
    host: 'localhost',
    port: 3000
});

// Documentation options
const options = {
    info: {
        'title': 'Pizza API Documentation',
        'description': 'Best Pizza API in Town',
        'version': Pack.version,
        'contact': {
            'name':  'Luis Fílipe',
            'email': 'my.mail@gmail.com'
        }
    },
    'schemes': ['http'],
    'host': 'localhost:3000'
};

// Get all pizzas or pizzas by query
server.route({
    method: 'GET',
    path: '/menu',
    config: {
        handler: function (request, reply) {
            return reply(menuController.getPizzas(request.query)).code(menuController.responseCode());
        },
        description: 'Get all pizzas or query pizzas',
        notes: 'returns all pizzas from the menu or a query subset',
        tags: ['api'],
        validate: {
            query: {
                name: 'Margherita'
            }
        }
    }
});

// Get pizza by id
server.route({
    method: 'GET',
    path: '/menu/{pizzaId}',
    config: {
        handler: function (request, reply) {
            return reply(menuController.getPizzaById(request.params.pizzaId)).code(menuController.responseCode());
        },
        description: 'Get pizza by id',
        notes: 'returns the pizza if it exists',
        tags: ['api'],
        validate: {
            params: {
                pizzaId: 2
            }
        }
    }
});

// Add new pizza
server.route({
    method: 'POST',
    path: '/menu',
    config: {
        handler: function (request, reply) {
            return reply(menuController.postNewPizza(request.payload)).code(menuController.responseCode());
        },
        description: 'Add new pizza',
        notes: 'add new pizza to the pizzas menu',
        tags: ['api'],
        validate: {
            payload: {
                name: 'African Pizza',
                description: "Exotic pizza",
                ingredients: "Mozzarella Cheese, Banana",
                price: "11$"
            }
        }
    }
});

// Update pizza by id
server.route({
    method: 'PUT',
    path: '/menu/{pizzaId}',
    config: {
        handler: function (request, reply) {
            return reply(menuController.putUpdatePizza(request.params.pizzaId, request.payload)).code(menuController.responseCode());
        },
        description: 'Update pizza by id',
        notes: 'updates a pizza from the pizzas menu',
        tags: ['api'],
        validate: {
            params: {
                pizzaId: 3
            }
        }
    }
});

// Remove pizza by id
server.route({
    method: 'DELETE',
    path: '/menu/{pizzaId}',
    config: {
        handler: function (request, reply) {
            return reply(menuController.deleteRemovePizza(request.params.pizzaId)).code(menuController.responseCode());
        },
        description: 'Remove pizza by id',
        notes: 'removes a pizza from the pizzas menu',
        tags: ['api'],
        validate: {
            params: {
                pizzaId: 1
            }
        }
    }
});

// handle all other routes (404)
server.route({
    method: '*', // catch all methods
    path: '/{p*}', // catch-all other paths
    handler: function (request, reply) {
        //reply('The Pizza Slice you are looking for was Not Found on the API').code(404);
        reply.file('./404.html').code(404);
    }
});

// Start the server
server.register([
    Inert,
    Vision,
    {
        'register': HapiSwagger,
        'options': options
    }], (err) => {
    server.start((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Server running at:', server.info.uri);
        }
    });
});