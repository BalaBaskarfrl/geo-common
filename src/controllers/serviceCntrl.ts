
import FrlProcessor,{ ruleService } from "../helper/frlProcessor";

const frlProcessorObj   =   new FrlProcessor();

export default class ServiceCntrl {

    @ruleService(frlProcessorObj.preProcessor)
    async returnFunctionTest (payload){
        return payload;
    }
}