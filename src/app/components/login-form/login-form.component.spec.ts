import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('says "Welcome"', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.header').textContent).toContain('Welcome');
  });

  it('has an email field', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.email')).not.toEqual(null);
  });

  it('has a password field', () => {
    const compile = fixture.nativeElement;
    expect(compile.querySelector('.password')).not.toEqual(null);
  });

  it('has a login button', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button.login')).not.toEqual(null);
  });

  it('has a create account button', () => {
    const compile = fixture.nativeElement;
    expect(compile.querySelector('button.create-account')).not.toEqual(null);
  })

  it ('successfully create an account', async () => {
    const randomString = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    const email = `${randomString()}@${randomString()}.test`;
    const password = randomString();
    
    component.email.setValue(email);
    component.password.setValue(password);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const createAccount = compiled.querySelector('button.create-account');

    createAccount.onclick = (event: any) => event.preventDefault();
    createAccount.click();
    fixture.detectChanges();

    // expect(compiled.querySelector('.message').textContent).toContain('Your account was created successfully.');

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(compiled.querySelector('.message').textContent).toContain('Your account was created successfully.');
    });
  });

  it('does not display a success message if an account is not created.', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.message')).toEqual(null);
  });

  it('requires an email and password for account creation', () => {
    const compiled = fixture.nativeElement;

    component.email.markAsTouched();
    component.password.markAsTouched();
    fixture.detectChanges();

    const createAccountButton = compiled.querySelector('button.create-account');
    createAccountButton.click();

    expect(document.querySelector('.email-validation-message')?.textContent).toContain('An email is required.');
    expect(document.querySelector('.password-validation-message')?.textContent).toContain('A password is required.');

    expect(document.querySelector('.message')).toEqual(null);
  });

});
