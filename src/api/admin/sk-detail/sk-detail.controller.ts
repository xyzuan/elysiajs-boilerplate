import { NotFoundException } from "@constants/exceptions";
import { Responses } from "@constants/responses";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import rbac from "@middlewares/rbac";
import { SKType } from "@prisma/client";
import Elysia from "elysia";

export const skDetailController = createElysia({
  prefix: "sk-detail",
})
  .use((app: Elysia) => rbac(app, "APPROVE_SK"))
  .get("kematian/:id", async ({ params: { id } }) => {
    const result = await prismaClient.user_sk.findUnique({
      where: {
        id,
        sk_type: SKType.KEMATIAN,
      },
      include: {
        user: true,
        user_approvers: {
          include: {
            approver: {
              select: {
                id: true,
                name: true,
                user_roles: {
                  select: {
                    role: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        sk_kematian: true,
      },
    });

    if (!result) {
      throw new NotFoundException("SK Kematian not found");
    }

    return Responses.success(result);
  })
  .get("tidak-mampu/:id", async ({ params: { id } }) => {
    const result = await prismaClient.user_sk.findUnique({
      where: {
        id,
        sk_type: SKType.TIDAK_MAMPU,
      },
      include: {
        user: true,
        user_approvers: {
          include: {
            approver: {
              select: {
                id: true,
                name: true,
                user_roles: {
                  select: {
                    role: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        sk_tidak_mampu: true,
      },
    });

    if (!result) {
      throw new NotFoundException("SK Tidak Mampu not found");
    }

    return Responses.success(result);
  })
  .get("dispensasi/:id", async ({ params: { id } }) => {
    const result = await prismaClient.user_sk.findUnique({
      where: {
        id,
        sk_type: SKType.DISPENSASI,
      },
      include: {
        user: true,
        user_approvers: {
          include: {
            approver: {
              select: {
                id: true,
                name: true,
                user_roles: {
                  select: {
                    role: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        sk_dispensasi: true,
      },
    });

    if (!result) {
      throw new NotFoundException("SK Dispensasi not found");
    }

    return Responses.success(result);
  })
  .get("beda-nama/:id", async ({ params: { id } }) => {
    const result = await prismaClient.user_sk.findUnique({
      where: {
        id,
        sk_type: SKType.BEDA_NAMA,
      },
      include: {
        user: true,
        user_approvers: {
          include: {
            approver: {
              select: {
                id: true,
                name: true,
                user_roles: {
                  select: {
                    role: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        sk_beda_nama: true,
      },
    });

    if (!result) {
      throw new NotFoundException("SK Beda Nama not found");
    }

    return Responses.success(result);
  })
  .get("domisili/:id", async ({ params: { id } }) => {
    const result = await prismaClient.user_sk.findUnique({
      where: {
        id,
        sk_type: SKType.DOMISILI,
      },
      include: {
        user: true,
        user_approvers: {
          include: {
            approver: {
              select: {
                id: true,
                name: true,
                user_roles: {
                  select: {
                    role: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        sk_domisili: true,
      },
    });

    if (!result) {
      throw new NotFoundException("SK Domisili not found");
    }

    return Responses.success(result);
  })
  .get("kehilangan/:id", async ({ params: { id } }) => {
    const result = await prismaClient.user_sk.findUnique({
      where: {
        id,
        sk_type: SKType.KEHILANGAN,
      },
      include: {
        user: true,
        user_approvers: {
          include: {
            approver: {
              select: {
                id: true,
                name: true,
                user_roles: {
                  select: {
                    role: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        sk_kehilangan: true,
      },
    });

    if (!result) {
      throw new NotFoundException("SK Kehilangan not found");
    }

    return Responses.success(result);
  })
  .get("kelahiran/:id", async ({ params: { id } }) => {
    const result = await prismaClient.user_sk.findUnique({
      where: {
        id,
        sk_type: SKType.KELAHIRAN,
      },
      include: {
        user: true,
        user_approvers: {
          include: {
            approver: {
              select: {
                id: true,
                name: true,
                user_roles: {
                  select: {
                    role: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        sk_kelahiran: true,
      },
    });

    if (!result) {
      throw new NotFoundException("SK Kelahiran not found");
    }

    return Responses.success(result);
  })
  .get("usaha/:id", async ({ params: { id } }) => {
    const result = await prismaClient.user_sk.findUnique({
      where: {
        id,
        sk_type: SKType.USAHA,
      },
      include: {
        user: true,
        user_approvers: {
          include: {
            approver: {
              select: {
                id: true,
                name: true,
                user_roles: {
                  select: {
                    role: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        sk_usaha: true,
      },
    });

    if (!result) {
      throw new NotFoundException("SK Usaha not found");
    }

    return Responses.success(result);
  })
  .get("ktp-sementara/:id", async ({ params: { id } }) => {
    const result = await prismaClient.user_sk.findUnique({
      where: {
        id,
        sk_type: SKType.KTP_SEMENTARA,
      },
      include: {
        user: true,
        user_approvers: {
          include: {
            approver: {
              select: {
                id: true,
                name: true,
                user_roles: {
                  select: {
                    role: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        sk_ktp_sementara: true,
      },
    });

    if (!result) {
      throw new NotFoundException("SK KTP Sementara not found");
    }

    return Responses.success(result);
  });
