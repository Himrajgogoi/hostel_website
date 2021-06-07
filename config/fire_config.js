import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

  try{
    firebase.initializeApp(firebaseConfig);

  }catch(err){
    if(!/already exists/.test(err.message)){
        console.log('Firebase initialization error', err.stack)
    }
  }

  const fire = firebase;
  export default fire;