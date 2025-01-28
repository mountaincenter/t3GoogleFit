import { HydrateClient } from "@/trpc/server";
import DataSources from "./_components/DataSources/page";

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <DataSources />
      </main>
    </HydrateClient>
  );
}
