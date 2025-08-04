import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting comprehensive seeding...");

  try {
    console.log("📋 Seeding roles and permissions...");
    await import("./role_permission.seed");
    console.log("✅ Roles and permissions seeded successfully");

    console.log("👥 Seeding users...");
    await import("./user.seed");
    console.log("✅ Users seeded successfully");

    console.log("🔧 Seeding SK approver settings...");
    const { seedSKApproverSettings } = await import(
      "./sk_approver_settings.seed"
    );
    await seedSKApproverSettings();
    console.log("✅ SK approver settings seeded successfully");

    console.log("🎉 All seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
