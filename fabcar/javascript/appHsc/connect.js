/**
 * Hyperledger Fabric REST API
 * @nickspiess
 */

 'use strict';
 module.exports = function (config) {

    // We include to fabric requirements
    const {Wallets, Gateway } = require('fabric-network');

    // We include the path to construct the connection profile
    const path = require('path');
    const fs = require('fs');

    // We create a promise
    return new Promise (async (resolve, reject) => {

        // We construct the path to the connection profile
        //const ccpPath = path.resolve(__dirname, config.ccpPath);
        //let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const ccpPath = path.resolve(__dirname, '../../../test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities
        //const walletPath = path.join(process.cwd(), config.walletPath);
        const walletPath = path.join(process.cwd(), '../wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Create a new gateway for connecting to our peer node
        //const gateway = new Gateway();
        //await gateway.connect(ccp, { wallet, identity: config.userName, discovery: { enabled: true, asLocalhost: true } });

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });


        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');
        
        // Get the contract from the network.
        const contract = network.getContract('fabcar');   

            //Get the network (channel) our contract is deployed to
            //const network = await gateway.getNetwork(config.channel);

            // Get the contract from the network
            //const contract = network.getContract(config.cc);

            // We construct our retour object
            let result = {
                gateway: gateway,
                contract: contract
            }
            resolve(result);
        })
 }