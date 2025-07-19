import { ISkKematian } from "@api/surat-keterangan/v1/sk-kematian/sk-kematian.interfaces";
import Docxtemplater from "docxtemplater";
import fs from "fs";
import path from "path";
import PizZip from "pizzip";

export const generateSkKematianDocument = async (data: ISkKematian) => {
  const inputPath = path.resolve(
    import.meta.dir,
    "../assets/templates/sk-kematian.docx",
  );
  const content = await fs.promises.readFile(inputPath, "binary");
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  await doc.renderAsync({
    name: data.name,
    born_birth: data.born_birth.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    born_place: data.born_place,
    gender: data.gender,
    nik: data.nik,
    religion: data.religion,
    address: data.address,
    work: data.work,
    death_date: data.death_date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    death_date_day: data.death_date.toLocaleDateString("id-ID", {
      weekday: "long",
    }),
    death_place: data.death_place,
    death_reason: data.death_reason,
    reporter_name: data.reporter_name,
    reporter_born_birth: data.reporter_born_birth
      ? data.reporter_born_birth.toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "",
    reporter_born_place: data.reporter_born_place,
    reporter_nik: data.reporter_nik,
    reporter_religion: data.reporter_religion,
    reporter_address: data.reporter_address,
    reporter_gender: data.reporter_gender,
    reporter_marital_status: data.reporter_marital_status,
  });

  return doc.toBlob();
};
