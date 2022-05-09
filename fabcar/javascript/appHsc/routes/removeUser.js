/**
 * Hyperledger Fabric REST API
 * @nickspiess -  help from @rbole
 */


 'use strict';
 module.exports = async function (req, contract) {

    // Get keys and value from POST request
    //let email = req.body.email;
    let queryKey = req.params.key;
    

    try {
        /*
        Submit spec. transaction
        Submit a transaction to the ledger.  Transaction function name will be evaluated
        on the endorsing peers and then submitted to the ordering service for committing to the  ledger
        */
       //updated submit transaction - createUser()
       let result = await contract.submitTransaction('DeleteAsset', queryKey);

        // Contruct the final return object
        let r = {
            key: queryKey,
            value: result.toString()
        };
        return r;
    } catch(err) {
        //console.log('Failed to evaluate trnsaction:', err)
        let r = {return:'Failed to evaluate transaction: '+err};
        return r;
    }
 }