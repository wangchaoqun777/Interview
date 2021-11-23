moudle.exports = {
  get url() {
    return this.requset.url
  },
  get body() {
    return this.response.body
  },
  set body(val) {
    this.response.body = val
  }
}