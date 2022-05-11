/**
 * test for our super fabric REST API
 */

 const supertest = require('supertest');
 const api = supertest('localhost:4000');

 describe("Hyperledger Fabric API test", function() {

    it("checks if api is running", async function() {
        this.skip();
        let result = await api.get('/');
        console.log(result.body)
    })

    it("creating a user", async function() {
        this.skip();
        let payload = {
            email: 'test@gmail.com',
            password: 'passwordhaha5',
            username: 'test@gmail.com',
            firstName: 'test',
            lastName: 'account',
            dateOfBirth: '02/15/1997'
        };
        let result = await api.post('/invoke').send(payload)
        console.log(result.body)
    })

    it("query a user (key) test@gmail.com", async function() {
        this.skip();
        let key = 'test@gmail.com';
        let result = await api.get('/query/'+key)
        console.log(result.body)
    })
    
    it("update contact info", async function() {
        this.skip();
        // Simulating the data passed from the front end : username, address, zip, state, phone
        let payload = {
            username: 'test@gmail.com',
            address: '123 strees',
            zip: '54701',
            state: 'wi',
            phone: '651',
        };
        //JSON.stringify(key)
        let result = await api.post('/updateContactInfo').send(payload)
        console.log(result.body)
    })

    it("update financial info", async function() {
        //this.skip();
        // Simulating the data passed from the front end : username, address, zip, state, phone
        let payload = {
            username: 'nickspiess11@gmail.com',
            bank: 'US Bank',
            cardType: 'Visa',
            cardNumber: '1234123412341234',
            csv: '500',
        };
        //JSON.stringify(key)
        let result = await api.post('/updateFinancialInformation').send(payload)
        console.log(result.body)
    })


    it("remove a user jahan", async function() {
        this.skip();
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
            username: 'test@gmail.com',
            major: 'math',
        };
        //JSON.stringify(key)
        let result = await api.post('/changeMajor/').send(payload)
        console.log(result.body)
    })

    it("query a user #2 jahan", async function() {
        //this.skip();
        let key = 'nickspiess11@gmail.com';
        let result = await api.get('/query/'+key)
        console.log(result.body)
    })

 })