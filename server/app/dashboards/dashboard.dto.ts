import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Dashboard, Widget } from "./dashboard.schema";

export class WidgetSaveObject extends OmitType(Widget, ['visualization']) {

  @IsString()
  @ApiProperty({ description: '可视化ID' })
  public visualization!: string;

}

export class DashboardCreateObject extends PickType(Dashboard, ['name']) {

}
