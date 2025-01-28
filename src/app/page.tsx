import { HydrateClient } from "@/trpc/server";
import GoogleFitPage from "@/app/_components/GoogleFit/page";
import { auth } from "@/server/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <HydrateClient>
      <main className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <div className="text-center text-2xl">
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-center text-2xl">
                  {session && <span>Logged in as {session.user?.name}</span>}
                </p>
                <Link
                  href={session ? "/api/auth/signout" : "/api/auth/signin"}
                  className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                >
                  {session ? "Sign out" : "Sign in"}
                </Link>
              </div>
            </div>
          </div>
          <GoogleFitPage />
        </div>
      </main>
    </HydrateClient>
  );
}
