"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDistanceBetnTwoCordNts = exports.generateNanoId = exports.isObjectEmpty = void 0;
const nanoid_1 = require("nanoid");
const isObjectEmpty = (obj) => {
    return Object.getOwnPropertyNames(obj).length === 0;
};
exports.isObjectEmpty = isObjectEmpty;
const generateNanoId = () => {
    return (0, nanoid_1.nanoid)();
};
exports.generateNanoId = generateNanoId;
const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};
const calculateDistanceBetnTwoCordNts = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    if (distance === 0) {
        return 0;
    }
    return distance ? Math.ceil(distance) : 0;
};
exports.calculateDistanceBetnTwoCordNts = calculateDistanceBetnTwoCordNts;
