import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VisualizationsService } from './visualizations.service';
import { VisualizationsController } from './visualizations.controller';
import { Visualization, VisualizationSchema } from './visualization.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Visualization.name, schema: VisualizationSchema },
    ])
  ],
  providers: [
    VisualizationsService,
  ],
  controllers: [
    VisualizationsController,
  ],
})
export class VisualizationsModule {

}
