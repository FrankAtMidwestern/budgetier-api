import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { SignupAuthDto, SigninAuthDto } from '../src/auth/dto';
import { EditUserDto } from '../src/user/dto';
import { CreateGroupBudgetDto } from '../src/groupbudget/dto/create-groupbudget.dto';
describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    app.listen(3333);
    prisma = app.get(PrismaService);

    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });
  describe('Auth', () => {
    const signUpDto: SignupAuthDto | SigninAuthDto = {
      email: 'foo@bar.com',
      password: '123',
      firstName: 'John',
      lastName: 'Doe',
    };
    const signinDto: SigninAuthDto = {
      email: 'foo@bar.com',
      password: '123',
    };
    describe('Signup', () => {
      it('should throw if email, first name, and last name is empty', async () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: signUpDto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password is empty', async () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            firstName: signUpDto.firstName,
            lastName: signUpDto.lastName,
            email: signUpDto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body was provided', async () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('Should sign up', async () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(signUpDto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('should throw if email is empty', async () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: signinDto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password is empty', async () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: signinDto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body was provided', async () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
      it('Should sign in', async () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(signinDto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });
  describe('User', () => {
    describe('Get current user', () => {
      it('should get current user', async () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      it('should edit current user', async () => {
        const dto: EditUserDto = {
          firstName: 'Johnathan',
          lastName: 'Doseph',
          email: 'johathan@gmail.com',
          role: 'ADMIN',
        };
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.lastName)
          .expectBodyContains(dto.email)
          .expectBodyContains(dto.role);
      });
    });
  });
  describe('GroupBudget', () => {
    describe('Get empty GroupBudget', () => {
      it('should get empty GroupBudget', async () => {
        return pactum
          .spec()
          .get('/groupbudgets')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });
    describe('Create GroupBudget', () => {
      const dto: CreateGroupBudgetDto = {
        title: 'First Group budget',
        description: 'A description of the first group budget',
      };
      it('should create GroupBudget', async () => {
        return pactum
          .spec()
          .post('/groupbudgets')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Get GroupBudgets', () => {});
    describe('Get GroupBudget by id', () => {});
    describe('Edit GroupBudget by id', () => {});
    describe('Delete GroupBudget', () => {});
  });
  describe('Report', () => {
    describe('Create Report', () => {});
    describe('Get Reports', () => {});
    describe('Get Report by id', () => {});
    describe('Edit Report by id', () => {});
    describe('Delete Report', () => {});
  });
  describe('Budget', () => {
    describe('Create Budget', () => {});
    describe('Get Budgets', () => {});
    describe('Get Budget by id', () => {});
    describe('Edit Budget by id', () => {});
    describe('Delete Budget', () => {});
  });
  describe('Income', () => {
    describe('Create Income', () => {});
    describe('Get Incomes', () => {});
    describe('Get Income by id', () => {});
    describe('Edit Income by id', () => {});
    describe('Delete Income', () => {});
  });
  describe('Expense', () => {
    describe('Create Expense', () => {});
    describe('Get Expenses', () => {});
    describe('Get Expense by id', () => {});
    describe('Edit Expense by id', () => {});
    describe('Delete Expense', () => {});
  });
  describe('Tag', () => {
    describe('Create Expense', () => {});
    describe('Get Expenses', () => {});
    describe('Get Expense by id', () => {});
    describe('Edit Expense by id', () => {});
    describe('Delete Expense', () => {});
  });
});
