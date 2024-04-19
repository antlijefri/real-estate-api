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
import { UserService } from '../../services/UserService';
import { CreateUserRequest } from '../admin/requests/CreateUserRequest';
import { User } from '../../models/User';

@Service()
@JsonController('/user')
export class UserStoreController {
  constructor(private userService: UserService) {
    // --
  }

  @Post('/register')
  public async registerUser(
    @Res() response: any,
    @Body({ validate: true })
    bodyParam: CreateUserRequest
  ): Promise<any> {
    const userExist = await this.userService.findOne({
      where: {
        email: bodyParam.email.trim(),
      },
    });

    if (userExist) {
      return response.status(400).send({
        message: `Account Already Exist..!`,
      });
    }

    const user = new User();
    user.firstName = bodyParam.firstName;
    user.lastName = bodyParam.lastName;
    user.email = bodyParam.email;
    user.mobile = bodyParam.mobile;
    user.isActive = 1;
    user.password = await CommonService.hashPassword(bodyParam.password);

    const userSave = await this.userService.save(user);

    return response.status(200).send({
      message: `Succesfully Created New User..!`,
      data: instanceToPlain(userSave),
    });
  }

  @Put('/profile')
  @Authorized('user')
  public async userUpdate(
    @Req() request: any,
    @Res() response: any,
    @Body({ validate: false })
    bodyParam: CreateUserRequest
  ): Promise<any> {
    const user = new User();
    user.id = request.userId;
    user.firstName = bodyParam.firstName;
    user.lastName = bodyParam.lastName;
    user.email = bodyParam.email;
    user.mobile = bodyParam.mobile;

    if (bodyParam.isActive) {
      user.isActive = bodyParam.isActive ? 1 : 0;
    }

    if (bodyParam.password) {
      user.password = await CommonService.hashPassword(bodyParam.password);
    }

    const userSave = await this.userService.save(user);

    return response.status(200).send({
      message: `Succesfully Updated User..!`,
      data: instanceToPlain(userSave),
    });
  }

  @Post('/login')
  public async userLogin(
    @Res() response: any,
    @Body({ validate: true }) bodyParam: LoginRequest
  ): Promise<any> {
    const propertyExist = await this.userService.findOne({
      where: {
        email: bodyParam.email.trim(),
      },
    });

    if (!propertyExist) {
      return response.status(400).send({
        message: `Invalid User..!`,
      });
    }

    const checkPassword = await CommonService.verifyPassword(
      bodyParam.password,
      propertyExist.password
    );

    if (!checkPassword) {
      return response.status(400).send({
        message: `Invalid Password`,
      });
    }

    var jwt = require('jsonwebtoken');

    const token = jwt.sign(
      { id: propertyExist.id, type: USER_TYPE.USER },
      credential.jwtSecret
    );

    return response.status(200).send({
      message: `Login Successfull..!`,
      data: {
        token,
        ...instanceToPlain(propertyExist),
      },
    });
  }

  @Get('/profile')
  @Authorized('user')
  public async getUserDetail(
    @Res() response: any,
    @Req() request: any
  ): Promise<any> {
    const user = await this.userService.findOne({
      where: {
        id: request.userId,
      },
    });
    return response.status(200).send({
      message: `Succesfully Got User Profile.!`,
      data: user,
    });
  }
}
