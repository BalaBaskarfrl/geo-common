import {GEOEventEntity}  from '../data-access/GeoUserEventEntity';
//server\vendor\data-access\FRLEventEntity.ts
//import APIError from './APIError';
export default class FrlProcessor{
    userEventId:any;
    constructor() {
        this.userEventId  =   null;
      }
    preProcessor  =   async (callback:any, args:any, name:string, type:string)=>{


        const geoEvents         =   new GEOEventEntity();
        let result: any;
        //insert request.body into `geouserevents`
        
        const preProcessorEvent = await geoEvents.insert(args[0]); 
        console.log(preProcessorEvent)
        this.userEventId        =   preProcessorEvent["_id"];
        let payload             =   getNested(args[0],"role","request");
        args[0]                 = (typeof(payload)!=="undefined")?payload:args[0];  
        args[0]["userEventId "] =   this.userEventId
        result =  callback();
        return result;
    };
    postProcessor  = async  (callback:any, args:any, name:string, type:any)=>{
        let result: any;
        result              =  await callback();

        const geoEvents     =   new GEOEventEntity();

        if(result.hasOwnProperty("success") && result.success==true ) return result;

        else {
            //update only error message into `geouserevents`
            const postProcessorEvent = await geoEvents.updateEventResponseById(this.userEventId,result);
            return "Error";
        };

    };
}
function getNested(obj:any, ...args:any) {
    return args.reduce((obj:any, level:any) => obj && obj[level], obj)
}
export  function ruleService(wrapperMethod:any) {
    return (target:any, key:any, descriptor:any) => {
  
      if ( typeof(target) === 'function' ){
        let newTarget = async function (this: any,  ...arg:any) { 
          var self = this;
          return async function() {
            var methodCallback = async function(){return new target(arg)};
            return await wrapperMethod.call(self, methodCallback, arg, target.name, 'class')
          }()
        };
        return newTarget;
      } else {
        let orgMethod = descriptor.value;
        descriptor.value = async function (...arg: any) {
          var self = this;
          return async function() {
            var methodCallback = async function() { return await orgMethod.apply(self, arg) };
            return await wrapperMethod.call(self, methodCallback, arg, key, 'function')
          }()
        };
        return descriptor;
      }
    }
  }