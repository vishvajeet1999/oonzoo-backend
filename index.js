const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require('./routers/userRouter')
require('dotenv').config()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.get('/',(req, res) => {
    res.send("Getting data")
})

app.use('/user', userRouter) 

app.listen(port, () =>{
    console.log(`server is running on port ${port}`)
})