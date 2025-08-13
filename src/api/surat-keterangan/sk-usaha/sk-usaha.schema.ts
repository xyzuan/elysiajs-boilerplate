import Elysia, { t } from "elysia";

const skUsahaSchema = new Elysia().model({
  "sk-usaha": t.Object({
    name: t.String(),
    born_birth: t.Date(),
    born_place: t.String(),
    gender: t.String({
      enum: ["MALE", "FEMALE"],
    }),
    nik: t.String({
      minLength: 16,
      maxLength: 16,
    }),
    religion: t.String(),
    address: t.String(),
    marital_status: t.String({
      enum: ["SINGLE", "MARRIED", "DIVORCED", "WIDOWED", "SEPARATED", "SIRI"],
    }),
    bussiness: t.String(),
    reason: t.String(),
  }),
});

export default skUsahaSchema;
