function generateRandom10DigitNumber() {
  // Generate a random number between 0 and 1
  const randomFraction = Math.random();

  // Multiply the random fraction by 1,000,000,000, which is 10^9
  const randomNumber = Math.floor(randomFraction * 1000000000);

  // Ensure that the generated number has 10 digits by adding leading zeros
  const formattedNumber = randomNumber.toString().padStart(10, '0');

  return formattedNumber;
}

const random10DigitNumber = generateRandom10DigitNumber();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const userData = {
      name: 'Sample User',
      password: 'sample_password',
      phone_number: String(random10DigitNumber), // Replace with a unique phone number
      profile_url:
        'https://cattlemart.s3.ap-south-1.amazonaws.com/categories/vasaru.jpg',
      language: 'English',
      location: {
        lat: 123.45,
        lon: 67.89,
      },
    };

    const createdUser = await prisma.user.create({
      data: userData,
    });

    console.log('User seeded:', createdUser);
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
