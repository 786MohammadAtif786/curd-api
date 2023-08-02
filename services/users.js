const { User, Friends } = require('../model/index');

class UserServices {
  create(userData) {
    const user = new User(userData)
    return user.save();
  }

  findByEmail(email) {
    const query = {
      email
    }
    return User.findOne(query);
  }
  find(query) {
    return User.find(query).select('firstName lastName');
  }
  findById(id) {
    const query = {
      _id: id
    }
    return User.findOne(query).select('-password -__v');
  }
  updateById(id, data) {
    const query = {
      _id: id
    }
    return User.updateOne(query, data);
  }
  deleteById(id) {
    const query = {
      _id: id
    }
    return User.deleteOne(query);
  }
}
module.exports = UserServices;