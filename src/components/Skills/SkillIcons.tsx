import { FaJava } from "react-icons/fa";
import {
  SiPython,
  SiJavascript,
  SiC,
  SiSpringboot,
  SiFlask,
  SiNodedotjs,
  SiReact,
  SiHtml5,
  SiCss,
  SiDocker,
  SiKubernetes,
  SiGit,
  SiGithub,
  SiLinux,
  SiMysql,
  SiMongodb,
  SiJunit5,
} from "react-icons/si";
import {
  Webhook,
  Cloud,
  CloudCog,
  Activity,
  KeyRound,
  Workflow,
  TestTube,
  Binary,
  Boxes,
  Database,
  Cpu,
  Network,
  Waypoints,
} from "lucide-react";
import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";

export const skillIconMap: Record<string, IconType | LucideIcon> = {
  Java: FaJava,
  Python: SiPython,
  JavaScript: SiJavascript,
  C: SiC,

  "Spring Boot": SiSpringboot,
  Flask: SiFlask,
  "Node.js": SiNodedotjs,
  "REST APIs": Webhook,

  React: SiReact,
  HTML: SiHtml5,
  CSS: SiCss,

  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  "CI/CD": Workflow,
  Git: SiGit,
  GitHub: SiGithub,
  Linux: SiLinux,

  "AWS Lambda": Workflow,
  CloudFormation: CloudCog,
  CloudWatch: Activity,
  IAM: KeyRound,
  AWS: Cloud,

  MySQL: SiMysql,
  MongoDB: SiMongodb,
  DynamoDB: Database,
  JUnit: SiJunit5,
  Mockito: TestTube,

  "Data Structures & Algorithms": Binary,
  OOP: Boxes,
  DBMS: Database,
  OS: Cpu,
  "Computer Networks": Network,
  "Distributed Systems": Waypoints,
};
