const express = require('express')
const multer = require('multer')
const User = require('../models/users')
const router = new express.Router()
const {sendWelcomeEmail,sendCancelationEmail} = require('../emails/account')
const auth = require('../middleware/auth')



router.post('/users/login',auth, async(req,res)=>{
    try{
       
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})

    }catch (e){
        res.status(400).send(e)
    }
})

router.post('/users/logout',auth,async (req,res)=>{
    try {
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        
        await req.user.save()
        res.send("logout success")
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll',auth, async (req,res)=>{
    try {
        req.user.tokens=[]
        await req.user.save()
        res.send("logout out")
    } catch (error) {
        res.send(500).send()
        
    }
})

router.post('/users',async (req,res)=>{ 
    const user = new User(req.body)
    try{
        await user.save()
        sendWelcomeEmail(user.email,user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch (error){
        res.status(400).send(error)
    }
   
})

router.get('/users/me',auth ,async (req,res)=>{

   res.send(req.user)
  
})


router.patch('/users/me', auth,async (req,res)=>{
    const Updates=Object.keys(req.body)
    const allowedUpdates = ['name','email','age','password']
    const isValidOperation = Updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid Updates!'})
    }
    try{

        Updates.forEach((update)=>req.user[update]=req.body[update])
        await req.user.save()
        
        res.status(200).send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me',auth, async (req,res)=>{
    try{
        await req.user.remove()
        sendCancelationEmail(req.user.email,req.user.name)
        res.send(req.user)
    }catch (e){
        res.send(400).send(e)
    }
})



const upload = multer({
    dest:'Profiles',
    limits:{
        fileSize:10000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload jpg or jpeg or png'))
        }
        cb(undefined,true)
    }
})

//endPoint for uploading profile Image
router.post('/users/me/profile',auth,upload.single('profile'),async (req,res)=>{
    req.user.profile = req.file.buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

//endPoint for Delete profile Image
router.delete('/users/me/profile',auth,async (req,res)=>{
    req.user.profile = undefined
    await req.user.save()
    res.send()
})

//endPoint to get the profile Image
router.get('/users/:id/avatar',async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)

        if(!user||!user.avatar){
        throw new Error()
    }
        res.set('Content-Type','image/jpg')
        res.send(user.avatar)
    } catch (error) {
        res.status(400).send()
    }
})




module.exports= router