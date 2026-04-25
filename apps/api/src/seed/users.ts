import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);
  
  const users = [
    { name: 'System Admin', email: 'admin@mintmarks.in', role: 'ADMIN' },
    { name: 'Heritage Expert', email: 'expert@mintmarks.in', role: 'EXPERT' },
    { name: 'Senior Evaluator', email: 'expert2@mintmarks.in', role: 'EXPERT' },
    { name: 'Pro Collector', email: 'user@mintmarks.in', role: 'USER' },
    { name: 'Initial Member', email: 'user2@mintmarks.in', role: 'USER' },
    { name: 'Sushil Gulati', email: 'sushil.gulati@gmail.com', role: 'ADMIN' }
  ];

  console.log('Seeding users...');

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: { role: u.role as any },
      create: {
        name: u.name,
        email: u.email,
        password,
        role: u.role as any,
      },
    });
    console.log(`- ${u.name} (${u.role})`);
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
