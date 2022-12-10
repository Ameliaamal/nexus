const {getConnection, Schema, mongoose} = require('../db/db')
getConnection();

// define schema for our collection
const userSchema = new Schema({
  name:    String,
  email: {
    type: String, 
    required: true,
    unique: true,
  }, 
  password: String, 
})

// create a model, or collection
const userModel = mongoose.model('Users', userSchema)


module.exports = userModel