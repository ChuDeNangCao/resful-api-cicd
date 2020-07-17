const request = require('supertest')
const app = require('../app.js')

describe('GET /', function () {
    it('home route', function (done) {
        request(app).get('/').expect('Sacombank Internet Banking API').end((err, res) => {
            if (err) return done(err)
            return done()
        })
    })
})

describe('GET /', function () {
    it('Check API', function (done) {
        request(app).get('/testAPI').expect(200).end((err, res) => {
            if (err) return done(err)
            return done()
        })
    })
});

describe('GET /', function () {
    it('Get Name', function (done) {
        request(app).get('/getName').expect({name: "Sacombank", code: 9999}).end((err, res) => {
            if (err) return done(err)
            return done()
        })
    })
});

describe('POST /', function () {
    it('Set code', function (done) {
        request(app)
            .post('/setCode')
            .send('code=888')
            .expect({name: "Sacombank", code: "888"}).end((err, res) => {
            if (err) return done(err)
            return done()
        })
    })
});

describe('GET /', function () {
    it('Login', function (done) {
        request(app).get('/login')
            .send({name: "nhutthanh", pass: "123456"})
            .expect(200, {name: "nhutthanh"}).end((err, res) => {
            if (err) return done(err)
            return done()
        })
    })
});

describe('POST /', function() {
    it('Edit Name', function(done) {
        request(app)
            .post('/user')
            .send('name=thanh')
            .expect(200, {
                name: 'thanh'
            }, done);
    });
});