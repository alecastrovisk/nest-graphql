import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.input';
import { UpdateUserDTO } from './dto/update-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

const userEntityList: User[] = [
  new User({
    "name": "Mel",
    "email": "mel@email.com",
    "password": "12345",
    "age": 20
  })
]

const userWithUndefinedPassword: User = new User({
    "name": "Mel",
    "email": "mel@email.com",
    "password": undefined,
    "age": 20
});

const userUpdated: UpdateUserDTO = new User({
  "name": "Mel",
  "email": "mel@email.com",
  "password": "12345",
  "age": 20
})

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(userEntityList),
            findOneBy: jest.fn().mockResolvedValue(userEntityList[0]),
            create: jest.fn().mockReturnValue(userEntityList[0]),
            save: jest.fn().mockResolvedValue(userEntityList[0]),
            update: jest.fn().mockResolvedValue(userEntityList[0]),
            findOne: jest.fn(),
            delete: jest.fn(),
            softDelete: jest.fn(),
          }
        }
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('findAllUsers', () => {
    it('Should be able to return a list of Users entity', async () => {
      const result = await userService.findAllUsers();

      expect(result).toEqual(userEntityList);
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    })

    it('Should Throw an exception', () => {
      jest.spyOn(userRepository, 'find').mockRejectedValueOnce(new Error());

      expect(userService.findAllUsers).rejects.toThrowError()
    })
  });

  describe('findUserById', () => {
    it('Should return an user entity successfully', async () => {
      const result = await userService.findUserById(1);

      expect(result).toEqual(userEntityList[0]);
      expect(userRepository.findOneBy).toBeCalledTimes(1);
    });

    it('Should throw a not found exception', () => {
      jest.spyOn(userRepository, 'findOneBy')
        .mockRejectedValueOnce(new Error());

      expect(userService.findUserById(1)).rejects.toThrowError(
        NotFoundException
      );
    })
  });

  describe('createUser', () => {
    it('Should be able to create an user entity successfully', async () => {
      const data: CreateUserDTO = {
        name: "Mel",
        email: "mel@email.com",
        password: "12345",
        age: 19
      }

      const result = await userService.createUser(data);

      expect(result).toEqual(userWithUndefinedPassword);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });

    it('Should throw an Exception', () => {
      const data: CreateUserDTO = {
          name: "Mel",
          email: "mel@email.com",
          password: "12345",
          age: 19    
      }

      jest.spyOn(userRepository, 'save').mockRejectedValueOnce(new Error());

      expect(userService.createUser(data)).rejects.toThrowError();
    })
  });

  describe('updateUser', () => {
    it('Should be able to update an user', async () => {
      const data: UpdateUserDTO = {
        name: "Mel",
        email: "mel@email.com",
        age: 20
      }

      jest.spyOn(userRepository, 'save')
        .mockResolvedValueOnce(userEntityList[0])

      const result = await userService.updateUser(1, data);

      expect(result).toEqual(userUpdated);
    });
    it('Should throw a not found exception', () => {
      const data: UpdateUserDTO = {
        name: "Mel",
        email: "mel@email.com",
        age: 20
      }

      jest.spyOn(userRepository, 'findOneBy')
        .mockRejectedValueOnce(new Error());

      expect(userService.updateUser(1, data)).rejects.toThrowError(
        NotFoundException
      );
    });
  });
});
