import { Gender, MaritalStatus } from "@prisma/client";

interface ISkBedaNama {
  name: string;
  born_birth: Date;
  born_place: string;
  gender: Gender;
  nik: string;
  no_kk: string;
  religion: string;
  address: string;
  marital_status: MaritalStatus;
  false_document: string;
}

export { ISkBedaNama };
