import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

async function fetchUserInfo({ user }: { user: User }): Promise<User | null> {
  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  return dbUser;
}

export default fetchUserInfo;
