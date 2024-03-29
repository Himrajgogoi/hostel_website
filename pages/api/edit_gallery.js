import { ObjectId } from "bson";
import { connectToDatabase } from "../../util/mongodb";
import nextConnect from "next-connect";
import {v2 as cloudinary} from "cloudinary";

const handler = nextConnect();

handler.post(async (req,res)=>{

    const {db} = await connectToDatabase();

    if(req.body.image){
        const img = await cloudinary.uploader.upload(req.body.image,{folder:'octave'});
        const image = img.secure_url;
        const public_id = img.public_id;
        const data = await db.collection("Gallery").insertOne({image: image, public_id: public_id});
        res.json(data);
    }
})


handler.delete(async (req,res)=>{
    const {db} = await connectToDatabase();
    const id = req.body.id;
    const img = req.body.image;
    await cloudinary.uploader.destroy(img);
    db.collection("Gallery").deleteOne({_id: ObjectId(id)})
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