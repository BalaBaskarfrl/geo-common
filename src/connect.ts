import mongoose from "mongoose";
import { configDB } from "./config/config";
// export default (db: string) => {
//   const connect = () => {
//     mongoose
//       .connect(db, { useNewUrlParser: true })
//       .then(() => {
//         return console.log(`Successfully connected to ${db}`);
//       })
//       .catch(error => {
//         console.log("Error connecting to database: ", error);
//         return process.exit(1);
//       });
//   };
//   connect();

//   mongoose.connection.on("disconnected", connect);
// };


/*************  © FocusResearch Labs 2020 *********************
Function : DB Session and Transaction management.
***************************************************************/




export class DBEntity { 

    constructor(){ 
         console.log("DBEntity initialized");
         this.setupDb();
        }
        private setupDb(): void {
            mongoose.connect(configDB,{ useNewUrlParser: true});
            var db = mongoose.connection;
            db.on("error", console.error.bind(console, "MongoDB Connection error"));
            if (process.env.DEBUG === '*') {
                            mongoose.set("debug", (collectionName: any, method: any, query: any, doc: any) => {
                                console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
                            });
            }
          }

    getDB() {
        return mongoose.connection.db;
    }

   
}


























