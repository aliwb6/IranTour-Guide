import { PrismaClient } from '@prisma/client'
import { seedCities } from './seeds/cities'
import { seedCategories } from './seeds/categories'
import { seedEvents } from './seeds/events'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...\n')

  try {
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing data...')
    await prisma.eventCategory.deleteMany({})
    await prisma.event.deleteMany({})
    await prisma.category.deleteMany({})
    await prisma.city.deleteMany({})
    console.log('✅ Cleared existing data\n')

    // Seed in order: cities -> categories -> events
    await seedCities(prisma)
    console.log()

    await seedCategories(prisma)
    console.log()

    await seedEvents(prisma)
    console.log()

    console.log('✅ Database seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
