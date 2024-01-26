const { faker } = require("@faker-js/faker");
const { faker: indianFaker } = require("@faker-js/faker/locale/en_IND");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function generateAddress() {
  const postal_code = parseInt(
    indianFaker.address.zipCode().replace(/\s/g, "")
  );
  const state = indianFaker.address.state();
  const country = "India";
  const place =
    indianFaker.address.city() +
    ", " +
    indianFaker.address.street() +
    ", " +
    indianFaker.address.streetAddress();
  const latitude = +(indianFaker.address.latitude() || 0);
  const longitude = +(indianFaker.address.longitude() || 0);

  return {
    postal_code,
    place,
    state,
    country,
    latitude,
    longitude,
  };
}

const generateCattleData = (categories, users, count) => {
  let cattles = [];
  for (let i = 0; i < count || 0; i++) {
    cattles.push({
      current_milk_capacity: faker.datatype.number(),
      maximum_milk_capacity: faker.datatype.number(),
      pregnancy_number: faker.datatype.number(),
      price: faker.datatype.number(),
      is_negotiable: faker.datatype.boolean(),
      location: generateAddress(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      videos: [faker.internet.url(), faker.internet.url()],
      images: [faker.image.imageUrl(), faker.image.imageUrl()],
      birth_date: faker.date.past(),
      categoryId: categories[Math.floor(Math.random() * categories.length)].id,
      is_sold: faker.datatype.boolean(),
      sellerId: users[Math.floor(Math.random() * users.length)],
    });
  }
  return cattles;
};

async function main() {
  try {
    const categories = await prisma.cattleCategory.findMany();
    const users = (await prisma.user.findMany()).map((user) => user.id);
    const cattleData = generateCattleData(categories, users, 100);
    if (cattleData) {
      const createdCattles = await prisma.worker.createMany({
        data: cattleData,
      });

      console.log("Created createdCattles:", createdCattles.count);
      return;
    }
    console.log("Created createdCattles: 0");
  } catch (error) {
    console.log("error", error);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {});
