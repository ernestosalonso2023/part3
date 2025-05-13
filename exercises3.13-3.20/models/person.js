//import mongoose from "mongoose";
const mongoose = require('mongoose')
mongoose.set('strictQuery',false)
const contactSchema = new mongoose.Schema({
  name: String,
  number: String
  
})
contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Connect = mongoose.connect(process.env.MONGODB_URI).then(result => {
  console.log('connected to MongoDB')
}).catch(error => {
  console.log('error connecting to MongoDB:', error.message)
})
const Contact = mongoose.model('Contact', contactSchema)
module.exports = Contact
module.exports = Connect