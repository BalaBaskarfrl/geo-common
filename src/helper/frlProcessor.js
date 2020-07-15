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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ruleService = void 0;
const GeoUserEventEntity_1 = require("../data-access/GeoUserEventEntity");
//server\vendor\data-access\FRLEventEntity.ts
//import APIError from './APIError';
class FrlProcessor {
    constructor() {
        this.preProcessor = (callback, args, name, type) => __awaiter(this, void 0, void 0, function* () {
            const geoEvents = new GeoUserEventEntity_1.GEOEventEntity();
            let result;
            //insert request.body into `geouserevents`
            const preProcessorEvent = yield geoEvents.insert(args[0]);
            console.log(preProcessorEvent);
            this.userEventId = preProcessorEvent["_id"];
            let payload = getNested(args[0], "role", "request");
            args[0] = (typeof (payload) !== "undefined") ? payload : args[0];
            args[0]["userEventId "] = this.userEventId;
            result = callback();
            return result;
        });
        this.postProcessor = (callback, args, name, type) => __awaiter(this, void 0, void 0, function* () {
            let result;
            result = yield callback();
            const geoEvents = new GeoUserEventEntity_1.GEOEventEntity();
            if (result.hasOwnProperty("success") && result.success == true)
                return result;
            else {
                //update only error message into `geouserevents`
                const postProcessorEvent = yield geoEvents.updateEventResponseById(this.userEventId, result);
                return "Error";
            }
            ;
        });
        this.userEventId = null;
    }
}
exports.default = FrlProcessor;
function getNested(obj, ...args) {
    return args.reduce((obj, level) => obj && obj[level], obj);
}
function ruleService(wrapperMethod) {
    return (target, key, descriptor) => {
        if (typeof (target) === 'function') {
            let newTarget = function (...arg) {
                return __awaiter(this, void 0, void 0, function* () {
                    var self = this;
                    return function () {
                        return __awaiter(this, void 0, void 0, function* () {
                            var methodCallback = function () {
                                return __awaiter(this, void 0, void 0, function* () { return new target(arg); });
                            };
                            return yield wrapperMethod.call(self, methodCallback, arg, target.name, 'class');
                        });
                    }();
                });
            };
            return newTarget;
        }
        else {
            let orgMethod = descriptor.value;
            descriptor.value = function (...arg) {
                return __awaiter(this, void 0, void 0, function* () {
                    var self = this;
                    return function () {
                        return __awaiter(this, void 0, void 0, function* () {
                            var methodCallback = function () {
                                return __awaiter(this, void 0, void 0, function* () { return yield orgMethod.apply(self, arg); });
                            };
                            return yield wrapperMethod.call(self, methodCallback, arg, key, 'function');
                        });
                    }();
                });
            };
            return descriptor;
        }
    };
}
exports.ruleService = ruleService;
//# sourceMappingURL=frlProcessor.js.map