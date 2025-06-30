export interface PaginatedMeta {
  last_page: number;
  per_page: number;
  current_page: number;
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: PaginatedMeta;
}

export class Responses {
  static success<T>(data: T): SuccessResponse<T> {
    return {
      success: true,
      data,
    };
  }

  static paginated<T>(
    data: T[],
    current_page: number,
    per_page: number,
    last_page: number
  ): PaginatedResponse<T> {
    return {
      success: data.length > 0,
      data,
      meta: { last_page, per_page, current_page },
    };
  }
}
