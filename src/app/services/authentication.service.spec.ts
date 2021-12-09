import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [
        AngularFireAuth
      ]
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('creates an acount', async () => {
    const { email, password } = generateEmailAndPassword();    
    const result = await service.createAcount(email, password);
    expect(result).toEqual(true);
  });

  it('logs users in', async () => {
    const { email, password } = generateEmailAndPassword();
    const result = await service.createAcount(email, password);
    expect(result).toEqual(true);

    const loginResult = await service.login(email, password);
    expect(loginResult).toEqual(true);
  });

  it('does not log users in when the email and password are invalid', async () => {
    const loginResult = await service.login('invalid@email.invalid', 'password');
    expect(loginResult).toEqual(false);
  });

  const generateEmailAndPassword = () => {
    const randomString = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const email = `${randomString()}@${randomString()}.test`;
    const password = randomString();
    return { email, password};
  };
});
