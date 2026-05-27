import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.admin.findFirst();
  if (!existingAdmin) {
    await prisma.admin.create({
      data: {
        password: 'draiaquinas2023',
      },
    });
    console.log('Admin password seeded successfully.');
  } else {
    console.log('Admin password already exists.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
