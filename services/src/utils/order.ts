import { SlotStatus } from '@prisma/client';
import { prisma } from '../clients/prisma';

export async function findAvailableWorkers(requestedSlotNumbers: number[]) {
  try {
    const availableWorkers = await prisma.worker.findMany({
      where: {
        slots: {
          some: {
            slotNumber: { in: requestedSlotNumbers },
            status: SlotStatus.AVAILABLE,
          },
        },
      },
      select: {
        id: true,
        name: true,
        slots: {
          select: {
            id: true,
            slotNumber: true
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
  } catch (error) {
    console.log('err', error);

    return [];
  }
}
