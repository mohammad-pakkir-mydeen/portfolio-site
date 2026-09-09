// =============================================================
// SOURCE OF TRUTH
// All resume content lives here. Do not scatter hardcoded
// strings across components. Nothing here is invented —
// it mirrors the supplied brief exactly.
// =============================================================

export const profile = {
  name: "Mohammad Pakkir Mydeen",
  title: "Software Engineer",
  statement:
    "Building scalable backend systems, cloud infrastructure, and intelligent applications.",
  // Add real URLs here when available — never fabricate them.
  links: {
    github: "https://github.com/mohammad-pakkir-mydeen",
    linkedin: "https://linkedin.com/in/mohammad-pakkir-mydeen",
    email: "mailto:mohammadpakkirmydeen@gmail.com",
  },
};

export const aboutCards = [
  {
    id: "backend",
    title: "Backend Engineering",
    description:
      "Designing and maintaining services that hold up under real traffic — clean APIs, sound data models, dependable behavior.",
  },
  {
    id: "cloud",
    title: "Cloud & Infrastructure",
    description:
      "Working with cloud-native building blocks to ship systems that scale and stay observable in production.",
  },
  {
    id: "distributed",
    title: "Distributed Systems",
    description:
      "Reasoning about consistency, scale, and failure across services that don't share the same clock or the same host.",
  },
  {
    id: "problem-solving",
    title: "Problem Solving",
    description:
      "Approaching engineering problems with an algorithmic mindset — from root-cause analysis to system design trade-offs.",
  },
] as const;

export const aboutBackground = [
  "AI and Data Science",
  "Backend engineering",
  "Cloud",
  "Distributed systems",
  "Modern applications",
  "Problem solving",
];

export const experience = {
  role: "Software Development Engineer Intern",
  company: "Amazon Development Centre India",
  location: "Hyderabad",
  period: "Jan 2026 – Jun 2026",
  projects: [
    {
      id: "csm-portal",
      title: "Customer Service Management Portal",
      summary:
        "A fine-grained authorization framework that replaced hardcoded access control across a large internal platform.",
      metrics: [
        { label: "internal teams", value: "40+" },
        { label: "users", value: "700+" },
        { label: "daily requests", value: "10K+" },
      ],
      points: [
        "Designed and implemented a fine-grained authorization framework by integrating a centralized authorization service.",
        "Replaced hardcoded access control for 40+ internal teams and 700+ users.",
        "Eliminated application redeployments for permission updates.",
        "Owned production support and maintenance of a Java Spring Boot and React application handling 10K+ daily requests.",
        "Worked on production incidents, dependency upgrades, security vulnerabilities, and feature enhancements.",
        "Implemented request throttling.",
        "Removed privacy-sensitive logs.",
        "Resolved dependency vulnerabilities.",
        "Used Burp Suite to validate security fixes.",
      ],
      symbols: ["authorization", "scale", "production", "security", "throttling"] as const,
    },
    {
      id: "data-retention",
      title: "Data Retention Compliance System",
      summary:
        "A regulatory-compliant hard-deletion framework enabling automated data lifecycle management at large scale.",
      metrics: [
        { label: "customer profiles", value: "Millions" },
        { label: "requests / second", value: "1M+" },
        { label: "architecture", value: "Multi-region" },
      ],
      points: [
        "Designed and implemented a regulatory-compliant hard deletion framework using Java and AWS services.",
        "Enabled automated customer data deletion across distributed backend systems after retention expiry.",
        "Performed root cause analysis on an incorrect deletion timestamp workflow.",
        "Redesigned the lifecycle to enable accurate retention scheduling for millions of customer profiles.",
        "Delivered the solution to production for customer profile services operating within backend systems supporting over 1M+ requests/second.",
        "Worked with DynamoDB Global Tables and eventual consistency for the multi-region architecture.",
        "Collaborated with cross-functional teams across India and the US to design, validate, and deploy the solution.",
      ],
      symbols: ["lifecycle", "distributed", "multiregion", "consistency", "rca", "scale"] as const,
    },
  ],
};

export const projects = [
  {
    id: "mock-interview",
    title: "AI-Powered Virtual Mock Interview Platform",
    description:
      "An AI-powered mock interview platform that analyzes resumes, generates role-specific interview questions, and conducts adaptive interviews using real-time conversational AI.",
    flow: ["Resume", "AI", "Questions", "Conversation"],
  },
  {
    id: "hackathon-evaluator",
    title: "AI-Powered Hackathon Project Evaluator",
    description:
      "An LLM-powered evaluation platform that automatically analyzes hackathon project proposals and ranks submissions based on innovation, technical feasibility, implementation quality, scalability, and business impact.",
    flow: ["Project Proposal", "LLM Analysis", "Evaluation", "Ranking"],
  },
];

export const skillGroups = [
  {
    id: "programming",
    title: "Programming",
    kind: "logo",
    items: ["Java", "Python", "JavaScript", "C"],
  },
  {
    id: "backend",
    title: "Backend & Frameworks",
    kind: "logo",
    items: ["Spring Boot", "Flask", "Node.js", "REST APIs"],
  },
  {
    id: "frontend",
    title: "Frontend",
    kind: "logo",
    items: ["React", "HTML", "CSS"],
  },
  {
    id: "devops",
    title: "Build & DevOps",
    kind: "logo",
    items: ["Docker", "Kubernetes", "CI/CD", "Git", "GitHub", "Linux"],
  },
  {
    id: "cloud",
    title: "Cloud & AWS",
    kind: "logo",
    items: ["AWS Lambda", "CloudFormation", "CloudWatch", "IAM"],
  },
  {
    id: "data",
    title: "Databases & Testing",
    kind: "logo",
    items: ["MySQL", "MongoDB", "DynamoDB", "JUnit", "Mockito"],
  },
  {
    id: "core-cs",
    title: "Core CS",
    kind: "concept",
    items: [
      "Data Structures & Algorithms",
      "OOP",
      "DBMS",
      "OS",
      "Computer Networks",
      "Distributed Systems",
    ],
  },
] as const;

export const education = {
  degree: "B.Tech in AI and Data Science",
  institution: "St. Joseph's College of Engineering, Chennai",
  score: "85.6%",
  period: "Nov 2022 – May 2026",
};

export const achievement = {
  count: "350+",
  label: "Data Structures and Algorithms problems solved",
  platforms: "LeetCode and GeeksforGeeks",
};

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];
