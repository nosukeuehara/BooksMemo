import { fetchAllBooks } from "@/lib/api/auth/book";
import { cacheTags } from "@/utils/cacheTags";
import { revalidateTag } from "next/cache";

revalidateTag(cacheTags.UPDATE_BOOKDATA);

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await fetchAllBooks();
  return <div>{children}</div>;
}
