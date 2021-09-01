import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { ExtensionsService } from './extensions.service';
import { Response } from 'express';

@ApiTags('Extensions')
@Controller()
export class ExtensionsController {

  constructor(
      private readonly extensionsService: ExtensionsService) {

  }

  @Get('extensions')
  public async getExtensions() {
    return await this.extensionsService.getExtensions();
  }

  @Get('extensions/:id/entrypoint')
  public async getExtensionEntrypoint(
      @Res({ passthrough: true }) response: Response,
      @Param('id') id: string) {
    const js = await this.extensionsService.getExtensionEntrypoint(id);
    response.setHeader('content-type', 'text/javascript');
    return js;
  }

}
