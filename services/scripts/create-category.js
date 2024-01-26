const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const cattleImages = [
  "https://sinspire-bucket-s3.s3.amazonaws.com/b79904e52da8974a6f2a46154e41b4fb.jpeg",
  "https://sinspire-bucket-s3.s3.ap-south-1.amazonaws.com/47330812e1138bfe3b09a6a3e5b9ff46.jpeg",
  "https://sinspire-bucket-s3.s3.amazonaws.com/5fe0b97161fb42479900ba65701005d5.jpeg",
  "https://sinspire-bucket-s3.s3.ap-south-1.amazonaws.com/fd7a95fc881f9b4d4859e74e252d142b.webp",
];

async function main() {
  try {
    const categories = [];
    for (let i = 0; i < 5; i++) {
      categories.push({
        category: faker.random.word(),
        image_url: cattleImages[randomcattleImagesNumber],
      });
    }
    const createdCategories = await prisma.cattleCategory.createMany({
      data: categories,
    });

    console.log("Created createdCategories:", createdCategories);
  } catch (error) {
    console.log("error", error);
  } finally {
    await prisma.disconnect();
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {});
