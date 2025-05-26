import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

interface VerifyPageProps {
  searchParams?: Promise<{
    token?: string;
  }>;
}

export default async function VerifyPage(props: VerifyPageProps) {
  const searchParams = await props.searchParams;
  const token = searchParams?.token || "";

  if (!token) {
    return <div>Invalid verification link</div>;
  }

  const user = await prisma.user.findFirst({
    where: { verificationToken: token },
  });

  if (!user) {
    return <div>Invalid or expired verification link</div>;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      verificationToken: null,
    },
  });

  redirect("/login");
}
