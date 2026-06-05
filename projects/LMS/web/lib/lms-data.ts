import type { AssessmentSubmission, LMSPath, ProgressSummary } from "./lms-types";

const paths: LMSPath[] = [
  {
    id: "security-onboarding",
    title: "Security Onboarding Path",
    description: "A starter path for new team members to complete in order.",
    status: "assigned",
    progress: 42,
    passingThreshold: 80,
    modules: [
      { id: "orientation", title: "Company orientation", order: 1, kind: "lesson", completed: true },
      { id: "security-fundamentals", title: "Security fundamentals", order: 2, kind: "lesson", completed: true },
      { id: "ticket-handling", title: "Ticket handling basics", order: 3, kind: "lesson", completed: false },
      { id: "onboarding-quiz", title: "Assessment: onboarding quiz", order: 4, kind: "quiz", completed: false },
    ],
  },
];

function recalculatePath(path: LMSPath): LMSPath {
  const completedModules = path.modules.filter((module) => module.completed).length;
  path.progress = path.modules.length === 0 ? 0 : Math.round((completedModules / path.modules.length) * 100);
  path.status = path.progress >= 100 ? "completed" : path.progress > 0 ? "in progress" : "assigned";
  return path;
}

export interface PathDraft {
  title: string;
  description: string;
  passingThreshold?: number;
}

export interface ModuleDraft {
  pathId: string;
  title: string;
  position: number;
  kind: "lesson" | "quiz";
}

export interface AssignmentDraft {
  pathId: string;
  learnerId: string;
  assignedById?: string;
}

export function listPaths(): LMSPath[] {
  return paths;
}

export function createPath(input: PathDraft): LMSPath {
  const path: LMSPath = {
    id: input.title.toLowerCase().replace(/\s+/g, "-"),
    title: input.title,
    description: input.description,
    status: "assigned",
    progress: 0,
    passingThreshold: input.passingThreshold ?? 80,
    modules: [],
  };

  recalculatePath(path);
  paths.push(path);
  return path;
}

export function createModule(input: ModuleDraft) {
  const path = getPathById(input.pathId);

  if (!path) {
    return { created: false, reason: "Path not found" };
  }

  path.modules.push({
    id: input.title.toLowerCase().replace(/\s+/g, "-"),
    title: input.title,
    order: input.position,
    kind: input.kind,
    completed: false,
  });
  path.modules.sort((left, right) => left.order - right.order);
  recalculatePath(path);

  return {
    created: true,
    pathId: input.pathId,
    title: input.title,
  };
}

export function assignPath(input: AssignmentDraft) {
  const path = getPathById(input.pathId);

  if (!path) {
    return { assigned: false, reason: "Path not found" };
  }

  return {
    assigned: true,
    learnerId: input.learnerId,
    pathId: input.pathId,
  };
}

export function getAssignedPath(): LMSPath {
  return paths[0];
}

export function getAssignedPathForUser(_userId: string): LMSPath | null {
  return paths[0] ?? null;
}

export function getPathById(pathId: string): LMSPath | null {
  return paths.find((path) => path.id === pathId) ?? null;
}

export function getProgress(pathId: string): ProgressSummary {
  const path = getPathById(pathId) ?? getAssignedPath();
  const completedModules = path.modules.filter((module) => module.completed).length;
  const progress = path.modules.length === 0 ? 0 : Math.round((completedModules / path.modules.length) * 100);

  return {
    pathId: path.id,
    completedModules,
    totalModules: path.modules.length,
    progress,
    completed: progress === 100,
    passed: progress === 100,
  };
}

export function completeModule(input: { pathId: string; moduleId: string }) {
  const path = getPathById(input.pathId);

  if (!path) {
    return { completed: false, reason: "Path not found" };
  }

  const module = path.modules.find((entry) => entry.id === input.moduleId);

  if (!module) {
    return { completed: false, reason: "Module not found" };
  }

  module.completed = true;
  recalculatePath(path);

  return {
    completed: true,
    pathId: input.pathId,
    moduleId: input.moduleId,
    progress: path.progress,
  };
}

export function submitAssessment(input: AssessmentSubmission) {
  const passingThreshold = getPathById(input.pathId)?.passingThreshold ?? 80;
  const passed = input.score >= passingThreshold;

  if (passed) {
    completeModule({ pathId: input.pathId, moduleId: input.moduleId });
  }

  return {
    pathId: input.pathId,
    moduleId: input.moduleId,
    score: input.score,
    passed,
    passingThreshold,
  };
}
