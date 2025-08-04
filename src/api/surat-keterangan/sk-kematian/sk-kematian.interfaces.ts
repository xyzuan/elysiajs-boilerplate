import { Gender, MaritalStatus } from "@prisma/client";

interface ISkKematian {
  name: string;
  born_birth: Date;
  born_place: string;
  gender: Gender;
  nik: string;
  religion: string;
  address: string;
  work: string;
  death_date: Date;
  death_date_day: Date;
  death_place: string;
  death_reason: string;
  reporter_name: string;
  reporter_born_birth: Date | null;
  reporter_born_place: string | null;
  reporter_nik: string | null;
  reporter_religion: string | null;
  reporter_address: string | null;
  reporter_gender: Gender | null;
  reporter_marital_status: MaritalStatus | null;
}

export { ISkKematian };
