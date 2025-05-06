import Link from "next/link";

export default function ErrorPage() {
  return (
    <p>
      Sorry, something went wrong <Link href="/login">to login</Link>
    </p>
  );
}
