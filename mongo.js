//import mongoose from "mongoose";
const mongoose = require('mongoose')
let password = null
let url = null
mongoose.set('strictQuery',false)
const contactSchema = new mongoose.Schema({
  name: String,
  number: String
  
})
const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length<3 || process.argv.length>5) {
  console.log('give password as argument')
  console.log("Remember If the name contains spaces, it must be enclosed in quotation marks: Example: 'Ernesto Perez'")
  process.exit(1)
} else if (process.argv.length==3) {
    password = process.argv[2]
    url =`mongodb+srv://erneyud:${password}@cluster0.u8dlg0p.mongodb.net/PersonsApp?retryWrites=true&w=majority`
    //console.log("Connect",mongoose.connect(url))
    mongoose.connect(url)
    Contact.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(contact => {
         console.log(contact.name, contact.number)   
        //  console.log(contact)

        })
        mongoose.connection.close()
      })
} else if (process.argv.length==4 || process.argv.length==5) {
    password = process.argv[2]
    const name = process.argv[3]
    const number = process.argv[4]
    const contact = new Contact({
      name: name,
      number: number,
    })
    url =`mongodb+srv://erneyud:${password}@cluster0.u8dlg0p.mongodb.net/PersonsApp?retryWrites=true&w=majority`
    mongoose.connect(url)
    contact.save().then(result => {
        console.log('Added',name,'number',number, 'to phonebook')
        mongoose.connection.close()
      })
 }
