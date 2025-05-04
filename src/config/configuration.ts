export default () => ({
  Mongo_URI: process.env.Mongo_URI,
  Google: {
    ID: process.env.GoogleClientID,
    SECRET: process.env.GoogleClientSecret,
    CALLBACK: process.env.GooleCallBackURL,
  },
  jwt: {
    secret: process.env.jwt_token,
    expire: process.env.jwt_expire,
  },
});
