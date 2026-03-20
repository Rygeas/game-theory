// services/addEntryService.ts

import { supabase } from "@/utils/supabase";
import { analyzeStory, updateAnalysis } from "@/services/edgeFunction";

export const addEntry = async (
  storyId: string,
  text: string,
): Promise<void> => {
  // 1. Son entry numarasını bul
  const { data: entries } = await supabase
    .from("story_entries")
    .select("entry_number")
    .eq("story_id", storyId)
    .order("entry_number", { ascending: false })
    .limit(1);

  const nextEntryNumber =
    entries && entries.length > 0 ? entries[0].entry_number + 1 : 1;

  // 2. Yeni entry kaydet
  const { error } = await supabase.from("story_entries").insert({
    story_id: storyId,
    entry_number: nextEntryNumber,
    text,
  });

  if (error) throw error;

  // 3. Edge Function tetikle — tüm entryleri çekip analizi günceller
  await updateAnalysis(storyId);
};
