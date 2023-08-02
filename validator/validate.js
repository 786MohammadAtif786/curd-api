const joi = require('joi');

class UserValidator {
  isFields(email, password, firstName, lastName, city, gender, dob) {
    const Obj = {};
    if (email) {
      Obj.email = joi.string().min(1).message('Email is required');
    }
    if (password) {
      Obj.password = joi.string().min(1).message('Password is required');
    }
    if (firstName) {
      Obj.firstName = joi.string().min(1).message('First Name is required');
    }
    if (lastName) {
      Obj.lastName = joi.string().min(1).message('Last Name is required');
    }
    if (city) {
      Obj.city = joi.string().min(1).message('city is required');
    }
    if (gender) {
      Obj.gender = joi.string().min(1).message('Gender is required');
    }
    if (dob) {
      Obj.dob = joi.string().min(1).message('DOB is required');
    }
    return Obj;
  }
  register(userdata) {
    const userObj = this.isFields(true, true, true, true, true, true, true);
    const Schema = joi.object(userObj);
    const result = Schema.validate(userdata, { presence: 'required' });
    return result;
  }
  login(userdata) {
    const userObj = this.isFields(true, true);
    const Schema = joi.object(userObj);
    const result = Schema.validate(userdata, { presence: 'required' });
    return result;
  }
}
module.exports = UserValidator;