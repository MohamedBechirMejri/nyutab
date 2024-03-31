import { createContext } from "react";
import type Settings from "../types/Settings";

export const SettingsContext = createContext<Settings | null>(null);
