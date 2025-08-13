import { Gender, MaritalStatus } from "@prisma/client";

interface ISkKelahiran {
  name: string;
  born_birth: Date;
  born_place: string;
  gender: Gender;
  nik: string;
  religion: string;
  address: string;
  marital_status: MaritalStatus;
  father_name: string;
  mother_name: string;
}

export { ISkKelahiran };
