"use client";

import { SKILLS } from "@/entities/skill/model/skills-data";

export function useSkillsStats() {
  const categories = Array.from(
    new Set(SKILLS.map((s) => s.category)),
  ) as string[];

  // const avg = Math.round(
  //   SKILLS.reduce((acc, s) => acc + s.percentage, 0) / SKILLS.length,
  // );

  const getSkillsByCategory = (category: string) =>
    SKILLS.filter((s) => s.category === category);

  return { categories, getSkillsByCategory };
}
