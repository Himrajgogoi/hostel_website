import { ObjectId } from "bson";
import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req,res){
    const {db} = await connectToDatabase();
    
    if(req.method == 'PATCH'){
        const id = req.body.id;
        const header = req.body.Header;
        const content = req.body.Content;
        const data = await db.collection('Activities').updateOne({_id: ObjectId(id)},{$set:{Header:header, Content: content}});
        res.json(data);
    }

    else if(req.method == "POST"){
        const data = await db.collection('Activities').insertOne(req.body);
        res.json(data);
    }
}