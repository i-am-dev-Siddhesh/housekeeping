"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = exports.SlotStatus = void 0;
var SlotStatus;
(function (SlotStatus) {
    SlotStatus["AVAILABLE"] = "AVAILABLE";
    SlotStatus["BOOKED"] = "BOOKED";
    SlotStatus["RESERVED"] = "RESERVED";
})(SlotStatus = exports.SlotStatus || (exports.SlotStatus = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["ASSIGNED"] = "ASSIGNED";
    OrderStatus["IN_PROGRESS"] = "IN_PROGRESS";
    OrderStatus["COMPLETED"] = "COMPLETED";
    OrderStatus["CANCELLED"] = "CANCELLED";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
