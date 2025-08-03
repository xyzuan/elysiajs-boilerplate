import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from "@constants/exceptions";
import { generateSkKematianDocument } from "@documents/sk-kematian";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import rbac from "@middlewares/rbac";
import { SKType } from "@prisma/client";
import Elysia from "elysia";

export const kematianController = createElysia({
  prefix: "kematian",
})
  .use((app: Elysia) => rbac(app, "APPROVE_SK"))
  .get(":id/download", async ({ params: { id }, set }) => {
    const result = await prismaClient.user_sk.findUnique({
      where: {
        id,
        sk_type: SKType.KEMATIAN,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            born_birth: true,
            born_place: true,
            gender: true,
            work: true,
            marital_status: true,
            nik: true,
            religion: true,
            address: true,
          },
        },
        sk_kematian: true,
        user_approvers: true,
      },
    });

    if (!result || !result.sk_kematian) {
      throw new NotFoundException("SK Kematian not found");
    }

    if (
      result.user_approvers.length === 0 ||
      !result.user_approvers.some((approver) => approver.status === "APPROVED")
    ) {
      throw new BadRequestException(
        "SK is not approved yet. Cannot download unapproved document.",
      );
    }

    set.headers["Content-Type"] =
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    set.headers["Content-Disposition"] =
      `attachment; filename="sk_kematian_${result.sk_kematian.name}_${id}.docx"`;

    return generateSkKematianDocument({
      name: result.sk_kematian.name,
      address: result.sk_kematian.address,
      born_birth: result.sk_kematian.born_birth,
      born_place: result.sk_kematian.born_place,
      death_date: result.sk_kematian.death_date,
      death_date_day: result.sk_kematian.death_date,
      death_place: result.sk_kematian.death_place,
      death_reason: result.sk_kematian.death_reason,
      gender: result.sk_kematian.gender,
      nik: result.sk_kematian.nik,
      religion: result.sk_kematian.religion,
      reporter_name: result.user.name ?? "",
      reporter_address: result.user.address ?? "",
      reporter_born_birth: result.user.born_birth,
      reporter_born_place: result.user.born_place ?? "",
      reporter_nik: result.user.nik ?? "",
      reporter_religion: result.user.religion ?? "",
      reporter_gender: result.user.gender,
      reporter_marital_status: result.user.marital_status,
      work: result.user.work ?? "",
    });
  });
