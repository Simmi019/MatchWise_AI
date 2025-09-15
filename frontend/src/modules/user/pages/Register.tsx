import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

import { registerSchema, type RegisterSchema } from "../validations/register-validation";
import { doRegister, doGoogleLogin } from "../api/user-api";

import { auth, provider, signInWithPopup } from "@/firebase";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Register() {
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const res = await doRegister(data);

      if (res.data.success) {
        toast.success("OTP sent to your email");
        setServerError("");
        reset();
        navigate("/verify-otp", {
          state: { email: data.email, name: data.name, password: data.password }
        });
      } else {
        const errorMsg = res.data.error || "Registration failed";
        setServerError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      setServerError(errorMsg);
      toast.error(errorMsg);
    }
  };

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
    } catch (err) {
      console.error("Google login error:", err);
      toast.error("Google Sign-In failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#1e1b4b] to-[#312e81] px-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Create an Account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-white">Full Name</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Your name"
                className="bg-white/20 border border-white/30 text-white placeholder-white focus:ring-2 focus:ring-indigo-400"
              />
              {errors.name && (
                <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className="bg-white/20 border border-white/30 text-white placeholder-white focus:ring-2 focus:ring-indigo-400"
              />
              {errors.email && (
                <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className="bg-white/20 border border-white/30 text-white placeholder-white pr-10 focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-white/70 hover:text-white"
              >
                {showPassword ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
              </button>
              {errors.password && (
                <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Server Error */}
            {serverError && (
              <p className="text-sm text-red-400 text-center">{serverError}</p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold shadow-md"
            >
              Register
            </Button>
          </form>

          {/* Divider */}
          <h1 className="text-center text-white my-4">or</h1>

          {/* Google Sign In */}
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium shadow-sm transition hover:bg-gray-100 hover:shadow-md active:scale-95"
          >
            <FcGoogle size={22} />
            Continue with Google
          </Button>

          <p className="text-sm text-white text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-300 underline hover:text-pink-400">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
