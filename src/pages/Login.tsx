import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Lock, Mail } from "lucide-react";

interface LoginProps {
  onLogin: (token: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.email === "Anand" && formData.password === "Anand014") {
      const mockToken = "mock-jwt-token-" + Date.now();
      onLogin(mockToken);
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-900 dark:to-black p-6 transition-all">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
          Welcome Back!
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <div className="mt-1 flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-gray-500">
              <Mail className="text-gray-400 dark:text-gray-300 mr-2" />
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border-none outline-none focus:ring-0 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="mt-1 flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-gray-500">
              <Lock className="text-gray-400 dark:text-gray-300 mr-2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border-none outline-none focus:ring-0 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-transparent"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 dark:text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-3 px-4 text-lg font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all"
            >
              Sign In
            </Button>
          </div>
        </form>

        <div className="text-sm text-center text-gray-700 dark:text-gray-300 mt-4">
          <span className="font-semibold">Demo credentials:</span>
          <br />
          <span className="text-blue-600 dark:text-blue-400 font-medium">
            Email: Anand
          </span>{" "}
          |{" "}
          <span className="text-blue-600 dark:text-blue-400 font-medium">
            Password: Anand014
          </span>
        </div>
      </div>
    </div>
  );
}
