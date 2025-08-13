import Elysia, { t } from "elysia";

const skKehilanganSchema = new Elysia().model({
  "sk-kehilangan": t.Object({
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
    lost_object: t.String(),
    lost_place: t.String(),
  }),
});

export default skKehilanganSchema;
