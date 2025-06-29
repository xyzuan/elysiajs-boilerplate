import Elysia, { t } from "elysia";

const skKematianSchema = new Elysia().model({
  "sk-kematian": t.Object({
    name: t.String(),
    born_birth: t.Date(),
    born_place: t.String(),
    nik: t.String({
      minLength: 16,
      maxLength: 16,
    }),
    religion: t.String(),
    address: t.String(),
    death_date: t.Date(),
    death_place: t.String(),
    death_reason: t.String(),
  }),
});

export default skKematianSchema;
