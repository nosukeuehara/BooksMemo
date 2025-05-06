import Navigation from "@/components/navi/Navigation";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Navigation />
      <div>{children}</div>
    </div>
  );
}
