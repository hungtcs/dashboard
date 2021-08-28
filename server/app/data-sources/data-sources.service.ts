import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Scope } from '@nestjs/common';
import { DataSource, DataSourceDocument } from './data-source.schema';
import { DataSourcesQueryObject } from './data-source.dto';
import { plainToClass } from 'class-transformer';
import { MongoClient, ObjectId } from 'mongodb';

@Injectable({
  scope: Scope.REQUEST,
})
export class DataSourcesService {

  constructor(
      @InjectModel(DataSource.name) private readonly DataSourceModel: Model<DataSourceDocument>,) {

  }

  public async getDataSources({ limit, offset }: DataSourcesQueryObject) {
    const docs = await this.DataSourceModel.find({}).skip(offset).limit(limit);
    return docs.map(doc => {
      console.log(doc.toObject());


      return plainToClass(DataSource, doc.toObject());
    });
  }

  public async getDataSourcesCount({ }: DataSourcesQueryObject) {
    return await this.DataSourceModel.count({});
  }

  public async createDataSource(datasource: DataSource) {
    const doc = await new this.DataSourceModel(datasource).save();
    return plainToClass(DataSource, doc.toObject());
  }

  public async queryDataFromDataSource(type: string, collectionName: string, dataSourceId: string) {
    const dataSource = await this.DataSourceModel.findById(new ObjectId(dataSourceId));
    if(dataSource === null) {
      throw new Error('data source is null');
    }
    const client = new MongoClient(dataSource.connectionString);
    await client.connect();
    const db = client.db();
    const collection = db.collection(collectionName);
    if(type === 'find') {
      return (await collection.find({}).limit(100).toArray())
        .map(item => {
          return {
            ...item,
            _id: item._id.toHexString(),
          };
        });
    }
    return null;
  }

}
