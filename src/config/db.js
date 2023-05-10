import mongoose from "mongoose";
import { DB_URI } from "../utils/constants.js";

const dbConnect = async () => {
  try {
    mongoose.set('strictQuery', true);
    mongoose.connect(DB_URI, {
      
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => console.log("🚀 ~ file: db.js:22 ~ dbConnect ~ res:", 'SUCCESS CONNECTION'))
      .catch((err) => err && console.log("🚀 ~ file: db.js:22 ~ dbConnect ~ res:", ' ERROR UNSUCCESS CONNECTION ' + JSON.stringify(err)))
    return;
  } catch (error) {
    if (error) {
      console.log("**** SOMETHING WENT WRONG CONNECTING THE DB ****");
      return;
    }
  }
};

export default dbConnect;
