export async function authUser({ session }: { session?: string }) {
  if (!session) {
    console.error("Session not found");
    return null;
  }

  const userResponse = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/user`,
    {
      cache: "no-store",
      headers: {
        Cookie: `session=${session}`,
      },
    },
  );

  if (!userResponse.ok) {
    console.error("Failed to fetch user data");
    return null;
  }

  const userData = await userResponse.json();

  if (!userData || !userData.user) {
    console.error("User data not found");
    return null;
  }

  return userData;
}
