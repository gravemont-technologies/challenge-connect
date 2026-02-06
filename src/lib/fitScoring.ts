/**
 * Fit Score Engine
 * Calculates dynamic fit scores based on student profile vs challenge requirements.
 * See templates/ai_integration/fit_score_logic.md for architecture.
 */

// Skill label → canonical tags for fuzzy matching
const SKILL_TAXONOMY: Record<string, string[]> = {
  "Python": ["python", "programming", "code"],
  "SQL/Databases": ["sql", "databases", "data"],
  "Data Visualization": ["visualization", "charts", "dashboards", "conditional formatting"],
  "Machine Learning": ["ml", "machine learning", "regression", "prediction"],
  "Financial Modeling": ["excel", "dcf", "npv", "irr", "wacc", "financial", "valuation", "goal seek", "scenario manager", "what-if", "sensitivity"],
  "Intercultural Communication": ["communication", "intercultural", "team"],
  "Technical Writing": ["writing", "technical", "documentation", "reporting"],
  "Qualitative Research": ["research", "qualitative", "analysis"],
  "UI/UX Design": ["design", "ui", "ux"],
  "Strategic Marketing": ["marketing", "strategy", "campaign"],
};

// Major → related domain tags
const MAJOR_DOMAIN_MAP: Record<string, string[]> = {
  "cs": ["programming", "data", "ml", "python", "sql", "code"],
  "business": ["excel", "financial", "marketing", "strategy", "valuation", "budgets"],
  "engineering": ["solver", "optimization", "linear programming", "constraint", "operations"],
  "economics": ["regression", "elasticity", "forecasting", "demand", "pricing", "statistical"],
  "math": ["statistics", "regression", "monte carlo", "probability", "hypothesis", "confidence"],
  "arts": ["writing", "communication", "research", "qualitative"],
  "design": ["visualization", "ui", "ux", "dashboards", "design"],
  "other": [],
};

// Values-fit alignment per challenge category
const VALUES_CATEGORY_MAP: Record<string, string[]> = {
  "impact": ["Financial Modeling", "Operations Research"],
  "learning": ["Statistics", "Financial Modeling"],
  "innovation": ["Operations Research", "Statistics"],
  "ethics": ["Financial Modeling", "Statistics"],
};

export interface StudentProfile {
  skills: string[];      // Resolved labels, e.g. "Financial Modeling"
  major: string;         // e.g. "business"
  college: string;       // e.g. "business"
  teamPlayer: string;    // "team" | "solo" | "hybrid"
  valuesFit: string;     // "impact" | "learning" | "innovation" | "ethics"
}

export interface ChallengeForScoring {
  skills: string[];
  category: string;
  duration: string;
}

/**
 * Compute hard-skill match ratio (0–1).
 * Uses fuzzy tag matching via SKILL_TAXONOMY.
 */
function hardSkillScore(studentSkills: string[], challengeSkills: string[]): number {
  if (challengeSkills.length === 0) return 0;

  // Expand student skills to tags
  const studentTags = new Set<string>();
  for (const skill of studentSkills) {
    const tags = SKILL_TAXONOMY[skill];
    if (tags) tags.forEach((t) => studentTags.add(t));
    // Also add the raw label lowered
    studentTags.add(skill.toLowerCase());
  }

  let matched = 0;
  for (const reqSkill of challengeSkills) {
    const reqLower = reqSkill.toLowerCase();
    // Direct hit
    if (studentTags.has(reqLower)) {
      matched += 1.0;
      continue;
    }
    // Fuzzy: check if any student tag is a substring of the requirement or vice-versa
    let bestPartial = 0;
    for (const tag of studentTags) {
      if (reqLower.includes(tag) || tag.includes(reqLower)) {
        bestPartial = Math.max(bestPartial, 0.6);
      }
    }
    matched += bestPartial;
  }

  return matched / challengeSkills.length;
}

/**
 * Domain alignment score (0–1).
 * Checks if student major relates to the challenge category/skills.
 */
function domainScore(major: string, challengeSkills: string[], category: string): number {
  const domainTags = MAJOR_DOMAIN_MAP[major] || [];
  if (domainTags.length === 0) return 0.3; // neutral for "other"

  const challengeText = [...challengeSkills, category].join(" ").toLowerCase();
  let hits = 0;
  for (const tag of domainTags) {
    if (challengeText.includes(tag)) hits++;
  }
  return Math.min(hits / Math.max(domainTags.length * 0.4, 1), 1);
}

/**
 * Values alignment bonus (0–1).
 */
function valuesScore(valuesFit: string, category: string): number {
  const alignedCategories = VALUES_CATEGORY_MAP[valuesFit] || [];
  return alignedCategories.includes(category) ? 1.0 : 0.4;
}

/**
 * Compute overall fit score (0–100).
 * Weights: Hard Skills 40%, Domain 30%, Values 20%, Diversity 10%
 */
export function calculateFitScore(profile: StudentProfile, challenge: ChallengeForScoring): number {
  const hard = hardSkillScore(profile.skills, challenge.skills);
  const domain = domainScore(profile.major, challenge.skills, challenge.category);
  const values = valuesScore(profile.valuesFit, challenge.category);
  // Diversity multiplier: slight randomness to ensure variety
  const diversity = 0.7 + Math.random() * 0.3;

  const raw = hard * 0.40 + domain * 0.30 + values * 0.20 + diversity * 0.10;
  // Scale to 55–98 range for realistic-looking scores
  return Math.round(55 + raw * 43);
}

/**
 * Difficulty tier based on challenge complexity signals + student experience.
 */
export type DifficultyTier = "Beginner" | "Intermediate" | "Advanced";

const ADVANCED_SIGNALS = [
  "monte carlo", "solver", "simulation", "linear programming",
  "npv", "irr", "wacc", "constraint", "10,000",
];

const INTERMEDIATE_SIGNALS = [
  "regression", "pivottable", "goal seek", "scenario manager",
  "exponential smoothing", "cohort", "sensitivity",
];

export function getDifficultyTier(
  challengeSkills: string[],
  challengeDescription: string,
  duration: string,
): DifficultyTier {
  const text = [...challengeSkills, challengeDescription].join(" ").toLowerCase();

  const advancedHits = ADVANCED_SIGNALS.filter((s) => text.includes(s)).length;
  if (advancedHits >= 2 || duration.includes("3")) return "Advanced";

  const intermediateHits = INTERMEDIATE_SIGNALS.filter((s) => text.includes(s)).length;
  if (intermediateHits >= 1 || duration.includes("2")) return "Intermediate";

  return "Beginner";
}

export function getDifficultyColor(tier: DifficultyTier): string {
  switch (tier) {
    case "Beginner": return "text-emerald-700 bg-emerald-50 border-emerald-200";
    case "Intermediate": return "text-amber-700 bg-amber-50 border-amber-200";
    case "Advanced": return "text-red-700 bg-red-50 border-red-200";
  }
}
