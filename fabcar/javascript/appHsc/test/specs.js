/**
 * test for our super fabric REST API
 */

 const supertest = require('supertest');
 const api = supertest('localhost:4000');

 describe("Hyperledger Fabric API test", function() {

    it("checks if api is running", async function() {
        //this.skip();
        let result = await api.get('/');
        console.log(result.body)
    })

    it("creating a user", async function() {
        //this.skip();
        let payload = {
            email: 'jahan@school.omg',
            password: 'test1234555',
            username: 'jahan@school.omg',
            firstName: 'jahan',
            lastName: 'Sumiarta',
            major: "Computer science",
            year: "junior",
            id: '12345',
            address: "123 test"
        };
        let result = await api.post('/invoke').send(payload)
        console.log(result.body)
    })

    it("query a user (key) jahan@school.omg", async function() {
        //this.skip();
        let key = 'paul@school.omg';
        let result = await api.get('/query/'+key)
        console.log(result.body)
    })
    
    it("update contact info", async function() {
        this.skip();
        // Simulating the data passed from the front end : username, address, zip, state, phone
        let payload = {
            username: 'jahan@school.omg',
            address: '123 strees',
            zip: '54701',
            state: 'wi',
            phone: '651',
        };
        //JSON.stringify(key)
        let result = await api.post('/updateContactInfo/').send(payload)
        console.log(result.body)
    })

    it("query a user #2 jahan", async function() {
        this.skip();
        let key = 'jahan';
        let result = await api.get('/query/'+key)
        console.log(result.body)
    })

    it("remove a user jahan", async function() {
        //this.skip();
        let payload = {
            username: 'jahan',
        };
        let key  = 'jahan';
        let result = await api.delete('/remove/'+key)
        console.log(result.body)
    })


    it("Changing Major : jahan to shitposting", async function() {
        this.skip();
        // Simulating the data passed from the front end : username, address, zip, state, phone
        let payload = {
            username: 'jahan',
            major: 'math',
        };
        //JSON.stringify(key)
        let result = await api.post('/changeMajor/').send(payload)
        console.log(result.body)
    })

    it("query a user (key) jahan", async function() {
        //this.skip();
        let key = 'jahan';
        let result = await api.get('/query/:'+key)
        console.log(result.body)
    });


 })