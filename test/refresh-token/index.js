const request = require("supertest")
const app = require("../../app.js")
const expect = require("chai").expect
const EXPIRED_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZWY3NTMxYzRmNGRhNzRmMGVhYzMwYjAiLCJ0eXBlIjoibm9ybWFsIiwiaWF0IjoxNTk0OTU3OTY2LCJleHAiOjE1OTQ5NjE1NjZ9.ExZ-dHL-bjbHZsBobVE1gFF5msSvBNWvSzbwSd_PLGA"
const REFRESH_TOKEN =
  "LQJNKQbxkWSu9aZfs5yrCcPmgdUDkBHJaEOYdICXexhGbw7rMMxoJ5Vu7hp9T288WkUeL6RzNIqfHIW6"
describe("POST /refresh-token", function () {
  this.timeout(30000)
  it("Lấy lại TOKEN thành công", function (done) {
    request(app)
      .post("/refreshToken")
      .send({ accessToken: EXPIRED_TOKEN, refreshToken: REFRESH_TOKEN })
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.include({
          success: true,
        })
        if (err) return done(err)
        return done()
      })
  })
  it("Lấy lại TOKEN thất bại, thiếu accessToken", function (done) {
    request(app)
      .post("/refreshToken")
      .send({ refreshToken: REFRESH_TOKEN })
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.include({
          success: false,
          message: "accessToken, refreshToken are required!",
        })
        if (err) return done(err)
        return done()
      })
  })
  it("Lấy lại TOKEN thất bại, thiếu refreshToken", function (done) {
    request(app)
      .post("/refreshToken")
      .send({ accessToken: EXPIRED_TOKEN })
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.include({
          success: false,
          message: "accessToken, refreshToken are required!",
        })
        if (err) return done(err)
        return done()
      })
  })
  it("Lấy lại TOKEN thất bại, sai accessToken", function (done) {
    request(app)
      .post("/refreshToken")
      .send({
        accessToken: EXPIRED_TOKEN + ".invalid",
        refreshToken: REFRESH_TOKEN,
      })
      .expect(403)
      .end((err, res) => {
        expect(res.body).to.include({
          success: false
        })
        if (err) return done(err)
        return done()
      })
  })

  it("Lấy lại TOKEN thất bại, sai refreshToken", function (done) {
    request(app)
      .post("/refreshToken")
      .send({
        accessToken: EXPIRED_TOKEN,
        refreshToken: REFRESH_TOKEN + ".invalid",
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.include({
          success: false,
          message: "refreshToken is incorrect!",
        })
        if (err) return done(err)
        return done()
      })
  })
})
