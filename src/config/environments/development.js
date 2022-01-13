// TODO: make it DRY for test and development environments
module.exports = {
  mongoose: {
    url: "mongodb://127.0.0.1:27017/devdb",
    options: { useNewUrlParser: true, useUnifiedTopology: true, }
  }
}