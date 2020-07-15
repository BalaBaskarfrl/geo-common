/*************  © FocusResearch Labs 2020 *********************
Document Table: geouserevents 
Function : Store system/user events, context and the corresponding
payload.
***************************************************************/
import  GEOUserEvent  from '../models/GEOUserEvents';
import  {DBEntity} from '../connect';
var ObjectId = require('mongodb').ObjectId;

export class GEOEventEntity extends DBEntity{

    constructor(){ 
      super();
    }

    async findAll() {
      const result = await super.getDB().collection('geouserevents').find({});
      return result;
    }
 
    async findById(id: any) {
      const objId = new ObjectId(id);
      const result = await super.getDB().collection('geouserevents').find({"_id":objId});
      const found = await result.toArray();
      if (found.length === 0) {
        return null;
      }
      return found[0];
    }

    async insert(frlEventData:any, _session?:any) {

        const opts = { _session };
        let frlEventRecord:any = new GEOUserEvent({
          eventCode: frlEventData.eventCode,
          eventName: frlEventData.eventName,
          dateTime: frlEventData.dateTime,
          session:  frlEventData.session,
          role: frlEventData.role
        });
        //pass mongoose session to be included into the transaction context
        frlEventRecord = await frlEventRecord.save();
        return frlEventRecord;
    }

    async update (frlEventData: any, _session: any) {
      const opts = { _session };
      const objId = new ObjectId(frlEventData._id);
      const db = await this.getDB();
      const result = await db
        .collection('geouserevents')
        .updateOne({ "_id": objId }, { $set: { ...frlEventData } });
      return result.modifiedCount > 0 ? result : null;
    }

    async delete (frlEventData: any) {
      const objId = new ObjectId(frlEventData._id);
      const result = await this.getDB().collection('geouserevents').deleteOne({"_id":objId});
      return result.deletedCount;
    }
    async updateEventResponseById (updateProcessResponseById: any,frlResponse: any,_session?:any) {
        const opts = { _session };
        const objId = new ObjectId(updateProcessResponseById);
        const db = await this.getDB();
        const result  =   await db.collection("geouserevents").updateOne({ _id: objId },
            {
                $set: {
                    "role.response": frlResponse
                }
            });
        return result.modifiedCount > 0 ? result : null;
      };

  }

