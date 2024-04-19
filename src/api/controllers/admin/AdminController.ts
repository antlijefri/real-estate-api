import { Body, JsonController, Post, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { CommonService } from '../../services/CommonServices';
import { instanceToPlain } from 'class-transformer';
import { USER_TYPE } from '../../../config/utils/commonInterfaces';
import { credential } from '../../../config/utils/env';

@Service()
@JsonController('/admin')
export class AdminController {
  constructor() {
    // --
  }

  @Post('/login')
  public async adminLogin(
    @Res() response: any,
    @Body({ validate: true }) bodyParam: { email: string; password: string }
  ): Promise<any> {
    if (credential.adminEmail === bodyParam.email) {
      if (credential.adminPassword === bodyParam.password) {
        var jwt = require('jsonwebtoken');

        const token = jwt.sign(
          { id: 0, type: USER_TYPE.ADMIN },
          credential.jwtSecret
        );

        return response.status(200).send({
          message: `Login Successfull..!`,
          data: {
            token,
          },
        });
      }
    }
    return response.status(400).send({
      mwsssage: `Invalid Credential`,
    });
  }
}
