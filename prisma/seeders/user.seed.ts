import { PrismaClient, Gender, MaritalStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  return Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 10,
  });
}

async function seedUsers() {
  const users = [
    {
      name: "Kepala Desa",
      email: "kepaladesa@desaku.com",
      password: "password123",
      born_birth: new Date("1980-05-15"),
      born_place: "Jakarta",
      gender: Gender.MALE as Gender,
      work: "Kepala Desa",
      marital_status: MaritalStatus.MARRIED as MaritalStatus,
      nik: "3171234567890123",
      religion: "Islam",
      address: "Jl. Desa No. 1, Kecamatan Contoh, Kabupaten Contoh",
    },
    {
      name: "Staff Desa",
      email: "staffdesa@desaku.com",
      password: "password123",
      born_birth: new Date("1990-08-20"),
      born_place: "Bandung",
      gender: Gender.FEMALE as Gender,
      work: "Staff Administrasi",
      marital_status: MaritalStatus.SINGLE as MaritalStatus,
      nik: "3171234567890124",
      religion: "Islam",
      address: "Jl. Desa No. 2, Kecamatan Contoh, Kabupaten Contoh",
    },
    {
      name: "Warga Desa 1",
      email: "warga1@desaku.com",
      password: "password123",
      born_birth: new Date("1995-03-10"),
      born_place: "Surabaya",
      gender: Gender.MALE as Gender,
      work: "Petani",
      marital_status: MaritalStatus.MARRIED as MaritalStatus,
      nik: "3171234567890125",
      religion: "Islam",
      address: "Jl. Desa No. 3, Kecamatan Contoh, Kabupaten Contoh",
    },
    {
      name: "Warga Desa 2",
      email: "warga2@desaku.com",
      password: "password123",
      born_birth: new Date("1988-12-25"),
      born_place: "Semarang",
      gender: Gender.FEMALE as Gender,
      work: "Pedagang",
      marital_status: MaritalStatus.WIDOWED as MaritalStatus,
      nik: "3171234567890126",
      religion: "Islam",
      address: "Jl. Desa No. 4, Kecamatan Contoh, Kabupaten Contoh",
    },
    {
      name: "Warga Desa 3",
      email: "warga3@desaku.com",
      password: "password123",
      born_birth: new Date("2000-07-05"),
      born_place: "Yogyakarta",
      gender: Gender.MALE as Gender,
      work: "Mahasiswa",
      marital_status: MaritalStatus.SINGLE as MaritalStatus,
      nik: "3171234567890127",
      religion: "Islam",
      address: "Jl. Desa No. 5, Kecamatan Contoh, Kabupaten Contoh",
    },
  ];

  for (const userData of users) {
    const hashedPassword = await hashPassword(userData.password);

    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        ...userData,
        password: hashedPassword,
      },
    });
  }
}

async function assignRolesToUsers() {
  const users = await prisma.user.findMany();
  const roles = await prisma.roles.findMany();

  const kepalaDesaRole = roles.find((role) => role.name === "Kepala Desa");
  const staffDesaRole = roles.find((role) => role.name === "Staff Desa");
  const wargaDesaRole = roles.find((role) => role.name === "Warga Desa");

  const kepalaDesaUser = users.find(
    (user) => user.email === "kepaladesa@desaku.com"
  );
  const staffDesaUser = users.find(
    (user) => user.email === "staffdesa@desaku.com"
  );
  const wargaUsers = users.filter(
    (user) =>
      user.email === "warga1@desaku.com" ||
      user.email === "warga2@desaku.com" ||
      user.email === "warga3@desaku.com"
  );

  if (kepalaDesaUser && kepalaDesaRole) {
    const existingRole = await prisma.user_has_roles.findFirst({
      where: {
        user_id: kepalaDesaUser.id,
        role_id: kepalaDesaRole.id,
      },
    });

    if (!existingRole) {
      await prisma.user_has_roles.create({
        data: {
          user_id: kepalaDesaUser.id,
          role_id: kepalaDesaRole.id,
        },
      });
    }
  }

  if (staffDesaUser && staffDesaRole) {
    const existingRole = await prisma.user_has_roles.findFirst({
      where: {
        user_id: staffDesaUser.id,
        role_id: staffDesaRole.id,
      },
    });

    if (!existingRole) {
      await prisma.user_has_roles.create({
        data: {
          user_id: staffDesaUser.id,
          role_id: staffDesaRole.id,
        },
      });
    }
  }

  if (wargaDesaRole) {
    for (const wargaUser of wargaUsers) {
      const existingRole = await prisma.user_has_roles.findFirst({
        where: {
          user_id: wargaUser.id,
          role_id: wargaDesaRole.id,
        },
      });

      if (!existingRole) {
        await prisma.user_has_roles.create({
          data: {
            user_id: wargaUser.id,
            role_id: wargaDesaRole.id,
          },
        });
      }
    }
  }
}

async function main() {
  console.log("🌱 Starting user seeding...");

  try {
    await seedUsers();
    console.log("✅ Users seeded successfully");

    await assignRolesToUsers();
    console.log("✅ User roles assigned successfully");

    console.log("🎉 User seeding completed!");
  } catch (error) {
    console.error("❌ Error during user seeding:", error);
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
