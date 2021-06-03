import { ObjectId } from "bson";
import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req,res){
    const {db} = await connectToDatabase();

    if(req.method == 'PATCH'){
        const id = req.body.id;
        const name = req.body.Name;
        const quote = req.body.Quote;
        const designation = req.body.Designation;
        const data = await db.collection('Monitors').updateOne({_id: ObjectId(id)},{$set:{Name:name, Designation:designation, Quote:quote}});
        res.json(data);
    }

    else if(req.method == "POST"){
        const data = await db.collection('Monitors').insertOne(req.body);
        res.json(data);
    }


}