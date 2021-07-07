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
      const public_id = img.public_id;

      const id = req.body.id;
      const header = req.body.header;
      const content = req.body.content;
      if(req.body.public_id){
        const del_id = req.body.public_id;
        await cloudinary.uploader.destroy(del_id);
      }
      const data = await db.collection('Activities').updateOne({_id: ObjectId(id)},{$set:{Header:header, Content: content,Public_id:public_id, ...(image && {image})}});
      res.json(data);
  }
  else{ 
  const id = req.body.id;
  const header = req.body.header;
  const content = req.body.content;
  const data = await db.collection('Activities').updateOne({_id: ObjectId(id)},{$set:{Header:header, Content: content}});
  res.json(data);}
})



handler.post(async (req,res)=>{
    const {db} = await connectToDatabase();
    
    if(req.body.image){
        const img = await cloudinary.uploader.upload(req.body.image);
        const image = img.secure_url;
        const public_id = img.public_id;

        const header = req.body.header;
        const content = req.body.content;
        const data = await db.collection('Activities').insertOne({Header:header, Content: content,Public_id:public_id, image: image});
        res.json(data);
    }
    else {const header = req.body.header;
    const content = req.body.content;
    const data = await db.collection('Activities').insertOne({Header:header, Content: content,Public_id:null});
    res.json(data);}
})



handler.delete(async (req,res)=>{

    const {db} = await connectToDatabase();
    
    const id = req.body.id;
    if(req.body.image){
      const img = req.body.image;
      await cloudinary.uploader.destroy(img);
    }
    await db.collection('Activities').deleteOne({_id: ObjectId(id)})
    .then((resp)=>res.json(resp))
    .catch((err)=>res.json(err));
  })


export default handler;