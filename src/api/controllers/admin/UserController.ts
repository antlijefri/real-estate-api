import {
  JsonController,
  Get,
  Res,
  Param,
  Post,
  Body,
  BodyParam,
  Delete,
} from 'routing-controllers';
import { UserService } from '../../services/UserService';
import { Service } from 'typedi';
import { CommonService } from '../../services/CommonServices';
import { CreateUserRequest } from './requests/CreateUserRequest';
import { instanceToPlain } from 'class-transformer';
import { User } from '../../models/User';

@Service()
@JsonController('/admin/user')
export class UserAdminController {
  constructor(private userService: UserService) {
    // --
  }

  @Get()
  public async getUserList(@Res() response: any): Promise<any> {
    const adminList = await this.userService.find();
    return response.status(200).send(adminList);
  }

  @Get('/:id')
  public async getUserDetail(
    @Param('id') id: number,
    @Res() response: any
  ): Promise<any> {
    const adminList = await this.userService.findOne({
      where: {
        id,
      },
    });
    return response.status(200).send(adminList);
  }

  @Post()
  public async createUser(
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
        message: `User Already Exist..!`,
      });
    }

    const user = new User();
    user.firstName = bodyParam.firstName;
    user.lastName = bodyParam.lastName;
    user.email = bodyParam.email;
    user.mobile = bodyParam.mobile;
    user.isActive = bodyParam.isActive ? 1 : 0;
    user.password = await CommonService.hashPassword(bodyParam.password);

    const userSave = await this.userService.save(user);

    return response.status(200).send({
      message: `Succesfully Created New User..!`,
      data: instanceToPlain(userSave),
    });
  }

  @Delete('/:id')
  public async deleteUser(
    @Param('id') id: number,
    @Res() response: any
  ): Promise<any> {
    const customer = await this.userService.findOne({
      where: {
        id,
      },
    });

    if (!customer) {
      return response.status(200).send({
        message: `Invalid User Id..!`,
      });
    }

    const deleteResult = await this.userService.delete({ id });

    return response.status(200).send({
      message: `Successfully Deleted User..!`,
      data: deleteResult,
    });
  }
}
