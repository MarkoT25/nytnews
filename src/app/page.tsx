import React from "react";
import { HomePage } from "@/components/HomePage/HomePage";
import { NYTimesResponse } from "@/types/index";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

interface HomePageProps {
  searchParams: Promise<{
    category?: string;
    query?: string;
    type?: string;
  }>;
}

const Home = async (props: HomePageProps) => {
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

  const searchParams = await props.searchParams;

  const category = searchParams.category
    ? searchParams.category.toLowerCase()
    : "home";

  const query = searchParams.query || "";

  const apiKey = process.env.NEW_YORK_TIMES_API_KEY;

  const url = new URL(
    "https://api.nytimes.com/svc/search/v2/articlesearch.json"
  );

  if (query) {
    url.searchParams.set("q", query);
  }

  if (
    category &&
    category.toLowerCase() !== "general" &&
    category.toLowerCase() !== "home"
  ) {
    url.searchParams.set("fq", `section.name:"${category.toLowerCase()}"`);
  }

  url.searchParams.set("api-key", apiKey!);

  const articlesResponse = await fetch(url.toString(), {
    cache: "force-cache",
    next: query ? undefined : { revalidate: 300 },
  });

  const articlesData = await articlesResponse.json();

  const articles: NYTimesResponse = articlesData.response;

  const favorites = await prisma.favorite.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: "desc" },
  });

  // Prefetching latest news for initial data at Latest News Widget
  const latestNews = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/latest-news?offset=0&limit=20`
  )
    .then((res) => res.json())
    .then((data) => data?.results ?? []);
  return (
    <HomePage
      articles={articles?.docs}
      favorites={favorites}
      latestNews={latestNews}
      user={user}
      searchParams={searchParams}
    />
  );
};

export default Home;
