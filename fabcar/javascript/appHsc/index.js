/**
 * Hyperledger Fabric Node.js SDK REST API
 * Interaction with the network.sh example chaincode
 * @nickspiess
 */

 // ---------------------------------
 // requirements
 // ---------------------------------


 // We include some requirements
 const express = require('express');
 const bodyParser = require('body-parser');

 // we include our API endpoint code
 // General query
 let query = require('./index-query');
 // General DB invoke
 let invoke = require('./index-set');

// update financial login attributes
 //let updateFinancialAttributes = require('./financialLogin.js');

 // update address login attributes
 let updateContactInfo = require('./updateContactInfo');

 // change major
 let changeMajor = require('./changeMajor');


 // We include our connection model
 let connectToContract = require('./connect');

 // We include our config file
 let config = require('./config.json');

 // We define a global variable/pointer to catch on interrupt signal
 // and do a disconnect from the gateway
 let gateway;

 // ---------------------------------
 // express.js
 // ---------------------------------

 // create based express instance
 const app = express();

 // Include the bodyParser for post requests
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({
     extended: true
 }));

 // On start, connect to gateway
 connectToContract(config).then(function(connection){
     // Connection is established we are ready to start the API server
     // We set the global gateway pointer to disconnect the connect on interruption
     gateway = connection.gateway;

     console.log('- connection to fabric network ready')
      // ---------------------------------
      // We implement the api endpoints.
      // All results are formatted as json strings
      // ---------------------------------

      // We check if API is funning
      app.get('/', function (req, res) {
          res.json({msg:'hello fabric api'});
      })

      // Query by key (a || b)
      // @apiParam {string} [a,b]
      app.get('/query/:key', async function (req, res) {
          let result = await query(req, connection.contract)
          res.json(result);
      })

      // We transfer a value from A to B or from B to A
      // @apiParam {string} p1 [A, B]
      // @apiParam {string} p2 [A, B]
      // @apiParam {string} value value to transfer
      app.post('/invoke', async function (req, res) {
          let result = await invoke(req, connection.contract)
          res.json(result);
      })

      // update financial attributes
      app.post('/updateFinancialAttributes', async function (req, res) {
        let result = await updateFinancialAttributes(req, connection.contract)
        res.json(result);
    })

    // update contact info
    // Sending JSON format req string of all info : username, address, zip, state, phone
    app.post('/updateContactInfo', async function (req, res) {
        let result = await updateContactInfo(req, connection.contract)
        res.json(result);
    })

    // update contact info
    // Sending JSON format req string of all info : username, address, zip, state, phone
    app.post('/changeMajor', async function (req, res) {
        let result = await changeMajor(req, connection.contract)
        res.json(result);
    })

      // finally, we start the API server
      app.listen(3000, function() {
          console.log('- api server started listening on port 3000')
      });
 })

// ---------------------------------
 // we disconnect from the gateway CTRL-C
 // ---------------------------------

 process.on('SIGINT', async function   () {
     console.log("Caught interrupt signal - starting disconnect from the gateway");
     // Disconnect from the gateway
     await gateway.disconnect();
     process.exit();
 });