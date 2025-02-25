import { prisma } from "@/lib/db";

export async function PUT(req: Request) {
  try {
    const { id, imageUrl } = await req.json();

    const product = await prisma.gifts.update({
      where: {
        id,
      },
      data: {
        imageUrl,
      },
    });

    return Response.json(product, { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response(`UPDATE-PRODUCT-IMAGE-ERROR: ${error}`, {
      status: 500,
    });
  }
}
