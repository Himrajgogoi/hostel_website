import { ObjectId } from "bson";
import { connectToDatabase } from "../../util/mongodb";
import nextConnect from "next-connect";
import multer from "multer";
import {v2 as cloudinary} from "cloudinary";


const upload =multer({dest: "/temp"})

const handler = nextConnect();

handler.patch(upload.single('image'), async (req,res)=>{
    const {db} = await connectToDatabase();

    let image;
    if(req.file){
        const img = await cloudinary.uploader.upload(req.file.path);
        image = img.secure_url;
    }
    const {id, name, designation, quote, phone} = req.body;
    const data = await db.collection('Monitors').updateOne({_id: ObjectId(id)},{$set:{Name:name, Designation:designation,Phone:phone, Quote:quote,...(image &&{image})}});
    res.json(data);


})
handler.post(upload.single('image'), async (req,res)=>{
    const {db} = await connectToDatabase();
    
    let image;
    if(req.file){
        const img = await cloudinary.uploader.upload(req.file.path);
        image = img.secure_url;
    }
    const {name, designation, quote, phone} = req.body;
    const data = await db.collection('Monitors').insertOne({Name:name, Designation:designation, Quote:quote,image: image,Phone:phone,});
    res.json(data);


})


handler.delete(upload.single('image'), async (req,res)=>{
    const {db} = await connectToDatabase();
    const {id}= req.body;
    await db.collection('Monitors').deleteOne({_id: ObjectId(id)});
    res.statusCode(200);
})

export const config = {
    api: {
      bodyParser: false,
    },
  };

export default handler;