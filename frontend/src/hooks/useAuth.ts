import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type User } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      if (!token || !storedUser) return null;
      return JSON.parse(storedUser) as User;
    },
    staleTime: Infinity,
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: unknown) => {
      const { data } = await api.post("/auth/login", credentials);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      queryClient.setQueryData(["user"], data.user);
      toast.success("Welcome back!");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data?.message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials: unknown) => {
      const { data } = await api.post("/auth/register", credentials);
      return data;
    },
    onSuccess: () => {
      toast.success("Account created! Please login.");
      window.location.reload();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "signup failed!");
    },
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    queryClient.setQueryData(["user"], null);
    navigate("/auth");
  };

  return {
    user,
    login: loginMutation.mutate,
    isLoading,
    register: registerMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isSigningUp: registerMutation.isPending,
    logout,
  };
};
