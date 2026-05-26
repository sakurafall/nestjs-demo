import { IsString, IsBoolean, MinLength, MaxLength } from "class-validator"

export class CreateTodoDto {
  @IsString()
  @MinLength(3)
  title: string

  @IsString()
  @MaxLength(100)
  content: string

  @IsBoolean()
  isCompleted: boolean
}