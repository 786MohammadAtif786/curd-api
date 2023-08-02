const bcrypt = require('bcryptjs');
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dob: String,
  city: {
    type: String,
    required: true
  },
  gender: String
});

userSchema.pre('save', function (next) {
  const user = this
  if (this.isModified('password')) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError)
          }
          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
});

userSchema.pre('updateOne', function (next) {
  const update = this._update.password;
  if (update) {
    bcrypt.genSalt(10, (saltError, salt) => {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(update, salt, (hashErr, hash) => {
          if (hashErr) {
            return next(hashErr);
          }
          this._update.password = hash;
          next();
        });
      }
    });
  } else {
    next()
  }
});

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, result) {
    if (err) {
      return cb(err)
    } else if (!result) {
      return cb(true);
    } else {
      return cb(null, result)
    }
  });
}

module.exports = model('user', userSchema, 'users');