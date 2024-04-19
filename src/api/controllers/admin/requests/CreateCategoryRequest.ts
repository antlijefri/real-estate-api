import { IsNotEmpty } from 'class-validator';

export class CreateCategoryRequest {
  @IsNotEmpty()
  public name: string;

  public slugName: string;

  public parentId: number;

  public avatarName: string;

  public avatarPath: string;
}
