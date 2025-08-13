import Elysia, { t } from "elysia";

const skBedaNamaSchema = new Elysia().model({
  "sk-beda-nama": t.Object({
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
    no_kk: t.String(),
    religion: t.String(),
    address: t.String(),
    marital_status: t.String({
      enum: ["SINGLE", "MARRIED", "DIVORCED", "WIDOWED", "SEPARATED", "SIRI"],
    }),
    false_document: t.String(),
  }),
});

export default skBedaNamaSchema;
