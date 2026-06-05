import { PrismaClient, ModuleKind, UserRole, PathStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@lms.local" },
    update: {},
    create: {
      id: "11111111-1111-4111-8111-111111111111",
      name: "LMS Admin",
      email: "admin@lms.local",
      role: UserRole.ADMIN,
    },
  });

  const learner = await prisma.user.upsert({
    where: { email: "learner@lms.local" },
    update: {},
    create: {
      id: "22222222-2222-4222-8222-222222222222",
      name: "Jordan Learner",
      email: "learner@lms.local",
      role: UserRole.LEARNER,
    },
  });

  const path = await prisma.trainingPath.upsert({
    where: { id: "security-onboarding" },
    update: {},
    create: {
      id: "security-onboarding",
      title: "Security Onboarding Path",
      description: "A starter path for new team members to complete in order.",
      status: PathStatus.ASSIGNED,
      passingThreshold: 80,
      modules: {
        create: [
          { title: "Company orientation", position: 1, kind: ModuleKind.LESSON },
          { title: "Security fundamentals", position: 2, kind: ModuleKind.LESSON },
          { title: "Ticket handling basics", position: 3, kind: ModuleKind.LESSON },
          { title: "Assessment: onboarding quiz", position: 4, kind: ModuleKind.QUIZ },
        ],
      },
    },
  });

  await prisma.pathAssignment.upsert({
    where: {
      userId_pathId: {
        userId: learner.id,
        pathId: path.id,
      },
    },
    update: {
      assignedById: admin.id,
    },
    create: {
      userId: learner.id,
      pathId: path.id,
      assignedById: admin.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
