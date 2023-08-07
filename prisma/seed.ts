import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

  await prisma.user.deleteMany();

  const newLocal = 'password';
  await prisma.user.createMany({
    data: [
      {
        fio: 'Белый Сергей Иванов',
        email: 'bsi@yandex.ru',
        password: newLocal,
      },
      {
        fio: 'Krisper Michael',
        email: 'km@gmail.com',
        password: newLocal,
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
