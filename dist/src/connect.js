"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
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
class DBEntity {
    constructor() {
        console.log("DBEntity initialized");
        this.setupDb();
    }
    setupDb() {
        mongoose_1.default.connect(config_1.configDB, { useNewUrlParser: true });
        var db = mongoose_1.default.connection;
        db.on("error", console.error.bind(console, "MongoDB Connection error"));
        if (process.env.DEBUG === '*') {
            mongoose_1.default.set("debug", (collectionName, method, query, doc) => {
                console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
            });
        }
    }
    getDB() {
        return mongoose_1.default.connection.db;
    }
}
exports.DBEntity = DBEntity;
