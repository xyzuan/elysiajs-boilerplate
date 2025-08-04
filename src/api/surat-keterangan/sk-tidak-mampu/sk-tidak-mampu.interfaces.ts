import { Gender, MaritalStatus } from "@prisma/client";

interface ISkTidakMampu {
  name: string;
  born_birth: Date;
  born_place: string;
  gender: Gender;
  nik: string;
  religion: string;
  address: string;
  reason: string;
  work: string;
  marital_status: MaritalStatus;
}

export { ISkTidakMampu };
