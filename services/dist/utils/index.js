"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDefaultSlots = exports.test = void 0;
const url_1 = require("url");
const test = (url) => {
    return new url_1.URL(url).pathname;
};
exports.test = test;
// Helper function to generate default slots
function generateDefaultSlots() {
    const defaultSlots = [];
    const startTime = new Date();
    startTime.setHours(9, 0, 0, 0); // Set start time to 9:00 AM
    const endTime = new Date();
    endTime.setHours(18, 0, 0, 0); // Set end time to 6:00 PM
    const interval = 30 * 60 * 1000; // 30 minutes in milliseconds
    let currentTime = startTime;
    while (currentTime < endTime) {
        defaultSlots.push({
            startTime: currentTime,
            endTime: new Date(currentTime.getTime() + interval),
            status: 'AVAILABLE', // Use the SlotStatus enum value here
        });
        currentTime = new Date(currentTime.getTime() + interval);
    }
    return defaultSlots;
}
exports.generateDefaultSlots = generateDefaultSlots;
