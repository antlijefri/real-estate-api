import {
  JsonController,
  Get,
  Res,
  Param,
  Post,
  Body,
  Put,
  UseBefore,
  Req,
  Authorized,
  QueryParam,
} from 'routing-controllers';
import { Service } from 'typedi';
import { CommonService } from '../../services/CommonServices';
import { instanceToPlain } from 'class-transformer';
import { PropertyService } from '../../services/PropertyService';
import { CreatePropertyRequest } from './requests/CreatePropertyRequest';
import { checkToken } from '../../middlewares/CheckToken';
import { USER_TYPE } from '../../../config/utils/commonInterfaces';
import { credential } from '../../../config/utils/env';
import { LoginRequest } from './requests/LoginRquest';
import { Property } from '../../models/Property';
import { Query } from 'typeorm/driver/Query';
import { FindManyOptions } from 'typeorm';

@Service()
@JsonController('/property')
export class PropertyStoreController {
  constructor(private propertyService: PropertyService) {
    // --
  }

  @Get()
  @Authorized('user')
  public async getPropertyList(
    @Req() request: any,
    @QueryParam('limit') limit: number,
    @QueryParam('offset') offset: number,
    @QueryParam('sku') sku: string,
    @Res() response: any
  ): Promise<any> {
    const condition: FindManyOptions<Property> = {};

    condition.where = {
      userId: request.userId,
    };

    if (limit) {
      condition.take = limit;
      if (offset) {
        condition.skip = offset;
      }
    }

    const propertyList = await this.propertyService.find(condition);

    return response.status(200).send({
      message: `Succesfully Got Property List`,
      data: instanceToPlain(propertyList),
    });
  }

  @Get('/:id')
  @Authorized('user')
  public async getPropertyDetail(
    @Req() request: any,
    @Res() response: any,
    @Param('id') id: number
  ): Promise<any> {
    const propertyDetail = await this.propertyService.findOne({
      where: {
        id,
        userId: request.userId,
      },
    });

    if (!propertyDetail) {
      return response.status(400).send({
        message: `Invalid Property Id`,
      });
    }

    return response.status(200).send({
      message: `Succesfully Got Property Detail`,
      data: instanceToPlain(propertyDetail),
    });
  }

  @Post()
  @Authorized('user')
  public async createProperty(
    @Req() request: any,
    @Res() response: any,
    @Body({ validate: true })
    bodyParam: CreatePropertyRequest
  ): Promise<any> {
    const property = new Property();
    property.title = bodyParam.title;
    property.userId = request.userId;
    property.description = bodyParam.description;
    property.type = bodyParam.type;
    property.location = bodyParam.location;
    property.price = bodyParam.price;

    const propertySave = await this.propertyService.save(property);

    return response.status(200).send({
      message: `Succesfully Created Property`,
      data: instanceToPlain(propertySave),
    });
  }

  @Put('/:id')
  @Authorized('user')
  public async updateProperty(
    @Req() request: any,
    @Res() response: any,
    @Param('id') id: number,
    @Body({ validate: false })
    bodyParam: CreatePropertyRequest
  ): Promise<any> {
    const propertyExist = await this.propertyService.findOne({
      where: {
        id,
        userId: request.userId,
      },
    });

    if (!propertyExist) {
      return response.status(400).send({
        message: `Invalid Property`,
      });
    }

    propertyExist.title = bodyParam.title;
    propertyExist.description = bodyParam.description;
    propertyExist.type = bodyParam.type;
    propertyExist.location = bodyParam.location;
    propertyExist.price = bodyParam.price;
    propertyExist.isActive = bodyParam.isActive;

    const propertySave = await this.propertyService.save(propertyExist);

    return response.status(200).send({
      message: `Succesfully Updated Property`,
      data: instanceToPlain(propertySave),
    });
  }
}
