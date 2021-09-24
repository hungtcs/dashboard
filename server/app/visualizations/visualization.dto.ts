import { Prop } from "@nestjs/mongoose";
import { IsString } from "class-validator";
import { Visualization } from './visualization.schema';
import { ApiProperty, OmitType } from "@nestjs/swagger";


export class CreateVisualizationObject extends OmitType(Visualization, ['dataSource']) {

  @Prop()
  @IsString()
  @ApiProperty({ description: '数据源ID' })
  public dataSource!: string;

}
