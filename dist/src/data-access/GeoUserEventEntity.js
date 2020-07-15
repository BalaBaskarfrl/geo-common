"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GEOEventEntity = void 0;
/*************  © FocusResearch Labs 2020 *********************
Document Table: geouserevents
Function : Store system/user events, context and the corresponding
payload.
***************************************************************/
const GEOUserEvents_1 = __importDefault(require("../models/GEOUserEvents"));
const connect_1 = require("../connect");
var ObjectId = require('mongodb').ObjectId;
class GEOEventEntity extends connect_1.DBEntity {
    constructor() {
        super();
    }
    findAll() {
        const _super = Object.create(null, {
            getDB: { get: () => super.getDB }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _super.getDB.call(this).collection('geouserevents').find({});
            return result;
        });
    }
    findById(id) {
        const _super = Object.create(null, {
            getDB: { get: () => super.getDB }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const objId = new ObjectId(id);
            const result = yield _super.getDB.call(this).collection('geouserevents').find({ "_id": objId });
            const found = yield result.toArray();
            if (found.length === 0) {
                return null;
            }
            return found[0];
        });
    }
    insert(frlEventData, _session) {
        return __awaiter(this, void 0, void 0, function* () {
            const opts = { _session };
            let frlEventRecord = new GEOUserEvents_1.default({
                eventCode: frlEventData.eventCode,
                eventName: frlEventData.eventName,
                dateTime: frlEventData.dateTime,
                session: frlEventData.session,
                role: frlEventData.role
            });
            //pass mongoose session to be included into the transaction context
            frlEventRecord = yield frlEventRecord.save();
            return frlEventRecord;
        });
    }
    update(frlEventData, _session) {
        return __awaiter(this, void 0, void 0, function* () {
            const opts = { _session };
            const objId = new ObjectId(frlEventData._id);
            const db = yield this.getDB();
            const result = yield db
                .collection('geouserevents')
                .updateOne({ "_id": objId }, { $set: Object.assign({}, frlEventData) });
            return result.modifiedCount > 0 ? result : null;
        });
    }
    delete(frlEventData) {
        return __awaiter(this, void 0, void 0, function* () {
            const objId = new ObjectId(frlEventData._id);
            const result = yield this.getDB().collection('geouserevents').deleteOne({ "_id": objId });
            return result.deletedCount;
        });
    }
    updateEventResponseById(updateProcessResponseById, frlResponse, _session) {
        return __awaiter(this, void 0, void 0, function* () {
            const opts = { _session };
            const objId = new ObjectId(updateProcessResponseById);
            const db = yield this.getDB();
            const result = yield db.collection("geouserevents").updateOne({ _id: objId }, {
                $set: {
                    "role.response": frlResponse
                }
            });
            return result.modifiedCount > 0 ? result : null;
        });
    }
    ;
}
exports.GEOEventEntity = GEOEventEntity;
//# sourceMappingURL=GeoUserEventEntity.js.map