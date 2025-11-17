"use client";

import Link from "next/link";
import { Button } from "@/Components/ui/button";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { error } from "console";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit signup form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            role: isAdmin ? "admin" : "customer",
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (!res.ok) throw new Error(data.message || "Signup failed");

      if (data.user.role === "admin") {
        router.push("/Admin/Users");
        toast.success("Welcome Admin");
      } else {
        router.push("/");
        toast.success("Signup successful! Please Sign In.");
      }

      setFormData({ username: "", email: "", password: "" });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="h-[650px] w-full md:w-[600px] mt-[60px] mx-auto shadow-2xl rounded-4xl flex items-center justify-center bg-neutral-100 px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center">
            {isAdmin ? "Create Admin Account" : "Create Account"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-black outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-black outline-none"
            />

            <div className="space-y-1">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring focus:ring-black outline-none"
              />
            </div>

            <label className="flex items-center space-x-2 cursor-pointer">
              <span
                className="text-sm text-neutral-600 font-medium hover:text-black transition"
                onClick={() => setIsAdmin(!isAdmin)}
              >
                Login as Admin
              </span>
            </label>

            <Button
              type="submit"
              className="w-full bg-black text-white rounded-full py-3 text-lg"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>

          <div className="flex items-center justify-center gap-2">
            <div className="flex-1 h-[1px] bg-neutral-300"></div>
            <span className="text-neutral-500 text-sm">or</span>
            <div className="flex-1 h-[1px] bg-neutral-300"></div>
          </div>

          <p className="text-sm text-center text-neutral-600">
            Already have an account?{" "}
            <Link href="/" className="text-black font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
