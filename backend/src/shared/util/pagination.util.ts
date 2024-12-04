import {
  Repository,
  FindOptionsOrder,
  FindOptionsWhere,
  FindOptionsSelect,
} from 'typeorm';
import { PaginatedResponse } from '../interfaces/pagination.interface';

export class PaginationService {
  static async paginate<T>(
    repository: Repository<T>,
    options: {
      page?: number;
      limit?: number;
      select?: FindOptionsSelect<T>;
      order?: FindOptionsOrder<T>;
      where?: FindOptionsWhere<T>;
    },
  ): Promise<PaginatedResponse<T> | T[]> {
    const { page, limit, select, order, where } = options;

    if (!page && !limit) {
      return repository.find({
        select,
        order,
        where,
      });
    }

    const skip = ((page || 1) - 1) * (limit || 10);
    const take = limit || 10;

    const [data, total] = await Promise.all([
      repository.find({
        select,
        skip,
        take,
        order,
        where,
      }),
      repository.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page: page || 1,
        limit: take,
        totalPages: Math.ceil(total / take),
        hasNextPage: (page || 1) < Math.ceil(total / take),
        hasPreviousPage: (page || 1) > 1,
      },
    };
  }
}
