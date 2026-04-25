import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'sushil.gulati@gmail.com';
  const password = 'Password123!';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: 'ADMIN',
      name: 'Sushil Gulati'
    },
    create: {
      email,
      password: hashedPassword,
      role: 'ADMIN',
      name: 'Sushil Gulati'
    }
  });

  console.log('Test user configured:', user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
