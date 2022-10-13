import nextConnect from "next-connect";
import { signUp} from "../../components/auth/FirebaseAuth";
import {connectToDatabase} from "../../util/mongodb";
const handler = nextConnect();


handler.get(async (req,res)=>{
    const {db} = await connectToDatabase();
    const data = await db.collection('Boarders').findOne({uid:req.query.uid});
    const resp = JSON.parse(JSON.stringify(data));
    res.json(resp);
});

handler.post(async(req,res)=>{
    let data = await signUp(req.body.username,req.body.phone,req.body.email,req.body.password,req.body.batch,
       req.body.branch,req.body.currently_at);
    res.json(data);
    
});

handler.put(async(req,res)=>{
   const {db} = await connectToDatabase();
   db.collection('Boarders').updateOne({uid:req.body.uid},{$set:{name:req.body.username,email:req.body.email,phone:req.body.phone,
   batch: req.body.batch, branch: req.body.branch, currently_at:req.body.currently_at}})
   .then(resp=>res.json(resp))
   .catch((err) => res.status(500).json({error:err}));
    
});

handler.patch(async (req,res)=>{
    const {db} = await connectToDatabase();
    db.collection('Boarders').deleteOne({uid:req.query.uid})
    .then((resp)=>res.json(resp))
    .catch((err) => res.status(500).json({error:err}));
});

export default handler;