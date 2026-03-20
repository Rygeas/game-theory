import React, { createContext, useContext, useState } from "react";

export type MissingInfoQuestion = {
  id: string;
  question: string;
  answered: boolean;
  answer: string | null;
};

export type Recommendation = {
  action: string;
  reasoning: string;
  risk: string;
};

export type Equilibrium = {
  description: string;
  is_stable: boolean;
};

export type Meta = {
  lockedFields: string[];
  version: number;
};

export type AnalysisDraft = {
  players: string[];
  strategies: {
    player: string;
    options: string[];
  }[];
  payoffs_preferences: {
    objective: string;
    ranking: string[];
  };
  equilibrium: Equilibrium;
  evaluation: string;
  timing: "simultaneous" | "sequential" | "unknown";
  game_type: "one_shot" | "repeated" | "unknown";
  missing_info_questions: MissingInfoQuestion[];
  recommendations: Recommendation[];
  assumptions: string[];
  status: "ongoing" | "resolved";
  _meta: Meta;
};

export type StoryDraft = {
  storyId: string;
  userText: string;
};

type PromiseContextType = {
  draft: StoryDraft | null;
  setDraft: (d: StoryDraft) => void;
  clear: () => void;
};

const PromiseContext = createContext<PromiseContextType | null>(null);

export function PromiseProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<StoryDraft | null>(null);

  const clear = () => setDraft(null);

  return (
    <PromiseContext.Provider value={{ draft, setDraft, clear }}>
      {children}
    </PromiseContext.Provider>
  );
}

export function usePromise() {
  const ctx = useContext(PromiseContext);
  if (!ctx) {
    throw new Error("usePromise must be used inside PromiseProvider");
  }
  return ctx;
}
