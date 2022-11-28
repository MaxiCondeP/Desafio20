import dotenv from 'dotenv';
import admin from 'firebase-admin'
import serviceAccount from './src/firebase/ecommerce-db2-f8fe9-firebase-adminsdk-yarzw-3b93564996.js'
import mongoose from 'mongoose';
import parseArgs from "minimist";

const options = { default: { PORT: 8080, MODE: "fork", DAO: "MONGO" }, alias: { p: "PORT", m: "MODE", d: "DAO" } }
const args = parseArgs(process.argv.slice(2), options);
const dao = args.DAO.toUpperCase();


dotenv.config();
let firebaseDB="";


if (dao === 'MONGO') {
  //prueba de conexion mongo
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected ok to mongoDB3');
  });
} else if (dao=== 'FIREBASE') {
  //prueba de conexion firebase
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log("Connected ok to Firebase");
    firebaseDB=admin.firestore();
  } catch (error) {
    console.log(error);
  }
}


export const config = {
  mongo: {
    uri: process.env.MONGO_URI_STRING,
    options: { useNewUrlParser: true, useUnifiedTopology: true }
  },
  firebase: {
    db: firebaseDB
  },
  dataPersistence: process.env.DATA_PERSISTENCE,
}