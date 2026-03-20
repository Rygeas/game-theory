import { supabase } from "@/utils/supabase";

export async function analyzeStory(storyId: string, userText: string) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase.functions.invoke("analyze-story", {
    body: { storyId, userText },
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });

  if (error) throw error;
  return data;
}
export async function updateAnalysis(storyId: string) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log("updateAnalysis çağrılıyor, storyId:", storyId);

  const { data, error } = await supabase.functions.invoke("update-analysis", {
    body: { storyId },
    headers: { Authorization: `Bearer ${session?.access_token}` },
  });
  console.log(data, error, "------");

  if (error) throw error;
  return data;
}
