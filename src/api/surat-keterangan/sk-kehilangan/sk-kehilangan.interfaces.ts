import { Gender, MaritalStatus } from "@prisma/client";

interface ISkKehilangan {
  name: string;
  born_birth: Date;
  born_place: string;
  gender: Gender;
  nik: string;
  religion: string;
  address: string;
  marital_status: MaritalStatus;
  lost_object: string;
  lost_place: string;
}

export { ISkKehilangan };
