"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  const [message, setMessage] = useState("");

  const onSubmit = async (data: RegisterFormData) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    setMessage(result.message);
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: "Name is required" })} placeholder="Name" />
        {errors.name && <p>{errors.name.message}</p>}
        
        <input {...register("email", { required: "Email is required" })} placeholder="Email" type="email" />
        {errors.email && <p>{errors.email.message}</p>}
        
        <input {...register("password", { required: "Password is required", minLength: 6 })} placeholder="Password" type="password" />
        {errors.password && <p>Password must be at least 6 characters</p>}
        
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
