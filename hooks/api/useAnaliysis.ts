// hooks/api/useAnalysis.ts

import { useQuery } from "@tanstack/react-query";
import { AnalysisDraft } from "@/context/evolationContext";
import { fetchAnalysis, fetchAnalysisDetail } from "@/services/analiysis";

export const useAnalysis = (storyId?: string, userText?: string) => {
  return useQuery<AnalysisDraft>({
    queryKey: ["analysis", storyId],
    queryFn: () => fetchAnalysis(storyId!, userText!),
    enabled: !!storyId,
    retry: false,
    staleTime: Infinity,
  });
};

export const useAnalysisDetail = (storyId?: string) => {
  return useQuery<AnalysisDraft>({
    queryKey: ["analysis", storyId],
    queryFn: () => fetchAnalysisDetail(storyId!),
    enabled: !!storyId,
    retry: false,
    staleTime: Infinity,
  });
};
