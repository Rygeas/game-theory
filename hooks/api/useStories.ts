// hooks/api/useStories.ts

import { createStory, deleteStory, fetchStories } from "@/services/story";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useStories = () => {
  return useQuery({
    queryKey: ["stories"],
    queryFn: fetchStories,
  });
};

export const useDeleteStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });
};

export const useCreateStory = () => {
  return useMutation({
    mutationFn: createStory,
  });
};
