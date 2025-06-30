import { IParams } from "@interfaces/params.interface";

type ParsedQuery<T> = {
  search: string;
  limit: number;
  page: number;
  fromDate?: string;
  toDate?: string;
} & T;

function parseQuery<T extends Record<string, any>>(
  query: IParams<T>
): ParsedQuery<T> {
  const { search = "", limit = 10, page = 1, ...additionalParams } = query;
  const parsedLimit = typeof limit === "string" ? Number(limit) || 10 : limit;
  const parsedPage = typeof page === "string" ? Number(page) || 1 : page;

  return {
    search,
    limit: parsedLimit,
    page: parsedPage,
    ...additionalParams,
  } as ParsedQuery<T>;
}

export { parseQuery, ParsedQuery };
