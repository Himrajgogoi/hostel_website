import { ObjectId } from "bson";
import { connectToDatabase } from "../../util/mongodb";
import nextConnect from "next-connect";

const handler = nextConnect();

handler.put(async (req,res)=>{
    const {db} = await connectToDatabase();
    
    db.collection("Superintendent").updateOne({_id: ObjectId(req.body.id)},{$set:{Name: req.body.Name,Phone:req.body.Phone}})
    .then(response=>res.json(response))
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