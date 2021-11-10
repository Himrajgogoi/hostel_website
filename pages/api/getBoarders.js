import nextConnect from "next-connect";
import {connectToDatabase} from "../../util/mongodb";

const handler = nextConnect();

handler.get(async (req,res)=>{
    const {db} = await connectToDatabase();
    const data = await db.collection('Boarders').find({}).toArray();
    const resp = JSON.parse(JSON.stringify(data));
    res.json(resp);
})

export default handler;