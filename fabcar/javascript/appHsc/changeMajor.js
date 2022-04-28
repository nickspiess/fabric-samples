/**
 * Hyperledger Fabric REST API
 * @nickspiess -  help from @rbole
 */


 'use strict';
 module.exports = async function (req, contract) {

    // Get keys and value from POST request
    let username = req.body.username;
    let major = req.body.major;
    

    try {
        /*
        Submit spec. transaction
        Submit a transaction to the ledger.  Transaction function name will be evaluated
        on the endorsing peers and then submitted to the ordering service for committing to the  ledger
        */
       //updated submit transaction - createUser()
       await contract.submitTransaction('changeUserMajor', username, major);

       // Prepare the return value
       let r = 'Transaction has been sucessfully submitted: '+username;
       return r;
    }
    catch(error) {
        let r = {r:'Failed to submit transaction: '+error};
        return r;
    }
 }