const express = require('express')
const User=require("../db/models/users")
const auth =require('../middleware/auth')
const router =new express.Router()
const multer = require('multer')

const avatar= multer({
    limits:{
        fileSize:1000000,
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|png|PNG|JPG|JPEG|jpeg)$/))
           return  cb(new Error("Thi isnt correct format"))
        cb(undefined,true)
    }
})

router.post('/user',async (req,res)=>{
    const user=new User(req.body)
    try {
        // await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
        // console.log(res)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/user/login',async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token= await user.generateAuthToken()
        // console.log(user,token)
        res.status(200).send({user,token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post("/user/logout",auth,async (req,res)=>{
    try {
        req.user.tokens= req.user.tokens.filter(token=>token.token != req.token)
        // req.user.tokens=[]
        console.log(req.tokens)
        await req.user.save()
        res.status(200).send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/user/me/avatar',auth,avatar.single('avatar'),async (req,res)=>{
    console.log(req.user)
    req.user.avatar=req.file.buffer
    await req.user.save() 
    res.send(req.user)
},(err,req,res,next)=>{
    res.status(404).send({error: err.message})
})

router.get('/user/:id/avatar',async(req,res)=>{

    try {
        const user =await User.findById(req.params.id) 
        if(!user || !user.avatar)
         throw new Error()
        console.log(res)
        res.set('Content-Type','image/jpg')
        res.send(user.avatar)
    } catch (error) {
        res.status(500).send(error.message)
    }
    
})

router.get('/user/me',auth,async (req,res)=>{
    try {
    //    const user = await User.find({})
    //    if(!user)
    //    return res.status(404).send()
    //    res.send(user).statusCode
    res.status(200).send(req.user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/user/:id',async (req,res)=>{
    console.log(req.params)
    try {
       const user = await User.findById(req.params.id)
       if(!user)
       return res.status(404).send()
       res.send(user).statusCode
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.patch('/user/:id',async (req,res)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!user)
        return res.status(404).send()
        res.send(user).statusCode
     } catch (error) {
         res.status(500).send(error.message)
     }
})


router.delete('/users/me', auth,async (req, res) => {
    try {
        await req.user.remove();
        res.status(200).send()
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router