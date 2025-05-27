import { fetchAllBooks } from "@/lib/api/auth/book";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await fetchAllBooks();
  return <div>{children}</div>;
}
