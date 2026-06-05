export type UserRole = "learner" | "instructor" | "manager" | "admin";

export interface LMSModule {
  id: string;
  title: string;
  order: number;
  kind: "lesson" | "quiz";
  completed: boolean;
}

export interface LMSPath {
  id: string;
  title: string;
  description: string;
  status: "assigned" | "completed" | "in progress";
  progress: number;
  passingThreshold: number;
  modules: LMSModule[];
}

export interface AssessmentSubmission {
  pathId: string;
  moduleId: string;
  score: number;
}

export interface ProgressSummary {
  pathId: string;
  completedModules: number;
  totalModules: number;
  progress: number;
  completed: boolean;
  passed: boolean;
}
