import { PrismaClient } from '@prisma/client'
import { CITIES } from '../../src/config/cities'

export async function seedCities(prisma: PrismaClient) {
  console.log('🏙️  Seeding cities...')

  for (const city of CITIES) {
    await prisma.city.upsert({
      where: { slug: city.slug },
      update: {},
      create: {
        name: city.name,
        nameEn: city.nameEn,
        slug: city.slug,
        province: city.province,
        description: city.description,
        latitude: city.latitude,
        longitude: city.longitude,
        image: city.image,
      },
    })
  }

  console.log(`✅ Created ${CITIES.length} cities`)
}
