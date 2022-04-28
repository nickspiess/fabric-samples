/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {


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
                docType: 'user',
                ID: '1234',
                password: 'pw',
                email: 'spiess@gmail.com',
                firstName: 'Nick',
                lastName: 'Spiess',
                major: 'Liberal Studies',
                year: 'Senior',
                // location
                address: '123 eau claire',
                zip: '54701',
                state: 'WI',
                phone: '6512169512',
                // academic
                major: 'Liberal Studies',
                year: 'Senior',
                ID: '1234',
                // financial
                bank: ' ',
                cardType: ' ',
                ccNum: ' ',
                csv: ' '
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

    async createUser(ctx, username, ID, password, email, firstName, lastName, major, year, address) {
        console.info('============= START : Create User ===========');

        const user = {
            username,
            docType: 'user',
            firstName,
            lastName,
            email,
            password,
            // academic
            major,
            year,
            ID,
            // location
            address,
            zip: ' ',
            state: ' ',
            phone: ' ',
            // banking
            bank: ' ', 
            cardType: ' ', 
            cardNumber: ' ',
            csv: ' '
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
        user.major = newMajor.toString();

        await ctx.stub.putState(username, Buffer.from(JSON.stringify(user)));
        console.info('============= END : changeUserMajor ===========');
    }

    async updateContactInfo(ctx, username, add, z, st, phoneNumber) {
        console.info('============= START : changeUserMajor ===========');
        console.log('values ' + add + ' ' + z + ' ' + st + ' ' + phoneNumber)
        const userAsBytes = await ctx.stub.getState(username); // get the car from chaincode state
        // check if it exists
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(`${username} does not exist`);
        }

        const user = JSON.parse(userAsBytes.toString());
        user.address = add.toString();
        //user.zip = z.toString();
        //user.state = st.toString();
        //user.phone = phoneNumber.toString();

        await ctx.stub.putState(username, Buffer.from(JSON.stringify(user)));
        console.info('============= END : changeUserContact ===========');
        //return "Successfully Updated Contact Info";
    }

    async updateFinancialInfo(ctx, username, bank, cardType, cardNumber, csv) {
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
        //return "Successfully Updated Financial Info";
    }


}

module.exports = FabCar;
