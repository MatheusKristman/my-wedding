import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, price, imageUrl, stock, link } = await req.json();

    await prisma.gifts.create({
      data: {
        name,
        price,
        imageUrl,
        stock,
        link,
      },
    });

    return new Response("Presente cadastrado", { status: 200 });
  } catch (error) {
    console.log(`[CREATE-PRODUCT-ERROR]: ${error}`);

    return new Response(`[CREATE-PRODUCT-ERROR]: ${error}`, { status: 500 });
  }
}
