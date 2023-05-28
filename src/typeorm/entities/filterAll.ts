import { IsNumber, IsOptional, IsString } from 'class-validator';

export class filterAll {
  @IsNumber()
  @IsOptional()
  PRODUCT_ID: number;

  @IsString()
  @IsOptional()
  PRODUCT_NAME: string;

  @IsString()
  @IsOptional()
  PRODUCT_MODEL: string;

  @IsNumber()
  @IsOptional()
  AVAILABILITY: number;

  @IsNumber()
  @IsOptional()
  RATING: number;

  @IsString()
  @IsOptional()
  TYPE: string;

  @IsNumber()
  @IsOptional()
  PRODUCT_PRICE: number;
}
