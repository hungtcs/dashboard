import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Scope } from '@nestjs/common';
import { Dashboard, DashboardDocument } from './dashboard.schema';
import { DashboardCreateObject, WidgetSaveObject } from './dashboard.dto';
import { plainToClass } from 'class-transformer';
import { ObjectId } from 'mongodb';

@Injectable({
  scope: Scope.REQUEST,
})
export class DashboardsService {

  constructor(
      @InjectModel(Dashboard.COLLECTION_NAME) private readonly DashboardModel: Model<DashboardDocument>) {

  }

  public async getDashboards() {
    const docs = await this.DashboardModel
      .find({})
      .select({
        widgets: false,
      })
      .exec();
    return docs.map(doc => plainToClass(Dashboard, doc.toObject()));
  }

  public async createDashboard(dashboardCreateObject: DashboardCreateObject) {
    const doc = await new this.DashboardModel(dashboardCreateObject).save();
    return plainToClass(Dashboard, doc.toObject());
  }

  public async getDashboard(id: ObjectId) {
    const doc = await this.DashboardModel.findById(id);
    if (doc === null) {
      return null;
    }
    return plainToClass(Dashboard, doc.toObject());
  }

  public async getDashboardWidgets(id: ObjectId) {
    const doc = await this.DashboardModel
      .findById(id)
      .exec();
    if (doc === null) {
      return null;
    }
    return doc.toObject().widgets.map((widget: any) => {
      return {
        ...widget,
        visualization: widget.visualization.toHexString(),
      }
    });
  }

  public async setDashboardWidgets(id: ObjectId, widgets: Array<WidgetSaveObject>) {
    const doc = await this.DashboardModel.findById(id);
    if (doc === null) {
      return null;
    }
    doc.widgets = widgets as any;
    await doc.save();
  }

}
