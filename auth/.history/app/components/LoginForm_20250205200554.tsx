"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setMessage("Invalid login credentials");
    } else {
      router.push("/"); 
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email", { required: "Email is required" })} placeholder="Email" type="email" />
        {errors.email && <p>{errors.email.message}</p>}
        
        <input {...register("password", { required: "Password is required", minLength: 6 })} placeholder="Password" type="password" />
        {errors.password && <p>Password must be at least 6 characters</p>}
        
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
