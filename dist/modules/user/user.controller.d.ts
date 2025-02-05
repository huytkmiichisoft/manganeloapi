import { ApiResult } from 'src/common/api-result';
import { dtoLoginUser, dtoRegisterUser, dtoDevicesUser, dtoUpdateUserInfo, dtoRemoveDevicesUser } from './user.dto';
import { UserService } from './user.service';
import { User } from 'src/database/user.model';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createNewUser(dataRegister: dtoRegisterUser): Promise<ApiResult<unknown>>;
    LoginUser(dataLogin: dtoLoginUser): Promise<ApiResult<unknown>>;
    addDevicesUser(dataDevices: dtoDevicesUser, user: User): Promise<ApiResult<unknown>>;
    userRemoveDevices(user: User, dataRemove: dtoRemoveDevicesUser): Promise<ApiResult<unknown>>;
    updateUserInfo(dataUpdate: dtoUpdateUserInfo, user: User): Promise<ApiResult<unknown>>;
    getMeInfoUser(user: User): Promise<ApiResult<unknown>>;
}
