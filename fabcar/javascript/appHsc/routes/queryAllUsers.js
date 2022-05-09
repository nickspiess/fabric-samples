/**
 * Hyperledger Fabric REST API
 * @nickspiess -  help from @rbole
 */


 'use strict';
 module.exports = async function (req, contract) {


    try {
        /*
        Submit spec. transaction
        Submit a transaction to the ledger.  Transaction function name will be evaluated
        on the endorsing peers and then submitted to the ordering service for committing to the  ledger
        */
       //updated submit transaction - createUser()
       const result = await contract.evaluateTransaction('queryAllUsers');
       console.log(`Transaction 1 has been evaluated, result is: ${result.toString()}\n`);
       // Prepare the return value
       //let r = 'Transaction has been sucessfully submitted: '+username;
       return result;
    }
    catch(err) {
        let r = {result:'Failed to submit transaction: '+error};
        return r;
    }
 }