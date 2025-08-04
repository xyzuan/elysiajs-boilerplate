import Elysia, { t } from "elysia";

const skTidakMampuSchema = new Elysia().model({
  "sk-tidak-mampu": t.Object({
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
    reason: t.String(),
    work: t.String(),
    marital_status: t.String({
      enum: ["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"],
    }),
  }),
});

export default skTidakMampuSchema;
