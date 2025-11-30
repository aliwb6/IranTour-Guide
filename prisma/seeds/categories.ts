import { PrismaClient } from '@prisma/client'
import { CATEGORIES } from '../../src/config/categories'

export async function seedCategories(prisma: PrismaClient) {
  console.log('📂 Seeding categories...')

  for (const category of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: {
        name: category.name,
        nameEn: category.nameEn,
        slug: category.slug,
        description: category.description,
        icon: category.icon,
        color: category.color,
      },
    })
  }

  console.log(`✅ Created ${CATEGORIES.length} categories`)
}
