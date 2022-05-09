/**
 * HyperLedger Fabric REST API
 * @nickspiess
 */

 'use strict';
 module.exports = async function (req, contract) {

    // Get teh key from the GET request and set it to lowercase b/c of chaincode
    //let username = req.params.email;
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
        //console.log(queryKey);
        //console.log("this is our request in index-query: " + JSON.stringify(req));
        let result = await contract.evaluateTransaction('queryUser',queryKey);
        console.log(`Transaction 2 has been evaluated, result is: ${result.toString()}\n`);

        // Contruct the final return object
        //let r = {
        //    email: result.email,
        //    password: result.password
        //};
        //console.log('our result is : ' + result.email.toString())
        return result;
    } catch(err) {
        //console.log('Failed to evaluate trnsaction:', err)
        let r = {return:'Failed to evaluate transaction: '+err};
        return r;
    }
 }