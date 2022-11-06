import { createContext } from "react";
import type Settings from "../Types/Settings";

export const SettingsContext = createContext<Settings | null>(null);
