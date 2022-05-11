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
 const PORT = process.env.port || 4000;
 const util = require('util')

 // ---------------------------------
 // express.js
 // ---------------------------------
 // create based express instance
 const app = express();

 const cors = require("cors");
 app.use(cors());

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
//app.use(bodyParser.json())
app.use(express.json())
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

 // we include our API endpoint code
 // General query
 let query = require('./routes/index-query');
 // General DB invoke
 let invoke = require('./routes/index-set');

 let remove = require('./routes/removeUser');

 let queryAll = require('./routes/queryAllUsers')

// update financial login attributes
 let updateFinancialInformation = require('./routes/updateFinancialInfo');

 // update address login attributes
 let updateContactInfo = require('./routes/updateContactInfo');

 // change major
 let changeMajor = require('./routes/changeMajor');


 // We include our connection model
 let connectToContract = require('./connect');

 // We include our config file
 let config = require('./config.json');

 // We define a global variable/pointer to catch on interrupt signal
 // and do a disconnect from the gateway
 let gateway;

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
      app.get("/", (req, res) => {
        res.json({message:'hello fabric api'});
        })

        // General 404 error for a route not existing
        //app.get("*", (req, res) => 
        //res
        //    .status(404)
        //    .json({ message: "Route does not exist", app: "Seam" })
        //);

      // Query by key (a || b)
      // @apiParam {string} [a,b]
      // :key /query/:key
      app.get('/query/:key', async function (req, res) {
          let result = await query(req, connection.contract)
          // Try to send if no error
          try  {
            let response = JSON.parse(result.toString());
            res.set('Content-Type', 'application/json');
            res.send({response})

          }// if error, send the result w/o json formatting 
          catch(err) {
              res.send({result})
          }
      })

      /*app.get('/query/:key', (req, res)=> {
        console.log("we are logging  " + req.toString())
      let result = queryUser(req, connection.contract)
      res.json(result);
      //res.send("Returned Users")
  })*/

      app.get('/queryAllUsers', async (req, res)=> {
        const userObj = {
            username: 'jahan'
        }
        let result = await queryAll(req, connection.contract)
        console.log(result);
        res.json(result);
    })

      // We transfer a value from A to B or from B to A
      // @apiParam {string} p1 [A, B]
      // @apiParam {string} p2 [A, B]
      // @apiParam {string} value value to transfer
      app.post('/invoke', async function (req, res) {
          let result = await invoke(req, connection.contract)
          // Try to send if no error
          try  {
            let response = JSON.parse(result.toString());
            //res.set('Content-Type', 'application/json');
            res.send({response})
          }// if error, send the result w/o json formatting 
          catch(err) {
              res.send({result})
          }
          //res.json(result);
      })

      app.delete('/remove', async function (req, res) {
        let result = await remove(req, connection.contract)
        res.json(result);
    })

      // update financial attributes
      app.post('/updateFinancialInformation', async function (req, res) {
          console.log("our request is : " + req)
        let result = await updateFinancialInformation(req, connection.contract)
        // Try to send if no error
        try  {
          let response = JSON.parse(result.toString());
          //res.set('Content-Type', 'application/json');
          res.send({response})
        }// if error, send the result w/o json formatting 
        catch(err) {
            res.send({result})
        }
    })

    // update contact info
    // Sending JSON format req string of all info : username, address, zip, state, phone
    app.post('/updateContactInfo', async function (req, res) {
        let result = await updateContactInfo(req, connection.contract)
        // Try to send if no error
        try  {
          let response = JSON.parse(result.toString());
          //res.set('Content-Type', 'application/json');
          res.send({response})
        }// if error, send the result w/o json formatting 
        catch(err) {
            res.send({result})
        }
    })

    // update contact info
    // Sending JSON format req string of all info : username, address, zip, state, phone
    app.post('/changeMajor', async function (req, res) {
        let result = await changeMajor(req, connection.contract)
        res.json(result);
    })

      // finally, we start the API server
      app.listen(PORT, () => {
          const url = 'http://localhost:4000'
          console.log('- api server started listening on port 4000')
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