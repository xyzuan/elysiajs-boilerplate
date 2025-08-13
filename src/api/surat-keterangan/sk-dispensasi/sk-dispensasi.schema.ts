import Elysia, { t } from "elysia";

const skDispensasiSchema = new Elysia().model({
  "sk-dispensasi": t.Object({
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
    start_date: t.Date(),
    end_date: t.Date(),
    reason: t.String(),
    purpose: t.String(),
  }),
});

export default skDispensasiSchema;
