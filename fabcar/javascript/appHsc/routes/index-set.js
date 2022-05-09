/**
 * Hyperledger Fabric REST API
 * @nickspiess -  help from @rbole
 */


 'use strict';
 module.exports = async function (req, contract) {

    // Get keys and value from POST request
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let major = req.body.major;
    let year = req.body.year;
    let id = req.body.id;
    let address = req.body.address;
    
    try {
        console.log('we in')
        /*
        Submit spec. transaction
        Submit a transaction to the ledger.  Transaction function name will be evaluated
        on the endorsing peers and then submitted to the ordering service for committing to the  ledger
        */
       //updated submit transaction - createUser()
       await contract.submitTransaction('createUser', email, password, username, 
       firstName, lastName, major, year, id, address);

       // Prepare the return value
       let r = 'Transaction has been sucessfully submitted: '+username;
       return r;
    }
    catch(error) {
        let r = {r:'Failed to submit transaction: '+error};
        return r;
    }
 }