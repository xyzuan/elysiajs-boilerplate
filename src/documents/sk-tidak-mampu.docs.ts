// Import necessary modules as ES modules
import { ISkTidakMampu } from "@api/surat-keterangan/v1/sk-tidak-mampu/sk-tidak-mampu.interfaces";
import Docxtemplater from "docxtemplater";
import fs from "fs";
import path from "path";
import PizZip from "pizzip";

export const generateSkTidakMampuDocument = async (data: ISkTidakMampu) => {
  const inputPath = path.resolve(
    import.meta.dir,
    "../assets/templates/sk-tidak-mampu.docx"
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
    reason: data.reason,
    work: data.work,
    marital_status: data.marital_status,
  });

  return doc.toBlob();
};
