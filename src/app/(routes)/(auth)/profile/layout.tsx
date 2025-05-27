import Navigation from "@/components/navi/Navigation";
import { fetchUserProfile } from "@/lib/api/auth/profile";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await fetchUserProfile();
  return (
    <div>
      <Navigation />
      <div>{children}</div>
    </div>
  );
}
