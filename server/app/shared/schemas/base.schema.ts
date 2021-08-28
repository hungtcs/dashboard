import { Transform, Type } from "class-transformer";
import { ObjectId } from "mongodb";
import { ApiProperty } from "@nestjs/swagger";
import { SchemaOptions } from "mongoose";
import { Expose, Exclude } from "class-transformer";

export class BaseSchema {
  public static SchemaOptions: SchemaOptions = {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    versionKey: '__v',
  };

  @Expose({ toPlainOnly: true })
  @ApiProperty({ type: 'string', description: 'ID' })
  public get id() {
    return this._id?.toHexString();
  }
  public set id(id) {
    this._id = new ObjectId(id);
  }

  @Type(() => ObjectId)
  @Exclude({ toPlainOnly: true })
  @Transform((params) => params.obj._id, { toClassOnly: true })
  public _id?: ObjectId;

  @Exclude({ toPlainOnly: true })
  public __v?: number;

  @ApiProperty({ description: '创建时间' })
  public createdAt?: Date;

  @ApiProperty({ description: '更新时间' })
  public updatedAt?: Date;

}
