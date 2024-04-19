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
import { instanceToPlain } from 'class-transformer';
import { PropertyService } from '../../services/PropertyService';
import {
  CreatePropertyRequest,
  PropertyImageRequest,
} from './requests/CreatePropertyRequest';
import { Property } from '../../models/Property';
import { Query } from 'typeorm/driver/Query';
import { FindManyOptions } from 'typeorm';
import { PropertyImageService } from '../../services/PropertyImageService';
import { PropertyImage } from '../../models/PropertyImage';
import { validate } from 'class-validator';

@Service()
@JsonController('/property')
export class PropertyStoreController {
  constructor(
    private propertyService: PropertyService,
    private propertImageService: PropertyImageService
  ) {
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

    condition.relations = ['propertyImage'];

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
      relations: ['propertyImage'],
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

    const propertyImages: PropertyImage[] = [];

    for (const _propertyImage of bodyParam.propertyImage) {
      const propertyImage = new PropertyImage();
      propertyImage.name = _propertyImage.name;
      propertyImage.path = _propertyImage.path;
      propertyImage.isDefault = _propertyImage.isDefault ? 1 : 0;
      propertyImages.push(propertyImage);
    }
    property.propertyImage = propertyImages;

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
      relations: ['propertyImage'],
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

    if (bodyParam.propertyImage?.length) {
      const propertyImages: PropertyImage[] = [];

      for (const [_ind, _propertyImage] of bodyParam.propertyImage.entries()) {
        const validationError = await validate(_propertyImage);
        if (validationError.length) {
          return response.status(400).send(validationError);
        }
        const propertyImage = new PropertyImage();
        const propertyImageExist = propertyExist.propertyImage[_ind];
        if (propertyImageExist) {
          propertyImage.id = propertyImageExist.id;
        }
        propertyImage.name = _propertyImage.name;
        propertyImage.path = _propertyImage.path;
        propertyImage.isDefault = _propertyImage.isDefault ? 1 : 0;
        propertyImages.push(propertyImage);
      }
      propertyExist.propertyImage = propertyImages;
    }

    const propertySave = await this.propertyService.save(propertyExist);

    return response.status(200).send({
      message: `Succesfully Updated Property`,
      data: instanceToPlain(propertySave),
    });
  }
}
