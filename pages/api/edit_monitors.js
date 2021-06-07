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
    const {id, name, designation, quote} = req.body;
    const data = await db.collection('Monitors').updateOne({_id: ObjectId(id)},{$set:{Name:name, Designation:designation, Quote:quote,...(image &&{image})}});
    res.json(data);


})
handler.post(upload.single('image'), async (req,res)=>{
    const {db} = await connectToDatabase();
    
    let image;
    if(req.file){
        const img = await cloudinary.uploader.upload(req.file.path);
        image = img.secure_url;
    }
    const {name, designation, quote} = req.body;
    const data = await db.collection('Monitors').insertOne({Name:name, Designation:designation, Quote:quote,image: image});
    res.json(data);


})

export default handler;