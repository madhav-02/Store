const crypto = require("crypto")
const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');
const userSchema = new mongoose.Schema({
  firstname : {
        type: String,
        required: true,
        maxlength: 32,
        trim:true
  },
  lastname: {
    type: String,
    maxlength : 32,
    trim: true
  },
  email : {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  userinfo: {
    type: String,
    trim: true
  },
  encryptedpassword: {
    type: String,
    required: true
  },
  salt: String, // Used for encryption of the password.

  role : {
    type: Number, // role can be student, teacher, adminstator etc.
    default: 0  // if 0 -> student, 1 -> teacher, 2 -> admin
  },

  purchases: {
    type: Array,
    default: []
  }

},{ timestamps: true});  // timestamps will note the time of the instance being created

userSchema.virtual("password") // "password" is the field that is virtual in our user schema- which means it exists but not directly, kind of hidden
    .set( function(password){ // password is the password enetered by the user
        this._password = password // _password means creating a private variable named password to store the user entered password.
        this.salt = uuidv4()    // This is the encryption key that is used in nodeJS.
        this.encryptedpassword = this.securePassword(password)
    })
    .get( function(){
        return this._password
    })
userSchema.method = {
    authenticate: function(plainpassword){
        return this.encryptedpassword === this.securePassword(plainpassword); // Return true if pw enetered by user matches the encrypted password that has been stored before
    },
    securePassword : function(plainpassword){
        if(!plainpassword) return "";
        try{
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        }catch(error){
            return ""
        }
        
    }
}


module.exports = mongoose.model("User",userSchema)