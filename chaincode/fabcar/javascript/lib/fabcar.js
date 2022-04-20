/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    // init ledger
    // Need for initLedger as deployChaincode method calls on this
    // Good practice to initialize the ledger
    async initLedger2(ctx) {
        // putState stores value in a key-value pair
        // await waits until method is executed
        await ctx.stub.putState("test", "hello world");
        return "success"
    }

    // writeData
    // ctx is a default parameter - context
    async writeData(ctx, key, value) {
        await ctx.stub.putState(key, value);
        return value;
    }

    // readData
    async readData(ctx, key) {
        var response = await ctx.stub.getState(key);
        return response.toString();
    }

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const users = [
            {
                username: 'nickspiess',
                ID: '1234',
                password: 'pw',
                email: 'spiess@gmail.com',
                firstName: 'Nick',
                lastName: 'Spiess',
                major: 'Liberal Studies',
                year: 'Senior',

            },
        ];

        // General putCommand 
        await ctx.stub.putState("test", "hello world");

        // Add users to a list or array of users in the database?
        for (let i = 0; i < users.length; i++) {
            users[i].docType = 'user';
            await ctx.stub.putState('USER' + i, Buffer.from(JSON.stringify(users[i])));
            console.info('Added <--> ', users[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryUser(ctx, username) {
        const userAsBytes = await ctx.stub.getState(username); // get the car from chaincode state
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(`${username} does not exist`);
        }
        console.log(userAsBytes.toString());
        return userAsBytes.toString();
    }

    async queryUserAttribute(ctx, username, attribute) {
        console.log("in the function 1")
        /*const userAsBytes = await ctx.stub.getState(username); // get the car from chaincode state
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(`${username} does not exist`);
        }
        user = JSON.parse(username.toString());
        console.log("in the function 2")
        //const user = JSON.parse(userAsBytes.toString());
        //let major = user.attribute;
        // or user.major
        console.log("Users major is"  + user.major);
        */

       /*const userAsBytes = await ctx.stub.getState(username); // get the car from chaincode state
       if (!userAsBytes || userAsBytes.length === 0) {
           throw new Error(`${username} does not exist`);
       }

        let r = userAsBytes.major;*/

        var response = await ctx.stub.getState(username);
        response = response.major;
        return response;

        console.info('=======================================');
        //console.log(userAsbytes.major.toString());
        console.info('=======================================');
        return r;


        //return userAsbytes;
    }

    async createUser(ctx, username, ID, password, email, firstName, lastName, major, year) {
        console.info('============= START : Create User ===========');

        const user = {
            username,
            ID,
            docType: 'user',
            password,
            email,
            firstName,
            lastName,
            major,
            year
        };

        await ctx.stub.putState(username, Buffer.from(JSON.stringify(user)));
        console.info('============= END : Create User ===========');
    }

    async queryAllUsers(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeUserMajor(ctx, username, newMajor) {
        console.info('============= START : changeUserMajor ===========');

        const userAsBytes = await ctx.stub.getState(username); // get the car from chaincode state
        // check if it exists
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(`${username} does not exist`);
        }

        const user = JSON.parse(userAsBytes.toString());
        user.major = newMajor;

        await ctx.stub.putState(username, Buffer.from(JSON.stringify(user)));
        console.info('============= END : changeUserMajor ===========');
    }

}

module.exports = FabCar;
