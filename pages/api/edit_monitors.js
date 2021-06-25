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
        const name = req.body.name;
        const designation = req.body.designation;
        const quote= req.body.quote;
        const phone = req.body.phone;
        const data = await db.collection('Monitors').updateOne({_id: ObjectId(id)},{$set:{Name:name, Designation:designation,Phone:phone, Quote:quote,...(image &&{image})}});
        res.json(data);
    
    }
    else{
        const id = req.body.id;
        const name = req.body.name;
        const designation = req.body.designation;
        const quote= req.body.quote;
        const phone = req.body.phone;
        const data = await db.collection('Monitors').updateOne({_id: ObjectId(id)},{$set:{Name:name, Designation:designation,Phone:phone, Quote:quote}});
        res.json(data);
    }


})
handler.post(async (req,res)=>{
    const {db} = await connectToDatabase();
    
    if(req.body.image){
        const img = await cloudinary.uploader.upload(req.body.image);
        const image = img.secure_url;

        const name = req.body.name;
        const designation = req.body.designation;
        const quote= req.body.quote;
        const phone = req.body.phone;
        const data = await db.collection('Monitors').insertOne({Name:name, Designation:designation, Quote:quote,image: image,Phone:phone,});
        res.json(data);
    
    }
    else{
        const name = req.body.name;
        const designation = req.body.designation;
        const quote= req.body.quote;
        const phone = req.body.phone;
        const data = await db.collection('Monitors').insertOne({Name:name, Designation:designation, Quote:quote,Phone:phone,});
        res.json(data);
        
    }

})


handler.delete(async (req,res)=>{
    const {db} = await connectToDatabase();
    const id= req.body.id;
    await db.collection('Monitors').deleteOne({_id: ObjectId(id)});
    res.statusCode(200);
})



export default handler;