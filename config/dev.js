module.exports = {
  host: 'http://localhost:3000',
  port: process.env.PORT || 3000,
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/curd-app'
  },
  token: {
    key: 'sodjwifh2-9dk'
  }
}