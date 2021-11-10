import fire from "../../config/fire_config";
import 'firebase/auth';
import {connectToDatabase} from "../../util/mongodb";

export const signUp = async (username,phone,email,password,batch,branch,currently_at) =>{
    var data;
    fire.auth().createUserWithEmailAndPassword(email,password).then(async userCred=>{
        const user = userCred.user;
        const {db} = await connectToDatabase();
        db.collection('Boarders').insertOne({uid:user.uid,name:username,email:email,batch:batch,phone:phone,branch:branch,currently_at:currently_at})
        .then(res=>{
            data = JSON.stringify(res);
            return data;
        })
    }).catch(error=>{
        data=  JSON.stringify({status:"error"});
        return data;
    });
}

