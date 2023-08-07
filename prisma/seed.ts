import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

  await prisma.user.deleteMany();

  const mockPassword = 'password';
  await prisma.user.createMany({
    data: [
      {
        fio: 'Белый Сергей Иванов',
        email: 'bsi@yandex.ru',
        password: mockPassword,
      },
      {
        fio: 'Krisper Michael',
        email: 'km@gmail.com',
        password: mockPassword,
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
