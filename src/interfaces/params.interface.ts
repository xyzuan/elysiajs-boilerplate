export type IParams<T extends Record<string, any> = {}> = {
  fromDate?: string;
  toDate?: string;
  search?: string;
  limit?: number;
  page?: number;
} & T;
