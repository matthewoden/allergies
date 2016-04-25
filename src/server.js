const Hapi = require('hapi');
const Firebase = require('firebase');
const config = require('../config');
const dataRef = new Firebase('https://knnallergy.firebaseio.com/');
const FirebaseTokenGenerator = require("firebase-token-generator");
const tokenGenerator = new FirebaseTokenGenerator(config.firebase);
const token = tokenGenerator.createToken({ uid: "allergyServer" });
const scraper = require('./scraper')
const server = new Hapi.Server();

dataRef.authWithCustomToken(token, function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Login Succeeded!", authData);
  }
}, { expires: null });

server.connection({ port: 3000 });

server.route({
    method: 'POST',
    path: '/survey',
    handler: function (request, reply) {
      scraper.fetchPollenRecord().then((record) => {
        // Add KNN here.
      })
      reply(payload)
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
