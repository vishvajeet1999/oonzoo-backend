const { default: mongoose } = require('mongoose')
const moongoose = require('mongoose')

const uri = 'mongodb+srv://admin:EI0XJXm79OMAV9bo@cluster0.isfzd4j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

moongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("db connected"))

const schema = mongoose.Schema({
    name:{
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    }
})

const userModel = moongoose.model('userModel', schema)

module.exports = userModel


