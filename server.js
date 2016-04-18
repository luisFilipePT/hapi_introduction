'use strict';

const Hapi = require('hapi');

// Require the JSON file that mimics the database
var menuDB = require('./menu.json');

// Create a new server instance
const server = new Hapi.Server();

// Set the connection 
server.connection({ 
    host: 'localhost', 
    port: 3000 
});

// Setup our initial route 
server.route({
    method: 'GET',
    path:'/menu', 
    handler: function (request, reply) {
    	// listen and respond to the browser request
        return reply(menuDB);
    }
});

// Start the server
server.start((err) => {
    console.log('Server running at:', server.info.uri);
});