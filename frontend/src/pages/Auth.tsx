import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "motion/react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  username: z.string().optional(),
});

type AuthFormData = z.infer<typeof authSchema>;

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, isSigningUp, isLoggingIn, register } = useAuth();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  function onSubmit(data: AuthFormData) {
    if (isLogin) {
      login({ email: data.email, password: data.password });
    } else {
      if (!data.username) {
        toast.error("Please add username!");
        return;
      } else {
        register(data);
        setIsLogin(false);
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(elipse_at_top,var(--tw-gradient-stops))] from-gray-900 to-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-brand-gray border border-gray-800 p-8 rounded-3xl shadow-2xl"
      >
        <h2 className="text-3xl font-black mb-2 text-white text-center">
          {isLogin ? "Welcome Back" : "Join The Future"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-8">
          {!isLogin && (
            <div>
              <input
                {...formRegister("username")}
                placeholder="Username"
                className="w-full bg-black/50 border border-gray-700 rounded-xl p-4 text-white focus:border-brand-yellow outline-none transition"
              />
            </div>
          )}

          <div>
            <input
              {...formRegister("email")}
              placeholder="Email"
              className="w-full bg-black/50 border border-gray-700 rounded-xl p-4 text-white focus:border-brand-yellow outline-none transition"
            />
            {errors.email && (
              <p className="text-red-500  text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...formRegister("password")}
              placeholder="Password"
              type="password"
              className="w-full bg-black/50 border border-gray-700 rounded-xl p-4 text-white focus:border-brand-yellow outline-none transition"
            />
            {errors.password && (
              <p className="text-red-500  text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            disabled={isLoggingIn || isSigningUp}
            className=" cursor-pointer w-full text-center bg-brand-yellow text-black font-bold py-4 rounded-xl hover:bg-yellow-400 transition mt-4 "
          >
            {isLoggingIn || isSigningUp ? (
              <Loader2 className="animate-spin size-6 mx-auto" />
            ) : isLogin ? (
              "Login"
            ) : (
              "Create Account"
            )}
          </button>

          <p
            className="mt-6 text-center text-gray-400 text-sm cursor-pointer hover:text-white transition"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Need an account? Sign Up" : "Have An Account? Login"}
          </p>
        </form>
      </motion.div>
    </div>
  );
}
