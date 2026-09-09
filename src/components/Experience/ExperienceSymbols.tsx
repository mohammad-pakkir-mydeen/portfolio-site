import {
  ShieldCheck,
  Users,
  ServerCog,
  ShieldAlert,
  Gauge,
  DatabaseZap,
  Network,
  Globe2,
  RefreshCcw,
  SearchCode,
  Activity,
} from "lucide-react";

export const experienceSymbolMap = {
  authorization: { icon: ShieldCheck, label: "Authorization" },
  scale: { icon: Users, label: "Scale" },
  production: { icon: ServerCog, label: "Production" },
  security: { icon: ShieldAlert, label: "Security" },
  throttling: { icon: Gauge, label: "Throttling" },
  lifecycle: { icon: DatabaseZap, label: "Data lifecycle" },
  distributed: { icon: Network, label: "Distributed systems" },
  multiregion: { icon: Globe2, label: "Multi-region" },
  consistency: { icon: RefreshCcw, label: "Eventual consistency" },
  rca: { icon: SearchCode, label: "Root cause analysis" },
  request: { icon: Activity, label: "Request flow" },
} as const;

export type ExperienceSymbolKey = keyof typeof experienceSymbolMap;
