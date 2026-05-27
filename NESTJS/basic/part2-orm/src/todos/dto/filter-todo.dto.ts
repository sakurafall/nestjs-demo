import { IsInt, IsOptional, IsEnum } from "class-validator"

enum OrderBy {
  ASC = 'asc',
  DESC = 'desc',
}

export class FilterTodoDto {
  @IsInt()
  @IsOptional()
  page?: number

  @IsInt()
  @IsOptional()
  limit?: number

  @IsEnum(OrderBy)
  @IsOptional()
  orderBy?: OrderBy
}