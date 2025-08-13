import { createElysia } from "@libs/elysia";
import { SkBedaNamaController } from "./sk-beda-nama";
import { SkDispensasiController } from "./sk-dispensasi";
import { SkDomisiliController } from "./sk-domisili";
import { SkKehilanganController } from "./sk-kehilangan";
import { SkKelahiranController } from "./sk-kelahiran";
import { SkKematianController } from "./sk-kematian";
import { SkKtpSementaraController } from "./sk-ktp-sementara";
import { SkMyList } from "./sk-my-list";
import { SkTidakMampuController } from "./sk-tidak-mampu";
import { SkUsahaController } from "./sk-usaha";

export default createElysia().group("/sk", (api) =>
  api
    .use(SkMyList)
    .use(SkKematianController)
    .use(SkTidakMampuController)
    .use(SkDispensasiController)
    .use(SkBedaNamaController)
    .use(SkDomisiliController)
    .use(SkKehilanganController)
    .use(SkKelahiranController)
    .use(SkUsahaController)
    .use(SkKtpSementaraController)
);
