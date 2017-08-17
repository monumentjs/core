# Dependency Injection Example

Core library comes with Dependency Injection container and few useful decorators like `@Unit`, `@Singleton`, `@Service`, `@UnitGetter` etc.


```ts

interface ILoginCredentials {
  email: string;
  password: string;
}


interface ILoginService {
  login(credentials: ILoginCredentials): Promise<boolean>;
}


@Singleton()
class EmailValidator {
  public validate(email: string): void {
    // Implementation of email validation
  }
}


@Singleton()
class PasswordValidator {
  public validate(password: string): void {
    // Implementation of password validation
  }
}


@Service()
class LoginService implements ILoginService {
  @UnitGetter(EmailValidator)
  private readonly emailValidator: EmailValidator;

  @UnitGetter(PasswordValidator)
  private readonly passwordValidator: PasswordValidator;

  public async login(credentials: ILoginCredentials): Promise<boolean> {
    Assert.argument('credentials', credentials).notNull();
    
    this.emailValidator.validate(credentials.email);
    this.passwordValidator.validate(credentials.password);

    // Implementation of login process
  }
}


@Unit({
  providers: [
    LoginService
  ]
})
class LoginFormController {
  public email: string;
  public password: string;

  public constructor(private readonly loginService: ILoginService) {
    Assert.argument('loginService', loginService).notNull();
  }
  
  public async login(): Promise<boolean> {    
    return this.loginService.login({
      email: this.email,
      password: this.password
    );
  }
  
  // Other controller's methods...
}

```
