import { IsEnum, IsString } from 'class-validator';

export enum SearchType {
  ALL = 'all',
  USER = 'user',
}

export class SearchDto {
  @IsString()
  content: string;

  @IsEnum([SearchType.ALL, SearchType.USER])
  type?: string = SearchType.ALL;

  @IsString()
  offset: number;

  @IsString()
  limit: number;
}
