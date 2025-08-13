import { Gender, MaritalStatus } from "@prisma/client";

interface ISkDispensasi {
  name: string;
  born_birth: Date;
  born_place: string;
  gender: Gender;
  nik: string;
  religion: string;
  address: string;
  marital_status: MaritalStatus;
  start_date: Date;
  end_date: Date;
  reason: string;
  purpose: string;
}

export { ISkDispensasi };
