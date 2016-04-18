'use strict';

const Hapi = require('hapi');

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
        return reply('Welcome to the best pizza API in town');
    }
});

// Start the server
server.start((err) => {
    console.log('Server running at:', server.info.uri);
});