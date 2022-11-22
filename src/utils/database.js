import mongoose from "mongoose";
import {config} from '../../config.js'
const Schema = mongoose.Schema;


const userSchema = new Schema({
  username: {type: String},
  password: {type: String},
});

export const User = mongoose.model('users', userSchema);

export const connect = async () => {
  
  try{
    mongoose.connect(config.mongo.uri, config.mongo.options); 
  }catch{
    console.log("aca me rompo")
  }
  };