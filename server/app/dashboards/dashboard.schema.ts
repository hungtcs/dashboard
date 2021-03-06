import { BaseSchema } from "@server/shared/schemas";
import { ApiProperty } from "@nestjs/swagger";
import { Visualization } from "../visualizations/visualization.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema, Document } from 'mongoose';
import { IsInt, IsNotEmpty, IsObject, IsString, Min } from "class-validator";

@Schema({ _id: false })
export class Widget {

  @Min(0)
  @Prop()
  @IsInt()
  @ApiProperty({ description: 'y' })
  public x!: number;

  @Min(0)
  @Prop()
  @IsInt()
  @ApiProperty({ description: 'x' })
  public y!: number;

  @Min(0)
  @Prop()
  @IsInt()
  @ApiProperty({ description: '所占列' })
  public cols!: number;

  @Min(0)
  @Prop()
  @IsInt()
  @ApiProperty({ description: '所占行' })
  public rows!: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Visualization.COLLECTION_NAME })
  @IsObject()
  @ApiProperty({ description: '可视化' })
  public visualization!: Visualization;

  @Prop()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '扩展ID' })
  public extension!: string;

}

const WidgetSchema = SchemaFactory.createForClass(Widget)

@Schema({
  ...BaseSchema.SchemaOptions,
  collection: Dashboard.COLLECTION_NAME,
})
export class Dashboard extends BaseSchema {
  public static COLLECTION_NAME = 'dashboards';

  @Prop()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '名称' })
  public name!: string;

  @Prop({ type: [WidgetSchema], default: [] })
  public widgets: Array<Widget> = [];

}

export type DashboardDocument = Dashboard & Document;

export const DashboardSchema = SchemaFactory.createForClass(Dashboard);
