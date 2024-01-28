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
exports.findAvailableWorkers = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../clients/prisma");
function findAvailableWorkers(requestedSlotNumbers) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const availableWorkers = yield prisma_1.prisma.worker.findMany({
                where: {
                    slots: {
                        some: {
                            slotNumber: { in: requestedSlotNumbers },
                            status: client_1.SlotStatus.AVAILABLE,
                        },
                    },
                },
                select: {
                    id: true,
                    name: true,
                    slots: {
                        select: {
                            id: true,
                        },
                    },
                },
            });
            // // Extract only the slot ids from the response
            // const formattedWorkers = availableWorkers?.map((worker) => ({
            //   id: worker.id,
            //   name: worker.name,
            //   slots: worker.slots.map((slot) => slot.id),
            // }));
            return availableWorkers;
        }
        catch (error) {
            console.log('err', error);
            return [];
        }
    });
}
exports.findAvailableWorkers = findAvailableWorkers;
