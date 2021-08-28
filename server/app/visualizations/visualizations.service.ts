import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Scope } from '@nestjs/common';
import { Visualization, VisualizationDocument } from './visualization.schema';
import { plainToClass } from 'class-transformer';

@Injectable({
  scope: Scope.REQUEST,
})
export class VisualizationsService {

  constructor(
      @InjectModel(Visualization.name) private readonly VisualizationModel: Model<VisualizationDocument>,) {

  }

  public async createVisualization(visualization: Visualization) {
    const doc = await new this.VisualizationModel(visualization).save();
    return plainToClass(Visualization, doc.toObject());
  }

  public async getVisualizations() {
    const docs = await this.VisualizationModel.find({});
    return docs.map(doc => plainToClass(Visualization, doc.toObject()));
  }


}
