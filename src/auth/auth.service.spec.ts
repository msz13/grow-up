import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
       imports: [JwtModule.register({

        secretOrPrivateKey: 'secretKey',
  
        signOptions: {
  
          expiresIn: 3600,
  
        }
    })
    ],
    providers: [AuthService]
    }).compile();
    service = module.get<AuthService>(AuthService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should give jwt token', async ()=>{
    const token = await service.createToken()
    expect(token).toBeDefined()
    console.log('token is: '+JSON.stringify(token))
  })
});
