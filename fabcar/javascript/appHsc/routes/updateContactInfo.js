/**
 * HyperLedger Fabric REST API
 * @nickspiess
 */

 'use strict';
 module.exports = async function (req, contract) {

    // Get the key from the GET request and set it to lowercase b/c of chaincode
    // Receive string of JSON format of username, address, zip, state, phone
    //let queryKey = req.params.key;
    // Get keys and value from POST request

    let username = req.body.username;
    
    // UPDATE TO CONTACT INFO
    let address = req.body.address;
    let zip = req.body.zip;
    let state = req.body.state;
    let phone = req.body.phone;


    try {

        /*
        * Evaluate the specified transaction
        * Evaluate a transaction function and return its results. Transaction function name
        * will be evaluated on the endorsing peers but the responses will not be sent to the
        * ordering service and hence will not be committed to the ledger.  This is used for
        * querying the world state
        */
        
        console.log('values: ' + ' ' + username + ' ' + address + ' ' + zip + ' ' + state + ' '  + phone);

        await contract.evaluateTransaction('updateContactInformation',username, address);

        // Contruct the final return object
        let r = 'Transaction has been sucessfully submitted: '+username;
        return r;
    } catch(err) {
        //console.log('Failed to evaluate trnsaction:', err)
        console.error('Failed to submit transaction:', err);
        let r = {return:'Failed to evaluate transaction: '+err};
        return r;
    }
 }

 