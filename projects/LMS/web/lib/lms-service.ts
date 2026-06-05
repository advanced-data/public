import { prisma } from "./db";
import {
  assignPath as assignFixturePath,
  createPath as createFixturePath,
  createModule as createFixtureModule,
  completeModule as completeFixtureModule,
  getAssignedPath as getFixtureAssignedPath,
  getAssignedPathForUser as getFixtureAssignedPathForUser,
  getPathById as getFixturePathById,
  getProgress as getFixtureProgress,
  listPaths as listFixturePaths,
  submitAssessment as submitFixtureAssessment,
  type AssignmentDraft,
  type ModuleDraft,
  type PathDraft,
} from "./lms-data";
import type { LMSModule, LMSPath, ProgressSummary } from "./lms-types";

function toLmsPath(
  path: {
    id: string;
    title: string;
    description: string;
    passingThreshold: number;
    status: string;
    modules: Array<{
      id: string;
      title: string;
      position: number;
      kind: string;
      completions?: Array<{ id: string }>;
    }>;
  },
): LMSPath {
  const modules: LMSModule[] = path.modules
    .slice()
    .sort((left, right) => left.position - right.position)
    .map((module) => ({
      id: module.id,
      title: module.title,
      order: module.position,
      kind: module.kind === "QUIZ" ? "quiz" : "lesson",
      completed: Boolean(module.completions?.length),
    }));

  const completedModules = modules.filter((module) => module.completed).length;
  const progress = modules.length === 0 ? 0 : Math.round((completedModules / modules.length) * 100);

  return {
    id: path.id,
    title: path.title,
    description: path.description,
    status: path.status === "COMPLETED" ? "completed" : path.status === "IN_PROGRESS" ? "in progress" : "assigned",
    progress,
    passingThreshold: path.passingThreshold,
    modules,
  };
}

export async function listPaths(): Promise<LMSPath[]> {
  try {
    const paths = await prisma.trainingPath.findMany({
      include: { modules: { include: { completions: true }, orderBy: { position: "asc" } } },
      orderBy: { createdAt: "asc" },
    });

    if (paths.length > 0) {
      return paths.map(toLmsPath);
    }
  } catch {
    // Fall back to fixtures when the database is not ready.
  }

  return listFixturePaths();
}

export async function getAssignedPath(): Promise<LMSPath> {
  const paths = await listPaths();
  return paths[0] ?? getFixtureAssignedPath();
}

export async function getAssignedPathForUser(userId: string): Promise<LMSPath | null> {
  try {
    const assignment = await prisma.pathAssignment.findFirst({
      where: { userId },
      orderBy: { assignedAt: "desc" },
      include: {
        path: { include: { modules: { include: { completions: true }, orderBy: { position: "asc" } } } },
      },
    });

    if (assignment?.path) {
      return toLmsPath(assignment.path);
    }

    return null;
  } catch {
    // fall through to fixtures
  }

  return getFixtureAssignedPathForUser(userId);
}

export async function getPathById(pathId: string): Promise<LMSPath | null> {
  try {
    const path = await prisma.trainingPath.findUnique({
      where: { id: pathId },
      include: { modules: { include: { completions: true }, orderBy: { position: "asc" } } },
    });

    if (path) {
      return toLmsPath(path);
    }
  } catch {
    // fall through to fixtures
  }

  return getFixturePathById(pathId);
}

export async function createPath(input: PathDraft): Promise<LMSPath> {
  try {
    const path = await prisma.trainingPath.create({
      data: {
        title: input.title,
        description: input.description,
        passingThreshold: input.passingThreshold ?? 80,
      },
      include: { modules: { include: { completions: true }, orderBy: { position: "asc" } } },
    });

    return toLmsPath(path);
  } catch {
    return createFixturePath(input);
  }
}

