export const revalidate = 60;

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const offset = searchParams.get("offset") || "0";
    const limit = searchParams.get("limit") || "20";

    const url = new URL(
      "https://api.nytimes.com/svc/news/v3/content/all/all.json",
    );
    url.searchParams.set("api-key", process.env.NEW_YORK_TIMES_API_KEY || "");
    url.searchParams.set("offset", offset);
    url.searchParams.set("limit", limit);

    const response = await fetch(url.toString(), {
      cache: "force-cache",
      next: {
        revalidate: 300,
      },
    });
    const data = await response.json();

    return Response.json({
      results: data.results,
      pagination: {
        offset: Number.parseInt(offset),
        limit: Number.parseInt(limit),
        total: data.num_results || 0,
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Error fetching latest news", { status: 500 });
  }
}
