import mongoose from "mongoose";
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
} else if (process.argv.length==3) {
    const password = process.argv[2]
} else if (process.argv.length==4 || process.argv.length==5) {
    const password = process.argv[2]
    const name = process.argv[3]
    const number = process.argv[4]
    console.log("name",name)
    console.log("number",number)
}
//const password = "RDC4oDpQ2WVN73PQ"//process.argv[2]
//const url = `mongodb+srv://erneyud:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`
const url =`mongodb+srv://erneyud:${password}@cluster0.u8dlg0p.mongodb.net/PersonsApp?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)
console.log("Connect",mongoose.connect(url))

const contactSchema = new mongoose.Schema({
  //id: number,
  name: String,
  number: String
  
})
const Contact = mongoose.model('Contact', contactSchema)
const contact = new Contact({
 // id: 1,
  name: "Ernesto",
  number: "040-123456",
})

Contact.find({}).then(result => {
  console.log('contacts:')
  result.forEach(contact => {
    console.log(contact)
  })
  mongoose.connection.close()
})
/*contact.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
}) */
