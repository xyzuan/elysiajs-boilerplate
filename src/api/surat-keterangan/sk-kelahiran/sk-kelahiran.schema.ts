import Elysia, { t } from "elysia";

const skKelahiranSchema = new Elysia().model({
  "sk-kelahiran": t.Object({
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
    father_name: t.String(),
    mother_name: t.String(),
  }),
});

export default skKelahiranSchema;
