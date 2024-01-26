// const data = [
//   {
//     current_milk_capacity: 0,
//     maximum_milk_capacity: 12,
//     pregnancy_number: 2,
//     price: 150000,
//     is_negotiable: true,
//     location: {
//       label: 'Ajmer, RJ, India',
//       place: 'Ajmer',
//       state: 'Rajasthan',
//       country: 'India',
//     },
//     description: '100 % black kapila gir cow for sale ',
//     videos: [
//       {
//         id: 0,
//         url: 'https://cattlemart.s3.ap-south-1.amazonaws.com/cattleVideos/13b4561c20f25ce64f2df866f0f18146.mp4',
//       },
//     ],
//     images: [
//       {
//         id: 0,
//         url: 'https://cattlemart.s3.ap-south-1.amazonaws.com/cattleImages/0de78e1c332902c4bb1b2dd3d22e2600.jpg',
//       },
//       {
//         id: 1,
//         url: 'https://cattlemart.s3.ap-south-1.amazonaws.com/cattleImages/8800788ee78a401258298757510fd0eb.jpg',
//       },
//     ],
//     birth_date: '2021-01-07T00:00:00.000Z',
//     lat: 26.46962,
//     long: 74.638119,
//     sellerId: 4,
//     categoryId: 1,
//     is_sold: false,
//     listing_status: 'approved',
//     createdAt: '2023-10-06T14:58:50.372Z',
//     updatedAt: '2023-10-14T10:35:23.556Z',
//     cattleTranslationTitleId: null,
//     title: '100% black kapila gir cow ',
//     calls: [],
//     category: {
//       connect: {
//         id: 2,
//       },
//     },
//     seller: {
//       connect: {
//         id: 2,
//       },
//     },
//   },
//   {
//     current_milk_capacity: 16,
//     maximum_milk_capacity: 25,
//     pregnancy_number: 1,
//     price: 55000,
//     is_negotiable: true,
//     location: {
//       label: 'West Champaran, BR, India',
//       place: 'West Champaran',
//       state: 'Bihar',
//       country: 'India',
//     },
//     description: 'Very best',
//     videos: [],
//     images: [
//       {
//         id: 0,
//         url: 'https://cattlemart.s3.ap-south-1.amazonaws.com/cattleImages/f8e276c4b7bacb7263d1cce7e5ecdb86.jpg',
//       },
//       {
//         id: 1,
//         url: 'https://cattlemart.s3.ap-south-1.amazonaws.com/cattleImages/b71493d1b8267a700a1d253126e3eb4c.jpg',
//       },
//     ],
//     birth_date: '2023-10-08T00:00:00.000Z',
//     lat: 27.079249,
//     long: 84.34121,
//     sellerId: 5,
//     categoryId: 1,
//     is_sold: false,
//     listing_status: 'approved',
//     title: 'Holestin frishian hf',
//     calls: [],
//     category: {
//       connect: {
//         id: 1,
//       },
//     },
//     seller: {
//       connect: {
//         id: 5,
//       },
//     },
//   },
// ];

const { generateRandomCattleData } = require('./util');

// console.log('data', data);

// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();

// async function seedDatabase() {
//   try {

// let createdCattle = [];
// for (let i = 0; i < 50; i++) {
//   const data = generateRandomCattleData();
//   const resp = await prisma.catttle.create({
//     data,
//   });
//   createdCattle.push(resp);
// }

// console.log('CattleCategory seeded:', createdCattleCategories);
// } catch (error) {
//   console.error('Error seeding the database:', error);
// } finally {
//   await prisma.$disconnect();
// }/

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

let countdown = 0;
async function seedDatabase() {
  try {
    let createdCattle = [];
    for (let i = 0; i < 10000; i++) {
      console.log('Started Cattle No: ', countdown);
      const data = generateRandomCattleData();
      const resp = await prisma.cattle.create({
        data: data,
      });
      createdCattle.push(resp);
      countdown++;
      console.log('Completed Cattle No: ', countdown);
    }

    console.log('createdCattle seeded:', createdCattle);
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
