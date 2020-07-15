import { Request, Response } from "express";
import ServiceCntrl from "./serviceCntrl";


export default class SampleController {

    
    async returnFunctionTest (req: Request, res: Response){
        const serviceCntrlobj   =   new ServiceCntrl();
        var payload =   {

            "eventCode": "evnt_registerMember",
            "eventName": "Register Member",
            "dateTime": "2019-02-01 12:35:00.000",
            "session": {
                "domain": "stage.gud.com",
                "gpsloc": ["126", "-84"],
                "user": "jholt",
                "device": {
                    "type": "android",
                    "token": "fKT84mU_9JM:APA91bFSDF8SjPG72hnL5Lw8M0GRsLfANSMTbVV8qvmaxOeCfOqIcEZZPv0NOzyLHsnfwc44tOMGBfntlb7PKuPmJ3Ybxv5Rr0GSHgvfOmlirsHE0JLfaI1mTMcrh3aJF1oMxfsbrjU8"
                },
                "task": "Register Member",
                "referrer": "",
                "ip": "124.23.145.6"
            },
            "role": {
                "name": "member",
                "request": {
                    "title": "bala",
                    "author": "the great",
                    "vendorId": "3546576897098090988989",
                    "name": "Jason Zheng",
                    "phone": "1234456772",
                    "isdcode": "011",
                    "status": "active",
                    "fname": "Jason",
                    "lname": "zheng",
                    "aliasName": "naveen",
                    "role": "supervisor",
                    "image": "/prd/profile/img001.jpg",
                    "authInfo": {
                        "login": "12324rfd@mail.com",
                        "password": "Pass1word",
                        "challengeQuestion": "Where do i live?",
                        "answer": "Olathe",
                        "device": {
                            "jwtAccessToken": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTM0ODdjMjg2ODZlNzQwMjc5YWY5MjEiLCJ1c2VyVHlwZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBmb2N1c3Jlc2VhcmNobGFicy5jb20iLCJmbmFtZSI6bnVsbCwiYWNjZXNzQ29kZSI6Ijk2NDciLCJudW1iZXJ1bmlxdWUiOiI1ZTM0ODdjMjg2ODZlNzQwMjc5YWY5MjEiLCJpYXQiOjE1OTE5OTY2NDV9.sbiItQ5F9aRfZ_KYjD8n-fyRHDrA0ndped0-oTsOc1o",
                            "token": "fKT84mU_9JM:APA91bFSDF8SjPG72hnL5Lw8M0GRsLfANSMTbVV8qvmaxOeCfOqIcEZZPv0NOzyLHsnfwc44tOMGBfntlb7PKuPmJ3Ybxv5Rr0GSHgvfOmlirsHE0JLfaI1mTMcrh3aJF1oMxfsbrjU8",
                            "type": "android",
                            "mobileVerified": "true",
                            "otp": "3628"
                        }
                    }
                }
            }
        };
        const returnResult      =   await serviceCntrlobj.returnFunctionTest(payload);
        res.send(returnResult)
    }
}