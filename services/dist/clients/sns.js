"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishOTP = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const sns = new aws_sdk_1.default.SNS();
const publishOTP = (params) => {
    return new Promise((resolve, reject) => {
        sns.publish(params, (err, data) => {
            if (err) {
                console.error('Error sending OTP:', err);
                reject(err); // Reject the promise with the error
            }
            else {
                resolve(data); // Resolve the promise with the data
            }
        });
    });
};
exports.publishOTP = publishOTP;
