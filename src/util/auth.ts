import { prisma } from "@/lib/prisma";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

export async function getAuthUser() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;

    if (!sessionToken) {
      return null;
    }

    const session = await decrypt(sessionToken);

    if (!session || !session.userId) {
      return null;
    }

    const expiresAt = new Date(session.expiresAt as string);
    if (expiresAt < new Date()) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId as string },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error getting authenticated user:", error);
    return null;
  }
}
