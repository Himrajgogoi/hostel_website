import { ObjectId } from "bson";
import { connectToDatabase } from "../../util/mongodb";
import nextConnect from "next-connect";
import {v2 as cloudinary} from "cloudinary";

const handler = nextConnect();

handler.patch(async (req,res)=>{
    const {db} = await connectToDatabase();

    if(req.body.image){
        
        if(req.body.public_id){
            const del_id = req.body.public_id;
            await cloudinary.uploader.destroy(del_id);
        }
        const img = await cloudinary.uploader.upload(req.body.image,{folder: 'octave'});
        const image = img.secure_url;
        const public_id = img.public_id;
        const id = req.body.id;
        const name = req.body.name;
        const designation = req.body.designation;
        const quote= req.body.quote;
        const phone = req.body.phone;
       
        const data = await db.collection('Monitors').updateOne({_id: ObjectId(id)},{$set:{Name:name, Designation:designation,Phone:phone, Quote:quote,Public_id:public_id,...(image &&{image})}});
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
        const img = await cloudinary.uploader.upload(req.body.image,{folder: 'octave'});
        const image = img.secure_url;
        const public_id = img.public_id;

        const name = req.body.name;
        const designation = req.body.designation;
        const quote= req.body.quote;
        const phone = req.body.phone;
        const data = await db.collection('Monitors').insertOne({Name:name, Designation:designation, Quote:quote,Public_id:public_id,image: image,Phone:phone,});
        res.json(data);
    
    }
    else{
        const name = req.body.name;
        const designation = req.body.designation;
        const quote= req.body.quote;
        const phone = req.body.phone;
        const data = await db.collection('Monitors').insertOne({Name:name, Designation:designation, Quote:quote,Public_id:null,Phone:phone,});
        res.json(data);
        
    }

})


handler.delete(async (req,res)=>{
    const {db} = await connectToDatabase();
    const id= req.body.id;
    if(req.body.image){
        const img = req.body.image;
        await cloudinary.uploader.destroy(img);
      }
    db.collection('Monitors').deleteOne({_id: ObjectId(id)})
    .then((resp)=>res.json(resp))
    .catch((err) => res.status(500).json({error:err}));
})


export const config = {
    api: {
        bodyParser: {
            sizeLimit: '3mb',

        }
    }
}



export default handler;