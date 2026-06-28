import { prisma } from '../src/libs/prisma';
import { hashPassword } from '../src/libs/bcrypt';

async function seed() {
  await prisma.user.upsert({
    where: {
      email: 'admin-endtoend@mail.com',
    },
    update: {},
    create: {
      email: 'admin-endtoend@mail.com',
      password: await hashPassword('password'),
      role: 'ADMIN',
      username: 'matths',
    },
  });
}

seed()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
