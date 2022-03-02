let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let userSchema = new Schema({
  username:{type:String, required:true},
  email:{type:String, unique:true ,required:true},
  reputation:Number,
  questions:[{type:Schema.Types.ObjectId, ref:"Question"}],
  answers:[{type:Schema.Types.ObjectId, ref:"Answer"}],
},{timestamps:true})

let User = mongoose.model("User", userSchema);

module.exports = User;