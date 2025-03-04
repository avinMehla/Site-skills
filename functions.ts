import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
//create user
export async function createuser(email: string,pass: string,username:string,colid:string){
  try{
    const newuser = await prisma.user.create({
      data:{
        email:email,
        password:pass,
        username:username,
        cid:colid,
        verificationcode:Math.floor(Math.random() * (10000 - 999)) + 999,
      }
    })
    await prisma.profile.create({
      data:{
        user_id:newuser.id
      }
    })
    return newuser.id
  }
  catch(error){
    return "something wrong in the input"
  }
}

//update profile
export async function updateprofile(id:string,email: string,pass: string,username:string,colid:string,imagelink:string,skills:string[],skills_link:string[],marked: number[]){
  try{
    const getmail=await prisma.user.findUnique({where:{id:id}})
    let v=true;
    if(getmail?.email!=email){
      v=false
    }
    const updateuser=await prisma.user.update({
      where:{
        id:id,
      },
      data:{
        email:email,
        password:pass,
        username:username,
        cid:colid,
        verificationcode: Math.floor(Math.random() * (10000 - 999)) + 999,
        isverified: v
      }
    })
    let level:number=0;
    for(let i=0;i<marked.length;i++){
      level+=marked[i]
    }
    const updateProfile=await prisma.profile.update({
      where:{
        user_id:id
      },
      data:{
        image_link:imagelink,
        skills:skills,
        skills_link:skills_link,
        marked: marked,
        level:level/marked.length
      }
    }) 
  }
  catch(error){
    return error;
  }
}
//fetch my profile
export async function fetchmyprofile(id:string){
  const user=await prisma.user.findUnique({
    where:{id:id}
  })
  const profile=await prisma.profile.findUnique({
    where:{user_id:id}
  })
  const data={
    email : user?.email,
    username:user?.username,
    cid : user?.cid,
    imagelink : profile?.image_link,
    skills : profile?.skills,
    skillslink : profile?.skills_link,
    marked : profile?.marked
  }
  return data;
}

//fetch profile
export async function fetchprofile(id:string){
  try{
    const profile=await prisma.profile.findUnique({
      where:{
        id:id
      }
    })
    return profile
  }
  catch(error){
    return "user does not exsist"
  }
}

//token genrator
export function tokengenrator(mail:string){
  const key=process.env.JWTSECRETKEY || "";
  const payload={mail :mail}
  return jwt.sign(payload, key,{ expiresIn: '24h' }); 
  };

//userexsist
export async function doesuserexsist(email:string){
  const ans=await prisma.user.findUnique({where :{email : email}})
  if(ans===null){
    return false
  }
  return true
} 
//login
export async function ispassright(email:string,password:string){
  const status=await prisma.user.findUnique({where : {
    email:email,
    password:password,
    isverified :true
  }})
  if(status===null)return false;
  return true
}
//verify
export async function otpverify(email:string,pass:string,otp:number){
  const status=await prisma.user.findUnique({
    where :{
      email:email,
      password:pass,
      verificationcode:otp,
    }
  })
  if(status===null){
    await prisma.user.update({
      where:{
        email:email
      },
      data:{
        isverified:true,
      }
    })
    return 'sex-ass'
  }
  else{
    return 'wrong inputs'
  }
} 

//sendrequest
export async function sendrequest(userid:string,requestid:string,msg:string){
  const res=await prisma.requests.create({
    data:{
      user_id:userid,
      request_id:requestid,
      msg:msg
    }
  })
  return res
}
//accept request
export async function acceptreq(userid:string,requestid:string){
  const user=await prisma.user.findUnique({
    where:{
      id:userid
    }
  })
  const sender=await prisma.user.findUnique({
    where:{
      id:requestid
    }
  })
  await deletereq(userid,requestid)
  if (sender) {
    await sendrequest(userid,requestid,sender.email)
  } else {
    throw new Error('Sender not found');
  }
  if (user) {
    await sendrequest(userid,requestid,sender.email)
  } else {
    throw new Error('not found');
  }
}

export async function deletereq(userid:string, reqid:string) {
  await prisma.requests.deleteMany({
    where:{
      user_id:userid,
      request_id:reqid
    }
  })
}

export async function denyreq(userid:string,requestid:string){
  await prisma.requests.updateMany({
    where:{
      user_id:userid,
      request_id:requestid
    },
    data:{
      status:'denied'
    }
  })
}

export async function search(keyword:string){
  const profiles=await prisma.profile.findMany({
    where :{
      user_id:{contains:keyword}
    }
  })
  const p1=await prisma.user.findMany({
    where:{
      email:{contains:keyword}
    }
  })
  const profiles1=await Promise.all(p1.map(async (user) => {
    return await prisma.profile.findMany({
      where:{
        user_id:user.id
      }
    })
  }))
  const p2=await prisma.user.findMany({
    where:{
      username:{contains:keyword}
    }
  })
  const profiles2=await Promise.all(p2.map(async (user) => {
    return await prisma.profile.findMany({
      where:{
        user_id:user.id
      }
    })
  })
  )
  return {profiles,profiles1,profiles2}
}