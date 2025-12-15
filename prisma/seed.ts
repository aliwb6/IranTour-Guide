import { PrismaClient } from '@prisma/client'
import seedEvents from './seed/events'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Start seeding...')

  try {
    // Seed events
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
