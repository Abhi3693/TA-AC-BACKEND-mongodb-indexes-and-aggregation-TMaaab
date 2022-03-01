let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let userSchema = new Schema({
  name:{type:String},
  username:{type:String, unique:true},
  email:{type:String, unique:true},
  address:{
    city:String,
    state:{type:String, required:true},
    country:String,
    pin:Number
  }
});

userSchema.index({country:1, state:1},{unique:true});

let User = mongoose.model("User", userSchema);

module.exports = User;