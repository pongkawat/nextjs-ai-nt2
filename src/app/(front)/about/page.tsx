import Link from "next/link";
import AppLoading from "../components/app-loading";
import { Suspense } from "react";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

async function ApiVersion() {
  const response = await fetch('https://api.codingthailand.com/api/version');
  const apiInfo = await response.json();

  return <p>API Version: {apiInfo.data.version}</p>;
}

// http://localhost:3000/about
export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <div className="max-w-2xl space-y-6 rounded-2xl bg-card p-12 shadow-xl border">
        <h1 className="text-4xl font-bold tracking-tight text-primary">About Us</h1>
        <div className="space-y-4">
          <Suspense fallback={<AppLoading />}>
            <ApiVersion />
          </Suspense>
          <p className="text-muted-foreground">
            Welcome to our platform. We are dedicated to providing the best experience for our users.
          </p>
        </div>
        <div className="pt-6">
          <Link href="/" className="text-sm font-medium text-primary hover:underline">
            ← Back to Home Page
          </Link>
        </div>
      </div>
      <footer className="mt-8 text-sm text-muted-foreground">
        Powered by NT
      </footer>
    </main>
  );
}