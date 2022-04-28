/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 *  SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const { Wallets } = require('fabric-network');
const path = require('path');

const fixtures = path.resolve(__dirname, '../../../fabric-samples/test-network');



//config
let config = {
    pathToUser:'organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com',
    pathToUserCert: '/msp/signcerts/cert.pem',
    //pathToUserCert: '/msp/signcerts/User1@org1.example.com-cert.pem',
    pathToUserPrivKey: '/msp/keystore/priv_sk',
    identityLabel: 'User1@org1.example.com'
}

async function main() {

    // A wallet stores a collection of identities
    const wallet = await Wallets.newFileSystemWallet('../wallet');

    // Main try/catch block
    try {


        // Identity to credentials to be stored in the wallet
        const credPath = path.join(fixtures, config.pathToUser);
        const certificate = fs.readFileSync(path.join(credPath, config.pathToUserCert)).toString();
        const privateKey = fs.readFileSync(path.join(credPath, config.pathToUserPrivKey)).toString();

        // Load credentials into wallet
        const identityLabel = config.identityLabel;

        const identity = {
            credentials: {
                certificate,
                privateKey
            },
            mspId: 'Org1MSP',
            type: 'X.509'
        }

        await wallet.put(identityLabel, identity);

    } catch (error) {
        console.log(`Error adding to wallet. ${error}`);
        console.log(error.stack);
    }
}

main().then(() => {
    console.log('done');
}).catch((e) => {
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
});
