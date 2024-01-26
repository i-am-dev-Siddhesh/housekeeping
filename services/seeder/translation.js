const translations = [
  {
    Marathi: 'गाय',
    Hindi: 'गाय',
    English: 'Cow',
  },
  {
    Marathi: 'म्हैस',
    Hindi: 'भैंस',
    English: 'Buffalo',
  },
  {
    Marathi: 'रेडकू',
    Hindi: 'बछिया',
    English: 'Bachiya',
  },
  {
    Marathi: 'वासरू',
    Hindi: 'पाड़ी',
    English: 'Paadi',
  },
  {
    Marathi: 'रेडा',
    Hindi: 'भैंसा',
    English: 'Male Baffalo',
  },
  {
    Marathi: 'बैल',
    Hindi: 'बैल',
    English: 'Bull',
  },
  {
    Marathi: 'इतर',
    Hindi: 'अन्य',
    English: 'Other',
  },
];

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const createdCattleTranslationTitle =
      await prisma.cattleTranslationTitle.createMany({
        data: translations,
      });
    console.log(
      'CattleTranslationTitle seeded:',
      createdCattleTranslationTitle
    );
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
