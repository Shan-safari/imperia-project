
import { create } from "zustand";

interface I18nState {
  language: "en" | "fr" | "rw";
  setLanguage: (lang: "en" | "fr" | "rw") => void;
}

export const useI18nStore = create<I18nState>((set) => ({
  language: "en",
  setLanguage: (language) => set({ language }),
}));
