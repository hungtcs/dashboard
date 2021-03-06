import { BaseSchema } from '@server/shared/schemas';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@Schema({
  ...BaseSchema.SchemaOptions,
  collection: DataSource.COLLECTION_NAME,
})
export class DataSource extends BaseSchema {
  public static COLLECTION_NAME = 'dataSources';

  @Prop({ unique: true })
  @IsString()
  @ApiProperty({ description: '名称' })
  public name!: string;

  @Prop({ unique: true })
  @IsString()
  @ApiProperty({ description: '连接字符串' })
  public connectionString!: string;

}

export type DataSourceDocument = DataSource & Document;

export const DataSourceSchema = SchemaFactory.createForClass(DataSource);
