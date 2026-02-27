import { PrismaClient } from '@prisma/client'
import seedEvents from './seed/events'

const prisma = new PrismaClient()

const categories = [
  { name: 'مناسبت‌های ملی', slug: 'national-events' },
  { name: 'مذهبی و آیینی', slug: 'religious' },
  { name: 'جشنواره‌های فرهنگی', slug: 'cultural-festivals' },
  { name: 'سینما و فیلم', slug: 'cinema-film' },
  { name: 'موسیقی و هنر', slug: 'music-art' },
  { name: 'علمی و پژوهشی', slug: 'scientific' },
  { name: 'طبیعت‌گردی', slug: 'nature-tourism' },
  { name: 'نمایشگاهی', slug: 'exhibition' },
  { name: 'اقتصادی و تجاری', slug: 'economic-business' },
  { name: 'ورزشی', slug: 'sports' },
  { name: 'غذا و آشپزی', slug: 'food-culinary' },
  { name: 'کتاب و ادبیات', slug: 'books-literature' },
  { name: 'تکنولوژی', slug: 'technology' },
  { name: 'سنتی و محلی', slug: 'traditional-local' },
  { name: 'خانوادگی و کودکان', slug: 'family-children' },
]

const adminUser = {
  name: 'مدیر سایت',
  email: 'admin@irantour-guide.com',
  password: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu8GW', // hashed "admin123"
  role: 'ADMIN' as const,
}

async function main() {
  console.log('🌱 Start seeding...\n')

  try {
    console.log('👤 Seeding admin user...')
    await prisma.user.upsert({
      where: { email: adminUser.email },
      update: { name: adminUser.name, role: adminUser.role },
      create: adminUser,
    })
    console.log('  ✓ Admin user created\n')

    console.log('📂 Seeding categories...')
    for (const cat of categories) {
      await prisma.category.upsert({
        where: { slug: cat.slug },
        update: { name: cat.name },
        create: cat,
      })
      console.log(`  ✓ ${cat.name}`)
    }
    console.log('')

    console.log('🎭 Seeding events...')
    await seedEvents()

    console.log('\n✅ Seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
