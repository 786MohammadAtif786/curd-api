const UserValidator = require('../validator/validate');
const UserServices = require('../services/users');
const response = require('../utils/response');
const Jwt = require('../utils/jwt');

class UserControllers {
  constructor() {
    this.userValidator = new UserValidator();
    this.userServices = new UserServices();
    this.jwt = new Jwt();
  }
  register() {
    return (req, res) => {
      const userData = req.body;
      const result = this.userValidator.register(userData);
      if (result.error) {
        return response(res, 'error', null, result.error.details[0].message, 400);
      }
      this.userServices.create(result.value)
        .then((data) => {
          response(res, 'success', data, 'registertion was successfull.')
        })
        .catch((err) => {
          if (err.code == 11000) {
            response(res, 'error', null, 'Already email used', 401);
          } else {
            response(res, 'error', null, 'Unbale to register', 404);
          }
        });
    }
  }

  login() {
    return (req, res) => {
      const userData = req.body;
      const result = this.userValidator.login(userData);
      if (result.error) {
        return response(res, 'error', null, result.error.details[0].message, 400);
      }
      this.userServices.findByEmail(result.value.email)
        .then((userDoc) => {
          if (!userDoc) {
            return response(res, 'error', null, 'Invalid  email and password', 401);
          }
          userDoc.comparePassword(result.value.password, (err) => {
            if (err) {
              response(res, 'error', null, 'Invalid email and password', 401);
            } else {
              const userObj = userDoc.toObject();
              const token = this.jwt.generateToken(userObj);
              userObj.token = token;
              delete userObj.password
              response(res, 'success', userObj, 'Login successfully.');
            }
          });
        })
        .catch((err) => {
          response(res, 'error', null, 'Invalid email and password' || err, 400);
        });
    }
  }
  getUser() {
    return (req, res) => {
      this.userServices.find()
        .then((userList) => {
          if (userList) {
            response(res, 'success', userList, 'User find suceesfully.');
          } else {
            response(res, 'error', null, 'Unable find to user. Please try again later', 401)
          }
        })
        .catch((err) => {
          response(res, 'error', null, 'Unable to find user' || err, 404);
        });
    }
  }
  updateUser() {
    return (req, res) => {
      const result = this.userValidator.register(req.body);
      if (result.error) {
        response(res, 'error', null, result.error.details[0].message, 401);
      }
      this.userServices.updateById(req.user._id, result.value)
        .then((userDoc) => {
          if (userDoc) {
            response(res, 'success', userDoc, 'User updated successfully.');
          } else {
            response(res, 'error', null, 'Unabale to update', 401);
          }
        })
        .catch((err) => {
          return response(res, 'error', null, 'Internal server error', 501);
        });
    }
  }
  getUserById() {
    return (req, res) => {
      this.userServices.findById(req.user._id)
        .then((userDoc) => {
          if (userDoc) {
            response(res, 'success', userDoc, 'User login sucessfully');
          } else {
            response(res, 'error', null, 'Unable to find user', 400);
          }
        })
        .catch((err) => {
          response(res, 'error', null, 'Internal server error' || err, 500);
        });
    }
  }
  deleteUserById() {
    return (req, res) => {
      this.userServices.deleteById(req.user._id)
        .then((user) => {
          console.log(user.deletedCount == 0);
          if (user.deletedCount == 0) {
            response(res, 'error', null, 'Already user deleted', 500)
          } else {
            response(res, 'sucess', null, 'User deleted sucessfully')
          }
        })
        .catch((err) => {
          if (err.code === 1100) {
            response(res, 'error', null, 'Already server error' || err, 500);

          } else {
            response(res, 'error', null, 'Internal server error' || err, 500);
          }
        });
    }
  }
}
module.exports = UserControllers;
