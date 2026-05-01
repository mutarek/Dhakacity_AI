import OpenAI from "openai";
import { PrismaClient } from "@prisma/client";
import { Place } from "@/types/place";

const EMBEDDING_MODEL = process.env.OPENAI_EMBEDDING_MODEL ?? "text-embedding-3-small";

type EmbeddingSeed = {
  placeId: number;
  name: string;
  category: Place["category"];
  address: string;
  priceRange: string;
  tags: string[];
};

export function buildPlaceEmbeddingText(input: EmbeddingSeed): string {
  const tags = input.tags.join(", ");
  return `${input.name}, ${input.category}, ${input.address}, ${input.priceRange}, tags: ${tags}`;
}

export async function createEmbedding(text: string): Promise<number[] | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const client = new OpenAI({ apiKey });
  const result = await client.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text,
  });

  return result.data?.[0]?.embedding ?? null;
}

export async function upsertPlaceEmbedding(
  prisma: PrismaClient,
  payload: EmbeddingSeed,
): Promise<void> {
  const content = buildPlaceEmbeddingText(payload);
  const embedding = await createEmbedding(content);

  if (!embedding) {
    return;
  }

  const vectorLiteral = `[${embedding.join(",")}]`;

  await prisma.$executeRawUnsafe(
    `
    INSERT INTO embeddings (place_id, content, embedding)
    VALUES ($1, $2, $3::vector)
    ON CONFLICT (place_id)
    DO UPDATE SET
      content = EXCLUDED.content,
      embedding = EXCLUDED.embedding,
      updated_at = NOW()
    `,
    payload.placeId,
    content,
    vectorLiteral,
  );
}

export async function vectorSearchPlaceIds(
  prisma: PrismaClient,
  question: string,
  limit = 5,
): Promise<number[]> {
  const embedding = await createEmbedding(question);
  if (!embedding) {
    return [];
  }

  const vectorLiteral = `[${embedding.join(",")}]`;

  const rows = await prisma.$queryRawUnsafe<Array<{ place_id: number }>>(
    `
    SELECT place_id
    FROM embeddings
    ORDER BY embedding <=> $1::vector
    LIMIT $2
    `,
    vectorLiteral,
    limit,
  );

  return rows.map((row) => row.place_id);
}
