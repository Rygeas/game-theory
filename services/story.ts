// services/storiesService.ts

import { supabase } from "@/utils/supabase";

export type Story = {
  id: string;
  title: string;
  status: "active" | "completed";
  created_at: string;
};

export const fetchStories = async (): Promise<Story[]> => {
  const { data, error } = await supabase
    .from("stories")
    .select("id, title, status, created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
};

export const deleteStory = async (storyId: string): Promise<void> => {
  const { error } = await supabase.from("stories").delete().eq("id", storyId);

  if (error) throw error;
};

export type CreateStoryInput = {
  userId: string;
  title: string;
  story: string;
};

export const createStory = async ({
  userId,
  title,
  story,
}: CreateStoryInput) => {
  const { data: storyRow, error: storyErr } = await supabase
    .from("stories")
    .insert({
      user_id: userId,
      title: title || "Yeni Hikaye",
      status: "active",
    })
    .select("id")
    .single();

  if (storyErr) throw storyErr;

  const { error: entryErr } = await supabase.from("story_entries").insert({
    story_id: storyRow.id,
    entry_number: 1,
    text: story,
  });

  if (entryErr) throw entryErr;

  return { storyId: storyRow.id as string };
};

export const fetchStoryCount = async (userId: string): Promise<number> => {
  const { count, error } = await supabase
    .from("stories")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) throw error;
  return count ?? 0;
};
