import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class DataSourcesQueryObject {

  @Min(0)
  @IsInt()
  @Transform(params => Number.parseInt(params.value, 10), { toClassOnly: true })
  @IsOptional()
  @ApiProperty({ description: '数据量限制', required: false, default: 10 })
  public limit: number = 10;

  @Min(0)
  @IsInt()
  @Transform(params => Number.parseInt(params.value, 10), { toClassOnly: true })
  @IsOptional()
  @ApiProperty({ description: '偏移', required: false, default: 0 })
  public offset: number = 0;

}
