import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Injectable, Scope } from '@nestjs/common';
import { CreateVisualizationObject } from './visualization.dto';
import { Visualization, VisualizationDocument } from './visualization.schema';

@Injectable({
  scope: Scope.REQUEST,
})
export class VisualizationsService {

  constructor(
      @InjectModel(Visualization.COLLECTION_NAME) private readonly VisualizationModel: Model<VisualizationDocument>,) {

  }

  public async createVisualization(visualization: CreateVisualizationObject) {
    const doc = await new this.VisualizationModel(visualization).save();
    return plainToClass(Visualization, doc.toObject());
  }

  public async getVisualization(id: ObjectId) {
    const doc = await this.VisualizationModel.findById(id)
      .populate('dataSource')
      .exec();
    if (doc === null) {
      return null;
    }
    return plainToClass(Visualization, doc.toObject());
  }

  public async getVisualizations() {
    const docs = await this.VisualizationModel.find({});
    return docs.map(doc => plainToClass(Visualization, doc.toObject()));
  }

}
