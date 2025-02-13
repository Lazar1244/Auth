import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogoutButton from "./components/LogoutButton";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login"); 
  }

  return (
    <div className="flex flex-col items-center">
      <Image src="/7.jpg" alt="Logo" width={100} height={100} />
      <h2 className="text-2xl font-bold">Welcome to the Protected Page</h2>
      <p>You are logged in as {session.user?.name}.</p>
      <p>Your email is {session.user?.email}.</p>

      <div className="flex space-x-4 mt-4">
        <LogoutButton />
        <Link href="/add-login">
          <button className="bg-green-500 p-2 text-white">Add Another Login</button>
        </Link>
      </div>
    </div>
  );
}
