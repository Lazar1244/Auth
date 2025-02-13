import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogoutButton from "./components/LogoutButton";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login"); 
  }

  return (
    <div>
      <h2>Welcome to the Protected Page</h2>
      <p>You are logged in as {session.user?.name}.</p>
      <p>Your email is {session.user?.email}.</p>

     
      <LogoutButton />
    </div>
  );
}
