import express, { Request, Response } from 'express';
const app = express();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { fetchprofile } from './functions';
import { profile } from 'console';
app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
    try{
    const userid=req.body.userid;
    const myprofile = await fetchprofile(userid);
    if (typeof myprofile !== 'string') {
        const profile_based_on_level = await prisma.profile.findMany({
            where: {
                user_id: {not: userid},
                level: myprofile?.level
            }
        });
    const homeProfiles = profile_based_on_level.filter((profile) => {
        return profile.skills.every((skill) => !profile.skills.includes(skill));
      });
      const notifications=await prisma.requests.findMany({
        where:{
          request_id:userid
        }   
      })
      res.json({homeProfiles,myprofile,notifications});
    } else {
        res.json({ msg: "User does not exist" });
    }
}
catch(error){
    res.json({msg:error})
}});

app.listen(3000, () => {
    console.log(`server is running on 3000`)
})