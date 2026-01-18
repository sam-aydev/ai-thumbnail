import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type Thumbnail, type User } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useThumbnail = () => {
  const queryClient = useQueryClient();

  const { data: thumbnails, isLoading: isHistoryLoading } = useQuery({
    queryKey: ["thumbnails"],
    queryFn: async () => {
      const { data } = await api.get<{ data: Thumbnail[] }>(
        "/thumbnail/history",
      );
      return data.data;
    },
  });

  const generateMutation = useMutation({
    mutationFn: async ({ title, style }: { title: string; style: string }) => {
      const { data } = await api.post("/thumbnail/generate", { title, style });
      return data;
    },
    onSuccess: (newData) => {
      console.log(newData);
      toast.success("Welcome back!");
      queryClient.setQueryData(["thumbnails"], (old: Thumbnail[]) => [
        newData.data,
        ...old,
      ]);
      queryClient.setQueryData(["user"], (old: any) => ({
        ...old,
        credits: newData.creditsLeft,
      }));
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data?.message || "Generate image failed");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/thumbnail/${id}`);
      return id;
    },
    onSuccess: (deleteId) => {
      queryClient.setQueryData(["thumbnails"], (old: Thumbnail[]) =>
        old.filter((t) => t._id !== deleteId),
      );
      toast.info("Thumbnail deleted!");
    },
    onError: (error: any) => {
      toast.info(error.response?.data?.message || "Error deleting thumbnail!");
    },
  });

  return {
    thumbnails,
    isHistoryLoading,
    generateThumbnail: generateMutation.mutate,
    deleteThumbnail: deleteMutation.mutate,
    generatingThumbnail: generateMutation.isPending,
    deletingThumbnail: deleteMutation.isPending,
  };
};
