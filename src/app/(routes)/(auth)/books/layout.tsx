import Navigation from "@/components/navi/Navigation";
import { fetchAllBooks } from "@/lib/api/auth/book";
import { cacheTags } from "@/utils/cacheTags";
import { revalidateTag } from "next/cache";

revalidateTag(cacheTags.UPDATE_BOOKDATA);

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await fetchAllBooks();
  return (
    <div>
      <Navigation />
      <div>{children}</div>
    </div>
  );
}
