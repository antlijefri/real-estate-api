import {
  Authorized,
  Body,
  Get,
  JsonController,
  Param,
  Post,
  Res,
} from 'routing-controllers';
import { instanceToPlain } from 'class-transformer';
import { Service } from 'typedi';
import { PropertyService } from '../../services/PropertyService';

@Service()
@JsonController('/admin/property')
export class PropertyAdminController {
  constructor(private propertyService: PropertyService) {
    // --
  }

  @Get()
  @Authorized('admin')
  public async getPropertyList(@Res() response: any): Promise<any> {
    const propertyList = await this.propertyService.find();

    return response.status(200).send({
      message: `Successfully Got Property List`,
      data: instanceToPlain(propertyList),
    });
  }

  @Get('/:id')
  @Authorized('admin')
  public async getPropertyDetail(
    @Res() response: any,
    @Param('id') id: number
  ): Promise<any> {
    const property = await this.propertyService.findOne({
      where: {
        id,
      },
    });

    if (!property) {
      return response.status(400).send({
        message: `Invalid Property Id`,
      });
    }

    return response.status(200).send({
      message: `Successfully Got Property Detail..!`,
      data: instanceToPlain(property),
    });
  }
}
