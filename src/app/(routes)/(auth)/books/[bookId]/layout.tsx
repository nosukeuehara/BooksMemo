import { fetchAllBooks } from "@/lib/api/auth/book";
import { cacheTags } from "@/utils/cacheTags";
import { revalidateTag } from "next/cache";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  revalidateTag(cacheTags.UPDATE_BOOKDATA);
  await fetchAllBooks();
  return <div>{children}</div>;
}
