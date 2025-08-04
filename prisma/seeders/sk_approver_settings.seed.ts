import { PrismaClient, SKType } from "@prisma/client";

const prisma = new PrismaClient();

async function seedSKApproverSettings() {
  console.log("🔧 Starting SK Approver Settings seeding...");

  // First, let's find users with admin or approver roles
  const adminUsers = await prisma.user.findMany({
    where: {
      user_roles: {
        some: {
          role: {
            name: {
              in: ["admin", "approver", "village_head", "secretary"],
            },
          },
        },
      },
    },
    include: {
      user_roles: {
        include: {
          role: true,
        },
      },
    },
  });

  if (adminUsers.length === 0) {
    console.log(
      "⚠️  No admin/approver users found. Creating default settings for future users..."
    );

    // Create placeholder settings that can be updated later
    const defaultSettings = [
      {
        sk_type: SKType.KEMATIAN,
        user_approver_id: "placeholder-admin",
        is_active: true,
        order_priority: 1,
      },
      {
        sk_type: SKType.TIDAK_MAMPU,
        user_approver_id: "placeholder-admin",
        is_active: true,
        order_priority: 1,
      },
    ];

    console.log(
      "📝 Note: Please update the approver settings with actual user IDs after creating admin users"
    );
    return;
  }

  // Create default approver settings for each SK type
  const approverSettings = [];

  for (const skType of Object.values(SKType)) {
    // For each SK type, assign approvers based on their roles
    for (let i = 0; i < adminUsers.length; i++) {
      const user = adminUsers[i];
      const userRole = user.user_roles[0]?.role?.name;

      let orderPriority = 1;

      // Set priority based on role hierarchy
      switch (userRole) {
        case "village_head":
          orderPriority = 1; // Highest priority
          break;
        case "secretary":
          orderPriority = 2;
          break;
        case "admin":
          orderPriority = 3;
          break;
        case "approver":
          orderPriority = 4;
          break;
        default:
          orderPriority = 5;
      }

      approverSettings.push({
        sk_type: skType,
        user_approver_id: user.id,
        is_active: true,
        order_priority: orderPriority,
      });
    }
  }

  // Bulk create approver settings
  for (const setting of approverSettings) {
    try {
      await prisma.sk_approver_settings.upsert({
        where: {
          sk_type_user_approver_id: {
            sk_type: setting.sk_type,
            user_approver_id: setting.user_approver_id,
          },
        },
        update: {
          is_active: setting.is_active,
          order_priority: setting.order_priority,
        },
        create: setting,
      });
    } catch (error) {
      console.error(
        `Error creating setting for ${setting.sk_type} - ${setting.user_approver_id}:`,
        error
      );
    }
  }

  console.log(`✅ Created ${approverSettings.length} SK approver settings`);

  // Display the created settings
  const createdSettings = await prisma.sk_approver_settings.findMany({
    include: {
      approver: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: [{ sk_type: "asc" }, { order_priority: "asc" }],
  });

  console.log("\n📋 SK Approver Settings Summary:");
  for (const skType of Object.values(SKType)) {
    console.log(`\n${skType}:`);
    const settings = createdSettings.filter((s) => s.sk_type === skType);
    settings.forEach((setting) => {
      console.log(
        `  - ${setting.approver.name} (${setting.approver.email}) - Priority: ${setting.order_priority} - Active: ${setting.is_active}`
      );
    });
  }
}

// Execute if called directly
if (require.main === module) {
  seedSKApproverSettings()
    .then(() => {
      console.log("🎉 SK Approver Settings seeding completed!");
      return prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error("❌ Error during SK approver settings seeding:", e);
      await prisma.$disconnect();
      process.exit(1);
    });
}

export { seedSKApproverSettings };
