import Navigation from "@/components/navi/Navigation";
import { fetchUserProfile } from "@/lib/api/auth/profile";
import { cacheTags } from "@/utils/cacheTags";
import { revalidateTag } from "next/cache";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  revalidateTag(cacheTags.POST_PROFILE);
  await fetchUserProfile();
  return (
    <div>
      <Navigation />
      <div>{children}</div>
    </div>
  );
}
