import LoginForm from "../components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <LoginForm />

      <p>Don't have an account?</p>
      <Link href="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
}
