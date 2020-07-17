const request = require("supertest")
const app = require("../../app.js")
const expect = require("chai").expect

describe("POST /login", function () {
  this.timeout(30000)
  it("Đăng nhập thành công", function (done) {
    request(app)
      .post("/login")
      .send({ email: "xuanghjem@gmail.com", password: "2101998" })
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.include({
          success: true,
          message: "Đăng nhập thành công!",
        })
        if (err) return done(err)
        return done()
      })
  })

  it("Đăng nhập thất bại với email bỏ trống", function (done) {
    request(app)
      .post("/login")
      .send({ password: "2101998" })
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.include({
          success: false,
          message: "Email and password are required!",
        })
        if (err) return done(err)
        return done()
      })
  })

  it("Đăng nhập thất bại với email chưa được đăng kí trước", function (done) {
    request(app)
      .post("/login")
      .send({
        email: "email.is.not.register.before@gmail.com",
        password: "2101998",
      })
      .expect(403)
      .end((err, res) => {
        expect(res.body).to.include({
          success: false,
          message: "Email này chưa đăng kí tài khoản!",
        })
        if (err) return done(err)
        return done()
      })
  })

  it("Đăng nhập thất bại với password bỏ trống", function (done) {
    request(app)
      .post("/login")
      .send({ email: "xuanghjem@gmail.com" })
      .expect(400)
      .end(async (err, res) => {
        expect(res.body).to.include({
          success: false,
          message: "Email and password are required!",
        })
        if (err) return done(err)
        return done()
      })
  })

  it("Đăng nhập thất bại với password sai", function (done) {
    request(app)
      .post("/login")
      .send({ email: "xuanghjem@gmail.com", password: "invalid.password" })
      .expect(403)
      .end((err, res) => {
        expect(res.body).to.include({
          success: false,
          message: "Mật khẩu không chính xác!",
        })
        if (err) return done(err)
        return done()
      })
  })
})
