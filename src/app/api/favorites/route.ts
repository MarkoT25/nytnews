import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/util/auth";

export async function POST(req: Request) {
  try {
    const user = await getAuthUser();

    if (!user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = user?.id;

    const { title, url, imageUrl, category, createdBy } = await req.json();

    await prisma.favorite.create({
      data: {
        title,
        url,
        imageUrl,
        category,
        createdBy,
        userId: userId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getAuthUser();

    if (!user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = user?.id;

    const { url } = await req.json();

    await prisma.favorite.delete({
      where: {
        userId_url: {
          userId: userId,
          url,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
}
