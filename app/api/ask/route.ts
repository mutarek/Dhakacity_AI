import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
import { toPlaceDto } from "@/lib/place-utils";
import { vectorSearchPlaceIds } from "@/lib/embeddings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CHAT_MODEL = process.env.OPENAI_CHAT_MODEL ?? "gpt-4o-mini";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const question = String(body.question ?? "").trim();

    if (!question) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 });
    }

    let candidateIds = await vectorSearchPlaceIds(prisma, question, 5);

    if (candidateIds.length === 0) {
      const fallback = await prisma.place.findMany({
        where: {
          OR: [
            { name: { contains: question, mode: "insensitive" } },
            { address: { contains: question, mode: "insensitive" } },
            {
              placeTags: {
                some: {
                  tag: {
                    name: { contains: question, mode: "insensitive" },
                  },
                },
              },
            },
          ],
        },
        orderBy: { featured: "desc" },
        take: 5,
      });
      candidateIds = fallback.map((place) => place.id);
    }

    const matchedPlacesRaw = await prisma.place.findMany({
      where: { id: { in: candidateIds } },
      include: {
        placeTags: {
          include: { tag: true },
        },
      },
    });

    const order = new Map(candidateIds.map((id, index) => [id, index]));
    const matchedPlaces = matchedPlacesRaw.sort(
      (a, b) => (order.get(a.id) ?? 999) - (order.get(b.id) ?? 999),
    );

    let answer = "I found some great options for you.";
    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey && matchedPlaces.length > 0) {
      const openai = new OpenAI({ apiKey });
      const context = matchedPlaces
        .map((place) => {
          const tags = place.placeTags.map((pt) => pt.tag.name).join(", ");
          return `- ${place.name} (${place.category}) | ${place.address} | ${place.priceRange} | ${place.openHours} | tags: ${tags}`;
        })
        .join("\n");

      const completion = await openai.chat.completions.create({
        model: CHAT_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are DhakaCity AI. Give concise, useful recommendations using only the provided places.",
          },
          {
            role: "user",
            content: `Question: ${question}\n\nPlaces:\n${context}`,
          },
        ],
        temperature: 0.4,
      });

      answer =
        completion.choices[0]?.message?.content?.trim() ||
        "Here are the best matches I found.";
    }

    return NextResponse.json({
      answer,
      places: matchedPlaces.map((place) => toPlaceDto(place)),
    });
  } catch (error) {
    console.error("Ask API failed", error);
    return NextResponse.json({ error: "Failed to process question" }, { status: 500 });
  }
}
