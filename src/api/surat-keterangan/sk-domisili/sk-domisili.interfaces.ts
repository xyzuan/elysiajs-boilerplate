import { Gender, MaritalStatus } from "@prisma/client";

interface ISkDomisili {
  name: string;
  born_birth: Date;
  born_place: string;
  gender: Gender;
  nik: string;
  religion: string;
  address: string;
  marital_status: MaritalStatus;
}

export { ISkDomisili };
