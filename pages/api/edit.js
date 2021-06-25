import { ObjectId } from "bson";
import { connectToDatabase } from "../../util/mongodb";
import nextConnect from "next-connect";
import {v2 as cloudinary} from "cloudinary";

const handler = nextConnect();

handler.patch(async (req,res)=>{
  const {db} = await connectToDatabase();
    
  
  if(req.body.image){
      const img = await cloudinary.uploader.upload(req.body.image);
      const image = img.secure_url;

      const id = req.body.id;
      const header = req.body.header;
      const content = req.body.content;
      const data = await db.collection('Achievements').updateOne({_id: ObjectId(id)},{$set:{Header:header, Content: content, ...(image && {image})}});
      res.json(data);
  }
 else{
  const id = req.body.id;
  const header = req.body.header;
  const content = req.body.content;
  const data = await db.collection('Achievements').updateOne({_id: ObjectId(id)},{$set:{Header:header, Content: content}});
  res.json(data);
 }
})



handler.post(async (req,res)=>{
    const {db} = await connectToDatabase();
    
    
    if(req.body.image){
        const img = await cloudinary.uploader.upload(req.body.image);
        const image = img.secure_url;

        const header = req.body.header;
        const content = req.body.content;
        const data = await db.collection('Achievements').insertOne({Header:header, Content: content, image: image});
        res.json(data);
    }
    else{
      const header = req.body.header;
      const content = req.body.content;
      const data = await db.collection('Achievements').insertOne({Header:header, Content: content});
      res.json(data);
    }
})



handler.delete(async (req,res)=>{
  const {db} = await connectToDatabase();

  const id = req.body.id;
  await db.collection('Achievements').deleteOne({_id: ObjectId(id)});
  res.statusCode(200);
})

export default handler;
