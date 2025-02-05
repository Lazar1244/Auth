import RegisterForm from "../components/RegisterForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div>
      <RegisterForm />

      <p>Already have an account?</p>
      <Link href="/login">
        <button>Login</button>
      </Link>
    </div>
  );
}
