// hooks/api/useStories.ts

import {
  createStory,
  deleteStory,
  fetchStories,
  fetchStoryCount,
} from "@/services/story";
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

export const useStoryLimit = (isPremium: boolean, userId: string) => {
  const FREE_STORY_LIMIT = 3;
  const { data: storyCount = 0, isLoading } = useQuery({
    queryKey: ["storyCount", userId],
    queryFn: () => fetchStoryCount(userId!),
    enabled: !!userId && !isPremium,
  });

  const canCreate = isPremium || storyCount < FREE_STORY_LIMIT;
  const remaining = Math.max(0, FREE_STORY_LIMIT - storyCount);

  return { canCreate, storyCount, remaining, isLoading };
};
