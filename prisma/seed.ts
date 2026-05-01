import { prisma } from "../lib/prisma";
import { mockPlaces } from "../lib/mock-data";
import { normalizeTagList, parseImageUrls } from "../lib/place-utils";
import { upsertPlaceEmbedding } from "../lib/embeddings";

async function main() {
  await prisma.embedding.deleteMany();
  await prisma.placeTag.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.place.deleteMany();

  for (const item of mockPlaces) {
    const tags = normalizeTagList(item.tags);
    const created = await prisma.place.create({
      data: {
        name: item.name,
        category: item.category,
        address: item.address,
        lat: item.lat,
        lng: item.lng,
        phone: item.phone,
        openHours: item.openHours,
        priceRange: item.priceRange,
        featured: item.featured,
        imageUrls: parseImageUrls((item.imageUrls ?? item.images ?? []).join(",")),
        placeTags: {
          create: tags.map((tagName) => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName },
              },
            },
          })),
        },
      },
    });

    await upsertPlaceEmbedding(prisma, {
      placeId: created.id,
      name: created.name,
      category: created.category,
      address: created.address,
      priceRange: created.priceRange,
      tags,
    });
  }

  console.log(`Seeded ${mockPlaces.length} places`);
}

main()
  .catch((error) => {
    console.error("Seeding failed", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
