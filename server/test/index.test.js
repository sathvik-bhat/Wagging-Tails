const supertest = require('supertest');
const chai = require('chai');
const {MongoClient} = require('mongodb')
const app = require('../index'); // Assuming your index.js file is in the root directory

const { expect } = chai;
const request = supertest(app);

const uri = "mongodb+srv://sathvikibhat:tmPfLllBWCmRIrEG@cluster0.5ujsgy9.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, {
  connectTimeoutMS: 10000,
  serverSelectionTimeoutMS: 10000
})
// before(async () => await client.connect());


describe('API Tests', () => {
    it('should return "Hello to my app"', async () => {
        const response = await request.get('/');
        expect(response.status).to.equal(200);
        expect(response.body).to.equal('Hello to my app');
    });

    it('should handle signup', async () => {
        const response = await request.post('/signup').send({
            email: 'test@example.com',
            password: 'testpassword',
        });
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('token');
        expect(response.body).to.have.property('userId');
        // done();
    });

    it('should handle login', async () => {
        const response = await request.post('/login').send({
            email: 'test@example.com',
            password: 'testpassword',
        });
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('token');
        expect(response.body).to.have.property('userId');
    });

    it('should retrieve gendered users for a given gender', async () => {
        const gender = 'male'; // Replace with a valid gender from your database
        const response = await request.get(`/gendered-users?gender=${gender}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        // Add more specific assertions based on your data structure
    });


    it('should retrieve messages between two users', async () => {
        const userId = 'someUserId'; // Replace with a valid userId from your database
        const correspondingUserId = 'someOtherUserId'; // Replace with a valid userId from your database
        const response = await request.get(`/messages?userId=${userId}&correspondingUserId=${correspondingUserId}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        // Add more specific assertions based on your data structure
    });

    it('should add a message to the database', async () => {
        const message = {
            message: "test"
        };
        const response = await request.post('/message').send({
            message,
        });
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    });

});