import { prisma } from '../clients/prisma';

function generateNewOTP(): string {
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

export async function saveOrUpdateOTP(phone_number: string): Promise<any> {
  const existingOTP = await prisma.oTP.findFirst({
    where: {
      phone_number
    },
  });

  if (existingOTP) {
    // Case 2: An OTP entry exists
    const updatedOTP = await prisma.oTP.update({
      where: { id: existingOTP.id },
      data: {
        otp: generateNewOTP(), // You need to implement a function to generate a new OTP change 100 tpo 5
        expirationTime: new Date(Date.now() + 100 * 60 * 1000), // 5 minutes from now
      },
    });

    return updatedOTP.otp;
  } else {
    // Case 1: No OTP entry exists, create a new one
    const newOTP = await prisma.oTP.create({
      data: {
        phone_number,
        otp: generateNewOTP(), // You need to implement a function to generate a new OTP
        expirationTime: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
      },
    });

    return newOTP.otp;
  }
}

// Function to verify OTP
export async function verifyOTP(phone_number: string, userOTP: string) {
  const storedOTP = await prisma.oTP.findFirst({
    where: {
      phoneNumber,
      otp: userOTP,
      expirationTime: { gte: new Date() },
    },
  });

  return storedOTP !== null;
}
