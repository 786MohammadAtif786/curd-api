const Jwt = require('./jwt');
const response = require('./response');

module.exports = {
  isLogdin: () => {
    return (req, res, next) => {
      const token = req.headers.token;
      if (!token) {
        return response(res, 'error', null, 'Please login continue', 401);
      }
      const jwt = new Jwt();
      try {
        const result = jwt.verfiyToken(token);
          if (result) {
            req.user = result;
            next();
          } else {
            response(res, 'error', null, 'Session expired. Please try again later', 401);
          }
      } catch (err) {
        response(res, 'error', null, 'please try again later')
      }
    }
  }
}