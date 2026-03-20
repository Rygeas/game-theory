import { supabase } from "@/utils/supabase";
import { analyzeStory } from "@/services/edgeFunction";
import { AnalysisDraft } from "@/context/evolationContext";

export const fetchAnalysis = async (
  storyId: string,
  userText: string,
): Promise<AnalysisDraft> => {
  const { data } = await supabase
    .from("analysis_versions")
    .select("analysis_json")
    .eq("story_id", storyId)
    .eq("is_current", true)
    .single();

  if (data) return data.analysis_json as AnalysisDraft;

  await analyzeStory(storyId, userText);

  const { data: fresh, error } = await supabase
    .from("analysis_versions")
    .select("analysis_json")
    .eq("story_id", storyId)
    .eq("is_current", true)
    .single();

  if (error) throw error;
  return fresh.analysis_json as AnalysisDraft;
};

export const fetchAnalysisDetail = async (
  storyId: string,
): Promise<AnalysisDraft> => {
  const { data, error } = await supabase
    .from("analysis_versions")
    .select("analysis_json")
    .eq("story_id", storyId)
    .eq("is_current", true)
    .single();

  if (error) throw error;
  return data.analysis_json as AnalysisDraft;
};
