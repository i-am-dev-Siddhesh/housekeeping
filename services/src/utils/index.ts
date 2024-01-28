import { URL } from 'url';
import argon2 from 'argon2';
import { SlotStatus } from '@prisma/client';

export const test = (url: string) => {
  return new URL(url).pathname;
};


export function generateDefaultSlots(): any[] {
  const totalSlots = 16; // Assuming you have 16 slots in a day

  return Array.from({ length: totalSlots }, (_, index) => ({
    slotNumber: index + 1,
    status: 'AVAILABLE' as SlotStatus, // Use the SlotStatus enum value here
  }));
}

// Hash function using Argon2
export async function hashString(inputString: string) {
  try {
    const hashedString = await argon2.hash(inputString);
    return hashedString;
  } catch (error) {
    console.error('Error hashing string:', error);
    throw error;
  }
}

// Decode function using Argon2
export async function verifyString(inputString: string, validString: string) {
  try {
    const hashedString = await argon2.verify(inputString, validString);
    return hashedString;
  } catch (error) {
    console.error('Error decoding string:', error);
    throw error;
  }
}
