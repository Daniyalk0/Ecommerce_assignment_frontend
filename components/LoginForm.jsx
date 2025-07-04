"use client";

import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

// import { AuthContext } from "@/app/contexts/AuthContext";
import { loginSchema } from "../lib/validation";
import { AuthContext } from "../src/app/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { loginUser } = authContext;

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    const { email } = data;
    loginUser({ email });
    router.push("/");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto mt-10 bg-white p-6 rounded-lg shadow"
    >
      <h2 className="text-2xl font-semibold mb-4">Login</h2>

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

      <button
        type="submit"
        className="w-full bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
