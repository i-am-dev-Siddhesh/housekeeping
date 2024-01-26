const categories = [
  {
    image_url:
      'https://cattlemart.s3.ap-south-1.amazonaws.com/categories/cow.png',
    isProduceMilk: true,
    category: {
      connect: {
        id: 1,
      },
    },
  },
  {
    image_url:
      'https://cattlemart.s3.ap-south-1.amazonaws.com/categories/buffalo.png',
    isProduceMilk: true,
    category: {
      connect: {
        id: 2,
      },
    },
  },
  {
    image_url:
      'https://cattlemart.s3.ap-south-1.amazonaws.com/categories/redaku.jpg',
    isProduceMilk: false,
    category: {
      connect: {
        id: 3,
      },
    },
  },
  {
    image_url:
      'https://cattlemart.s3.ap-south-1.amazonaws.com/categories/vasaru.jpg',
    isProduceMilk: false,
    category: {
      connect: {
        id: 4,
      },
    },
  },
  {
    image_url:
      'https://cattlemart.s3.ap-south-1.amazonaws.com/categories/bull.png',
    isProduceMilk: false,
    category: {
      connect: {
        id: 5,
      },
    },
  },
  {
    image_url:
      'https://cattlemart.s3.ap-south-1.amazonaws.com/categories/bail.png',
    isProduceMilk: false,
    category: {
      connect: {
        id: 6,
      },
    },
  },
  {
    image_url:
      'https://cattlemart.s3.ap-south-1.amazonaws.com/categories/other.png',
    isProduceMilk: false,
    category: {
      connect: {
        id: 7,
      },
    },
  },
];

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    let createdCattleCategories = [];
    for (let i = 0; i < categories.length; i++) {
      const data = categories[i];
      const resp = await prisma.cattleCategory.create({
        data,
      });
      createdCattleCategories.push(resp);
    }

    console.log('CattleCategory seeded:', createdCattleCategories);
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
