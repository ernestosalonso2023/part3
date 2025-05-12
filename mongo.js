//import mongoose from "mongoose";
const mongoose = require('mongoose')
let password = null
let url = null

mongoose.set('strictQuery',false)
const contactSchema = new mongoose.Schema({
  //id: number,
  name: String,
  number: String
  
})
const Contact = mongoose.model('Contact', contactSchema)
/*const contact = new Contact({
 // id: 1,
  name: "Ernesto",
  number: "040-123456",
})*/

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
} else if (process.argv.length==3) {
  //  console.log("password",process.argv[2])
    password = process.argv[2]
    url =`mongodb+srv://erneyud:${password}@cluster0.u8dlg0p.mongodb.net/PersonsApp?retryWrites=true&w=majority`
    console.log("Connect",mongoose.connect(url))
    Contact.find({}).then(result => {
        console.log('contacts:')
        result.forEach(contact => {
          console.log(contact)
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
    contact.save().then(result => {
        console.log('Added',name,'number',number, 'to phonebook')
        mongoose.connection.close()
      })
   // console.log("name",name)
    //console.log("number",number)
}
//const password = "RDC4oDpQ2WVN73PQ"//process.argv[2]
//const url = `mongodb+srv://erneyud:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`

/*contact.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
}) */
