class AppResponse {
  constructor(statusCode = 200, data = null) {
    this.data = data;
    this.statusCode = statusCode;
    this.success = true;
  }
}

module.exports = AppResponse;
