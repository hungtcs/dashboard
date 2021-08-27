import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Scope } from '@nestjs/common';
import { DataSource, DataSourceDocument } from './data-source.schema';

@Injectable({
  scope: Scope.REQUEST,
})
export class DataSourcesService {

  constructor(
      @InjectModel(DataSource.name) private readonly DataSourceModel: Model<DataSourceDocument>,) {

  }

  public async createDataSource(datasource: DataSource) {
    const doc = await new this.DataSourceModel(datasource).save();
    return doc.toObject();
  }

}
