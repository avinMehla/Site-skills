import express, { Request, Response } from 'express';
import {createuser,updateprofile, fetchmyprofile, fetchprofile,doesuserexsist, tokengenrator,ispassright, otpverify, sendrequest,acceptreq, search} from './functions'

const app=express()
const port=3000

app.use(express.json())

//sigup
app.post('/signup',async (req,res)=>{
    const {email, password, username, cid}=req.body
    const status=await doesuserexsist(email)
    if(status==true){
        res.json({msg :'user alerady exsist try login'})
    }
    try{
    res.json(await createuser(email,password,username,cid))
    }
    catch(error){
        res.json({msg:error})
    }
})
//login
app.get('/login',async (req,res)=>{
    const {email,password} = req.body;
    try{
        const output=await ispassright(email,password);
        if(output===true){
            res.json(tokengenrator(email))
        }
        else{
            res.json({msg:'credentials are worng'})
        }
    }
    catch(error){
        res.json(error)
    }
})
//verification
app.put('/mailverify',async(req,res)=>{
    const {email,password,otp}=req.body
    try{
        res.json(otpverify(email,password,otp))
    }
    catch(error){
        res.json({msg:'wrong inputs'})
    }
})

//update
app.get('/update',async(req,res)=>{
    const {id,email,password,username,cid,imagelink,skills,skillslink,marked}=req.body
    try{
        res.json(await updateprofile(id,email,password,username,cid,imagelink,skills,skillslink,marked))
    }
    catch(error){
        res.json({msg:error})
    }
})

//getprofile
app.get('/getprofile',async(req,res)=>{
    const {id}=req.body
    try{
        res.json(await fetchprofile(id))
    }
    catch(error){
        res.json({msg:error})
    }
})
//myprofile
app.get('/myprofile',async(req,res)=>{
    const {id}=req.body
    try{
        res.json(await fetchmyprofile(id))
    }
    catch(error){
        res.json({msg:error})
    }
})
//sendrequest
app.post('/sendrequest',async(req,res)=>{
    const {from,to,msg}=req.body
    try{
        res.json(await sendrequest(from,to,msg))
    }
    catch(error){
        res.json({msg:error})
    }
})

//accept function
app.put('/accept',async(req,res)=>{
    const {from,to}=req.body
    try{
        res.json(await acceptreq(from,to))
    }
    catch(error){
        res.json({msg:error})
    }
})

app.get('/search',async(req,res)=>{
    const keyword=req.body.keyword
    search(keyword).then((data)=>{
        res.json(data)
    })
    res.json({msg:'NOTHING'})
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})

