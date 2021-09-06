import { BaseSchema } from "@server/shared/schemas";
import { DataSource } from '../data-sources/data-source.schema';
import { ApiProperty } from "@nestjs/swagger";
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsArray, IsBoolean, IsNotEmpty, IsObject, IsString } from "class-validator";
import { Type } from "class-transformer";

@Schema()
export class VisualizationDataQuery {

  @Prop()
  @IsString()
  @IsNotEmpty()
  public type!: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  public query!: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  public collection!: string;

}

const VisualizationDataQuerySchema = SchemaFactory.createForClass(VisualizationDataQuery);

@Schema()
export class VisualizationAxis {

  @Prop()
  @IsBoolean()
  public enable!: boolean;

  @Prop({
    raw: {
      name: String,
      type: String,
      field: String,
    },
    type: Object,
  })
  @IsObject()
  public xAxis!: Record<'name' | 'type' | 'field', string>;

  @Prop({
    raw: {
      name: String,
      type: String,
    },
    type: Object,
  })
  @IsObject()
  public yAxis!: Record<'name'|'type', string>;

}

const VisualizationAxisSchema = SchemaFactory.createForClass(VisualizationAxis);

@Schema({
  ...BaseSchema.SchemaOptions,
  collection: Visualization.COLLECTION_NAME,
})
export class Visualization extends BaseSchema {
  public static COLLECTION_NAME = 'visualizations';

  @Prop({ unique: true })
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '名称' })
  public name!: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: DataSource.COLLECTION_NAME })
  @IsObject()
  @ApiProperty({ description: '数据源' })
  @Type(() => DataSource)
  public dataSource!: DataSource;

  @Prop({ type: VisualizationDataQuerySchema })
  @IsObject()
  public dataQuery!: VisualizationDataQuery;

  @Prop({ type: VisualizationAxisSchema })
  @IsObject()
  public axis!: VisualizationAxis;

  @Prop({
    raw: [
      {
        name: String,
        type: String,
        field: String,
      },
    ],
  })
  @IsArray()
  public series!: Array<Record<'name' | 'type' | 'field', string>>;

}

export type VisualizationDocument = Visualization & Document;

export const VisualizationSchema = SchemaFactory.createForClass(Visualization);
