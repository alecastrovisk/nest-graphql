import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller"
import { User } from "./user.entity";
import { UserService } from "./user.service";

describe('UserController', () => {
    let userController: UserController;

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [{
                provide: UserService,
                useValue: {
                    createUser: jest.fn(),
                    updateUser: jest.fn(),
                    deleteUser: jest.fn(),
                    softDelete: jest.fn(),
                }
            }]
        }).compile();

        userController = module.get<UserController>(UserController);
    });

    it('should be defined', () => {
        expect(userController).toBeDefined();
    });
});