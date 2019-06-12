module.exports = {
  apps: [{
    name: "Control Data API",
    script: "./server.js",
    env: {
      NODE_ENV: "development",
      MONGO_HOST: "mongodb://localhost:27017/test",
      HOST: "http://localhost:3000",
      JWT: "secret",
      PORT: 3000
    },
    env_test: {
      NODE_ENV: "test",
    },
    env_staging: {
      NODE_ENV: "staging",
    },
    env_production: {
      NODE_ENV: "production",
      MONGO_HOST: "mongodb+srv://root:<password>@cluster0-dnxsy.mongodb.net/test?retryWrites=true",
      HOST: "http://localhost:3000",
      JWT: "secret",
      PORT: 3000
    }
  }]
}
