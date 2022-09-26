import app from "../index.js";
import chai from "chai";
import chaiHttp from "chai-http";

let should = chai.should()
let token;
chai.use(chaiHttp)

describe('Sign Up and login', () => {
    it('it should successfully sign up the users', () => {
        chai.request(app)
            .post('/users/signup')
            .send({
                'name': 'Caroline Njeri',
                'email': 'carol@gmail.com',
                'password': 'carol123'
            })
            .then((res) => {
                res.should.have.status(201);
                res.body.should.have.property("name");
                res.body.property("password").should.not.equal('carol123');

            }).catch((err) => {
                throw err;
            })

    })
    it('it should successfully login the users', () => {
        chai.request(app)
            .post('/users/login')
            .send({
                'email': 'carol@gmail.com',
                'password': 'carol123'
            })
            .then((res) => {
                res.should.have.status(200);
                res.body.should.have.property("token")
                token = res.body.property("token")

            })
            .catch((err) => {
                throw err
            })
    })
})

describe('Posting, Fetching and Delivering Products', () => {
    it('it should successfully post a product', () => {
        chai.request(app)
            .post('/products/add')
            .set('Authorization', 'token ' + token)
            .send({
                'name': 'Dress',
                'description': 'Very beautiful dress',
                'deliveryAddress': 'Kg 283 Street',
                'forTrade': true,
                'donor': '6329bcc7cc3d82d0c5f301d0'
            })
            .then((res) => {
                res.should.have.status(200);
                res.body.should.have.property("name")
                res.body.property("forTrade").should.equal.to(true)
            })
            .catch((err) => {
                throw err
            })

    })

    it('it should get all products for trade', () => {
        chai.request(app)
            .get('/products/trade')
            .set('Authorization', 'token ' + token)
            .then((res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].property('forTrade').should.equal(true)

            }).catch((err) => {
                throw err
            })
    })
    it('it should get all products for donation', () => {
        chai.request(app)
            .get('/products/donation')
            .set('Authorization', 'token ' + token)
            .then((res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].property('forTrade').should.equal(false)

            }).catch((err) => {
                throw err
            })
    })
    it('it should successfully deliver a product', () => {
        chai.request(app)
            .get('/products/trade')
            .set('Authorization', 'token ' + token)
            .then((res) => {
                chai.request(app)
                    .post('/products/deliver/' + res.body[0].property('_id'))
                    .set('Authorization', 'token ' + token)
                    .then((response) => {
                        response.status.should.have.status(200)
                        response.body.property('exchanged').should.equal(true)
                    }).catch((error) => {
                        throw error
                    })

            }).catch((err) => {
                throw err
            })
    })
})

describe('Making and Accepting Trade Offers', () => {
    it('should successfully make and accept a trade offer', () => {
        chai.request(app)
            .post('/offers/create')
            .set('Authorization', 'token ' + token)
            .send({
                'interestedProduct': '632c6fc429180e43ecef6762',
                'exchangeProductName': 'Jewellery set',
                'description': 'Very original jewellery set',
                'address': 'Kg 228 Street',

            })
            .then((res) => {
                chai.request(app)
                    .post('/products/accept/' + res.body.property('_id'))
                    .set('Authorization', 'token ' + token)
                    .then((response) => {
                        response.status.should.have.status(200)
                        response.body.property('accepted').should.equal(true)
                    }).catch((error) => {
                        throw error
                    })

            })
            .catch((err) => {
                throw err
            })
    })
})