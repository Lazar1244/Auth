"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginFormData>();
  const [message, setMessage] = useState("");

  const onSubmit = async (data: LoginFormData) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setMessage("Invalid credentials");
    } else {
      setMessage("Login successful!");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Image src="/7.jpg" alt="Logo" width={100} height={100} />
      <h2 className="text-xl font-bold">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <input {...register("email", { required: "Email is required" })} placeholder="Email" type="email" className="border p-2 m-2" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        
        <input {...register("password", { required: "Password is required", minLength: 6 })} placeholder="Password" type="password" className="border p-2 m-2" />
        {errors.password && <p className="text-red-500">Password must be at least 6 characters</p>}

        <div className="flex space-x-2">
          <button type="button" onClick={() => reset()} className="bg-gray-400 p-2">Reset</button>
          <button type="submit" className="bg-blue-500 p-2 text-white">OK</button>
        </div>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
