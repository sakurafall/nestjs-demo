import { ArticleStatus } from '../entities/article.entity';
import {
  IsString,
  IsEnum,
  IsNotEmpty,
  MaxLength,
  IsPositive,
  IsInt,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2048)
  content: string;

  @IsEnum(ArticleStatus)
  status: ArticleStatus;

  @IsPositive()
  @IsInt()
  authorId: number;
}
