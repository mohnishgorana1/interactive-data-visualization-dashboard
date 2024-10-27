import Dashboard from "@/components/Dashboard";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-up");
  }
  return (
    <main className="">
      <Dashboard />
    </main>
  );
}
