import { supabase } from "@/utils/supabase";
import { AnalysisDraft } from "@/context/evolationContext";

export type VersionItem = {
  versionNumber: number;
  entryText: string;
  createdAt: string;
  analysis: AnalysisDraft;
};

export const fetchVersions = async (
  storyId: string,
): Promise<VersionItem[]> => {
  const { data: entries, error: entriesError } = await supabase
    .from("story_entries")
    .select("entry_number, text, created_at")
    .eq("story_id", storyId)
    .order("entry_number", { ascending: true });

  if (entriesError) throw entriesError;

  const { data: versions, error: versionsError } = await supabase
    .from("analysis_versions")
    .select("version_number, analysis_json, created_at")
    .eq("story_id", storyId)
    .order("version_number", { ascending: true });

  if (versionsError) throw versionsError;

  return (entries ?? []).map((entry) => {
    const version = versions?.find(
      (v) => v.version_number === entry.entry_number,
    );
    return {
      versionNumber: entry.entry_number,
      entryText: entry.text,
      createdAt: entry.created_at,
      analysis: version?.analysis_json as AnalysisDraft,
    };
  });
};
