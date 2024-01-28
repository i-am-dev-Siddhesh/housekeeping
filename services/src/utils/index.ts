import { URL } from 'url';
import argon2 from 'argon2';

export const test = (url: string) => {
  return new URL(url).pathname;
};

// Helper function to generate default slots
export // Helper function to generate default slots
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
      status: 'AVAILABLE' as 'AVAILABLE', // Use the SlotStatus enum value here
    });

    currentTime = new Date(currentTime.getTime() + interval);
  }

  return defaultSlots;
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