export async function createModule(input: ModuleDraft) {
  try {
    const path = await prisma.trainingPath.findUnique({ where: { id: input.pathId } });

    if (!path) {
      return { created: false, reason: "Path not found" };
    }

    const module = await prisma.module.create({
      data: {
        pathId: input.pathId,
        title: input.title,
        position: input.position,
        kind: input.kind === "quiz" ? "QUIZ" : "LESSON",
      },
    });

    return {
      created: true,
      pathId: input.pathId,
      moduleId: module.id,
    };
  } catch {
    return createFixtureModule(input);
  }
}

export async function assignPath(input: AssignmentDraft) {
  try {
    const result = await prisma.pathAssignment.create({
      data: {
        userId: input.learnerId,
        pathId: input.pathId,
        assignedById: input.assignedById ?? null,
      },
    });

    return {
      assigned: true,
      learnerId: result.userId,
      pathId: result.pathId,
    };
  } catch {
    return assignFixturePath(input);
  }
}

export async function completeModule(input: { pathId: string; moduleId: string; userId?: string }) {
  try {
    const userId = input.userId ?? "learner-001";
    const module = await prisma.module.findFirst({
      where: { id: input.moduleId, pathId: input.pathId },
    });

    if (!module) {
      return { completed: false, reason: "Module not found" };
    }

    const result = await prisma.moduleCompletion.upsert({
      where: { moduleId_userId: { moduleId: input.moduleId, userId } },
      update: { completedAt: new Date() },
      create: { moduleId: input.moduleId, userId },
    });

    return {
      completed: true,
      pathId: input.pathId,
      moduleId: input.moduleId,
      completionId: result.id,
    };
  } catch {
    return completeFixtureModule(input);
  }
}

export async function getProgress(pathId: string): Promise<ProgressSummary> {
  try {
    const path = await prisma.trainingPath.findUnique({
      where: { id: pathId },
      include: {
        modules: { include: { completions: true }, orderBy: { position: "asc" } },
        completions: true,
      },
    });

    if (path) {
      const completedModules = path.modules.filter((module) => module.completions.length > 0).length;
      const progress = path.modules.length === 0 ? 0 : Math.round((completedModules / path.modules.length) * 100);
      const completed = path.modules.length > 0 && completedModules === path.modules.length && path.completions.some((completion) => completion.passed);

      return {
        pathId: path.id,
        completedModules,
        totalModules: path.modules.length,
        progress,
        completed,
        passed: path.completions.some((completion) => completion.passed),
      };
    }
  } catch {
    // fall through to fixtures
  }

  return getFixtureProgress(pathId);
}

export async function submitAssessment(input: {
  pathId: string;
  moduleId: string;
  score: number;
  userId?: string;
}) {
  try {
    const path = await prisma.trainingPath.findUnique({ where: { id: input.pathId } });
    const passingThreshold = path?.passingThreshold ?? 80;
    const passed = input.score >= passingThreshold;
    const userId = input.userId ?? "learner-001";

    const attempt = await prisma.assessmentAttempt.create({
      data: {
        moduleId: input.moduleId,
        userId,
        score: input.score,
        passed,
        status: passed ? "PASSED" : "FAILED",
      },
    });

    if (passed) {
      await prisma.moduleCompletion.upsert({
        where: { moduleId_userId: { moduleId: input.moduleId, userId } },
        update: { completedAt: new Date() },
        create: { moduleId: input.moduleId, userId },
      });

      const moduleCount = await prisma.module.count({ where: { pathId: input.pathId } });
      const completedModuleCount = await prisma.moduleCompletion.count({
        where: { userId, module: { pathId: input.pathId } },
      });

      if (moduleCount > 0 && completedModuleCount >= moduleCount) {
        await prisma.pathCompletion.upsert({
          where: { pathId_userId: { pathId: input.pathId, userId } },
          update: { passed, completedAt: new Date() },
          create: { pathId: input.pathId, userId, passed },
        });
      }
    }

    return {
      pathId: input.pathId,
      moduleId: input.moduleId,
      score: input.score,
      passed,
      passingThreshold,
      attemptId: attempt.id,
    };
  } catch {
    return submitFixtureAssessment(input);
  }
}
