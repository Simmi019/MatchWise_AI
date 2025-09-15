/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

import { loginSchema, type LoginSchema } from "../validations/register-validation";
import { doLogin, doGoogleLogin } from "../api/user-api";

import { auth, provider, signInWithPopup } from "@/firebase";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  });

  // Normal Login
  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await doLogin(data);
      const { token, role, message } = res.data;

      if (!token || !role || !message) throw new Error("Invalid email or password");

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      setSuccessMessage(message);
      setServerError("");
      reset();
      window.dispatchEvent(new Event("storage"));
      toast.success(message);
      navigate("/");
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || "Login failed";
      setServerError(errorMsg);
      setSuccessMessage("");
      toast.error(errorMsg);
    }
  };

  // Google Login
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const res = await doGoogleLogin({ idToken: token });
      const { token: jwtToken, message } = res.data;

      localStorage.setItem("token", jwtToken);
      localStorage.setItem("role", "user");
      toast.success(message);
      navigate("/");
    } catch (err: any) {
      console.error("Google login error:", err);
      toast.error("Google Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#1e1b4b] to-[#312e81] px-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Welcome Back</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className="bg-white/20 border-white/30 text-white placeholder-white focus:ring-2 focus:ring-indigo-400"
              />
              {errors.email && (
                <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-white">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className="bg-white/20 border-white/30 text-white placeholder-white pr-10 focus:ring-2 focus:ring-indigo-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-2 flex items-center text-white/70 hover:text-white"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Server Response */}
            {serverError && <p className="text-sm text-red-400">{serverError}</p>}
            {successMessage && <p className="text-sm text-green-400">{successMessage}</p>}

            <div className="flex justify-center mb-4">
              <Link to="/forgot-password" className="text-sm text-pink-300 underline hover:text-pink-400">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold shadow-md transition-all"
            >
              Login
            </Button>
          </form>

          <h1 className="text-center text-white my-4">or</h1>

          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium shadow-sm transition hover:bg-gray-100 hover:shadow-md active:scale-95"
          >
            <FcGoogle size={22} />
            Continue with Google
          </Button>

          <p className="text-sm text-white text-center mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-pink-300 underline hover:text-pink-400">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
