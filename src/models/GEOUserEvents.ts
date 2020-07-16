/*************  © FocusResearch Labs 2020 *********************
Function : geouserevents schema
***************************************************************/
import mongoose, { Schema,Document  } from 'mongoose';

export interface IGeolEvents extends Document {
    eventCode: string;
    eventName: string;
    dateTime: string;
    session:string;
    role:string;
  }
export const geoGBLEventSchema = new Schema({
    eventCode: {
        type: String,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },    
    dateTime: {
        type: String,
        required: true,
        default: Date.now()
    },
    session: {
        domain : { type: String, required: true},
        device: {
            "type":{ type: String, required: true},
            token:{ type: String, required: true},
           
        },
        gpsloc : { type: Array, required:true},
        user : { type: String, required:true},
        task : { type: String, required:false},
        referrer: { type: String, required:false},
        ip: { type:String, required:false}
    },
	role: {
		    name:{ type: String, required: true},
		    request: { type: Object, required: true },
		    response : { type: Object, required: false }
		}
});
mongoose.models = {};
// module.exports=mongoose.model('FRLGlobalEvent', geoGBLEventSchema);
const GEOUserEvent = mongoose.model<IGeolEvents>('geouserevents', geoGBLEventSchema);
export default GEOUserEvent;