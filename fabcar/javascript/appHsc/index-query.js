/**
 * HyperLedger Fabric REST API
 * @nickspiess
 */

 'use strict';
 module.exports = async function (req, contract) {

    // Get teh key from the GET request and set it to lowercase b/c of chaincode
    let queryKey = req.params.key;
    //queryKey = queryKey.toLowerCase();

    try {

        /*
        * Evaluate the specified transaction
        * Evaluate a transaction function and return its results. Transaction function name
        * will be evaluated on the endorsing peers but the responses will not be sent to the
        * ordering service and hence will not be committed to the ledger.  This is used for
        * querying the world state
        */

        let result = await contract.evaluateTransaction('queryUser',queryKey);

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