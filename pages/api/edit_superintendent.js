import { ObjectId } from "bson";
import { connectToDatabase } from "../../util/mongodb";
import nextConnect from "next-connect";

const handler = nextConnect();

handler.put(async (req,res)=>{
    const {db} = await connectToDatabase();
    
    db.collection("Superintendent").updateOne({_id: ObjectId(req.body.id)},{$set:{Name: req.body.Name,Phone:req.body.Phone}})
    .then(response=>res.json(response))
    .catch(error=>alert(error.message));
})

export default handler;