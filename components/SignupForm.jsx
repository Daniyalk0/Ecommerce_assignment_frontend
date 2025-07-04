"use client";

// import { AuthContext } from "@/app/contexts/AuthContext";
import { useState, useContext } from "react";
import { signupSchema } from "../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthContext } from "../src/app/contexts/AuthContext";

const SignupForm = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { loginUser } = authContext;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data) => {
    const { email } = data;
    loginUser({ email });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto mt-10 bg-white p-6 rounded-lg shadow"
    >
      <h2 className="text-2xl font-semibold mb-4">SignUp</h2>

      <input
        type="text"
        placeholder="Name"
        {...register("name")}
        className="w-full mb-1 p-2 border rounded"
      />
      {errors.name && (
        <p className="text-red-500 text-sm mb-3">{errors.name.message}</p>
      )}

      <input
        type="email"
        placeholder="Email"
        {...register("email")}
        className="w-full mb-1 p-2 border rounded"
      />
      {errors.email && (
        <p className="text-red-500 text-sm mb-3">{errors.email.message}</p>
      )}

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        className="w-full mb-1 p-2 border rounded"
      />
      {errors.password && (
        <p className="text-red-500 text-sm mb-3">{errors.password.message}</p>
      )}

      <input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword")}
        className="w-full mb-1 p-2 border rounded"
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm mb-3">
          {errors.confirmPassword.message}
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-cyan-500 text-white py-2 mt-2 rounded hover:bg-cyan-600"
      >
        SignUp
      </button>
    </form>
  );
};

export default SignupForm;
