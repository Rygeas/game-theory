// hooks/api/useVersions.ts

import { fetchVersions, VersionItem } from "@/services/versions";
import { useQuery } from "@tanstack/react-query";

export const useVersions = (storyId?: string) => {
  return useQuery<VersionItem[]>({
    queryKey: ["versions", storyId],
    queryFn: () => fetchVersions(storyId!),
    enabled: !!storyId,
  });
};
