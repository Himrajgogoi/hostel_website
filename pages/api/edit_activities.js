import { ObjectId } from "bson";
import { connectToDatabase } from "../../util/mongodb";
import nextConnect from "next-connect";
import multer from "multer";
import {v2 as cloudinary} from "cloudinary";


const upload =multer({dest: "/public/temp"})

const handler = nextConnect();

handler.patch(upload.single('image'), async (req,res)=>{
    const {db} = await connectToDatabase();
    
    let image;
    if(req.file){
        const img = await cloudinary.uploader.upload(req.file.path);
        image = img.secure_url;
    }
    const {id, header, content} = req.body;
    const data = await db.collection('Activities').updateOne({_id: ObjectId(id)},{$set:{Header:header, Content: content, ...(image && {image})
    }});
    res.json(data);
})

handler.post(upload.single('image'), async (req,res)=>{
    const {db} = await connectToDatabase();
    
    let image;
    if(req.file){
        const img = await cloudinary.uploader.upload(req.file.path);
        image = img.secure_url;
    }
    const {header, content} = req.body;
    const data = await db.collection('Activities').insertOne({Header:header, Content: content, image: image});
    res.json(data);
})

export const config = {
    api: {
      bodyParser: false,
    },
  };
  

export default handler;