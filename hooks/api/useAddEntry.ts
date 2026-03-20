// hooks/api/useAddEntry.ts

import { addEntry } from "@/services/entry";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddEntry = (storyId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => addEntry(storyId, text),
    onSuccess: () => {
      // Analizi yenile
      queryClient.invalidateQueries({ queryKey: ["analysis", storyId] });
    },
  });
};
