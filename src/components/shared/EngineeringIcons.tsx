import { Server, Cloud, Network, GitGraph } from "lucide-react";

export const engineeringIconMap = {
  backend: Server,
  cloud: Cloud,
  distributed: Network,
  "problem-solving": GitGraph,
} as const;

export type EngineeringIconKey = keyof typeof engineeringIconMap;
