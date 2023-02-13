import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDTO } from './dto/create-user.input';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
      controllers: [UserController]
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('createUser', () => {
    it('Should create a new User with success', async () => {
      const data: CreateUserDTO = {
        name: 'User Name',
        email: 'useremail@email.com',
        age: 22,
        password: '12345'
      };

      const result = await userController.create(data);

      expect(result).toBeDefined();
      expect(userService.createUser).toBeCalledTimes(1);
    })
  })
});
