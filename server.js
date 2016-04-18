'use strict';

const Hapi = require('hapi');

// Create a new server instance
const server = new Hapi.Server();

// Set the connection 
server.connection({ 
    host: 'localhost', 
    port: 3000 
});

// Start the server
server.start((err) => {
    console.log('Server running at:', server.info.uri);
});