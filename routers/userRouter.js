const express = require('express')
const userRouter = express.Router()
const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'jfdfjiefnnijignjngri543563kn3i44[3]4ktk4kj'



userRouter.route('/signup')
    .post(createUser)

userRouter.route('/signin')
    .post(validateUser)

userRouter.route('/auth')
    .post(authUser)

 

async function authUser(req,res){
    // console.log(req.body)
    const {token} = req.body
    if(!token){
        console.log("token is not defined")
        return res.json({authentication: undefined,warning: "token is not defined, please login"});
    }
    // console.log(token,"token")
    // const user = await userModel.findOne({email: email})
    const jwtToken = await jwt.verify(token, JWT_SECRET)
    const email = jwtToken.payload;
    console.log(email)
    console.log(jwtToken,"jwtToken")
    if(await userModel.findOne({email: email})){
        return res.json({authentication: true, warning: undefined})
    }else{
        return res.json({authentication: false, warning: "please login"})
    }

}

async function validateUser(req, res){
    const {email, password} = req.body
    // console.log("get the request")
    const user = await userModel.findOne({email: email})
    // console.log(user)
    if(!user){
        return res.json({notFound: true, wrongPassword: false,status: 'not ok', token: ''})
    }
    else{
        if(await bcrypt.compare(password, user.password)){
            let uid = user['_id']
            console.log(uid)
            const token = await jwt.sign({payload: email}, JWT_SECRET)
            console.log(token)

            return res.json({
                status: "ok",
                token: token,
                notFound: false,
                wrongPassword: false
            })
        }else{
            return res.json({notFound: false, wrongPassword: true, token: '', status: 'not ok'})
        }
    }
}

async function createUser(req, res){
    const oldUser = await userModel.findOne({email: req.body.email})
    const { name, email, password} = req.body
    if(oldUser){
        res.json({alreadyExists: true, created: false})
    }
    else{
        const encryptedPassword = await bcrypt.hash(password,10)
        await userModel.create({
            name,
            email,
            password: encryptedPassword
        })

    console.log(encryptedPassword)
    console.log("user has been created")
    res.json({alreadyExists: false, created: true})
    }
}

module.exports = userRouter