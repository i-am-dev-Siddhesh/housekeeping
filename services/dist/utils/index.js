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
exports.verifyString = exports.hashString = exports.generateDefaultSlots = exports.test = void 0;
const url_1 = require("url");
const argon2_1 = __importDefault(require("argon2"));
const test = (url) => {
    return new url_1.URL(url).pathname;
};
exports.test = test;
function generateDefaultSlots() {
    const totalSlots = 16; // Assuming you have 16 slots in a day
    return Array.from({ length: totalSlots }, (_, index) => ({
        slotNumber: index + 1,
        status: 'AVAILABLE', // Use the SlotStatus enum value here
    }));
}
exports.generateDefaultSlots = generateDefaultSlots;
// Hash function using Argon2
function hashString(inputString) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashedString = yield argon2_1.default.hash(inputString);
            return hashedString;
        }
        catch (error) {
            console.error('Error hashing string:', error);
            throw error;
        }
    });
}
exports.hashString = hashString;
// Decode function using Argon2
function verifyString(inputString, validString) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashedString = yield argon2_1.default.verify(inputString, validString);
            return hashedString;
        }
        catch (error) {
            console.error('Error decoding string:', error);
            throw error;
        }
    });
}
exports.verifyString = verifyString;
