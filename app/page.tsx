import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/drizzle/sessions";

export default async function RootPage() {
  const user = await getCurrentUser();

  // If not logged in, go to login
  if (!user) {
    redirect("/login");
  }

  // If logged in, go to dashboard
  redirect("/dashboard");
}
