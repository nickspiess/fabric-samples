/**
 * test for our super fabric REST API
 */

 const supertest = require('supertest');
 const api = supertest('localhost:3000');

 describe("Hyperledger Fabric API test", function() {

    it("checks if api is running", async function() {
        //this.skip();
        let result = await api.get('/');
        console.log(result.body)
    })

    it("creating a user", async function() {
        //this.skip();
        let payload = {
            username: 'jahan',
            id: '12345',
            password: 'pw',
            email: 'jahan@school.omg',
            firstName: 'jahan',
            lastName: 'Sumiarta',
            major: "Computer science",
            year: "junior",
            address: "123 test"
        };
        let result = await api.post('/invoke').send(payload)
        console.log(result.body)
    })

    it("query a user (key) jahan", async function() {
        //this.skip();
        let key = 'jahan';
        let result = await api.get('/query/'+key)
        console.log(result.body)
    })
    
    it("update contact info", async function() {
        //this.skip();
        // Simulating the data passed from the front end : username, address, zip, state, phone
        let payload = {
            username: 'jahan',
            address: '123 strees',
            zip: '54701',
            state: 'wi',
            phone: '651',
        };
        //JSON.stringify(key)
        let result = await api.post('/updateContactInfo').send(payload)
        console.log(result.body)
    })

    it("query a user #2 jahan", async function() {
        //this.skip();
        let key = 'jahan';
        let result = await api.get('/query/'+key)
        console.log(result.body)
    })


    it("Changing Major : USER0 to shitposting", async function() {
        //this.skip();
        // Simulating the data passed from the front end : username, address, zip, state, phone
        let payload = {
            username: 'USER0',
            major: 'shitposting',
        };
        //JSON.stringify(key)
        let result = await api.post('/changeMajor/').send(payload)
        console.log(result.body)
    })

    it("query a user (key) jahan", async function() {
        //this.skip();
        let key = 'jahan';
        let result = await api.get('/query/'+key)
        console.log(result.body)
    });


 })