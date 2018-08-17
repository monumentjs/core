# TypeScript Standard Library

[![Travis CI Status](https://travis-ci.org/monumentjs/core.svg?branch=master)](https://travis-ci.org/monumentjs/core)

**Standard library** provides **high quality** and **reusable** codebase written in TypeScript. 
It designed for development of **large applications** when **scalability** and **consistency** 
are very important.


## Motivation

It would be nice to have a consistent standard library with tons of solutions under one hood, to have possibility to easily pick necessary ones and combine them with less amount of "clue"?

## Examples

### Application

```ts
@Boot
@Application({
  modules: [
    GreetingModule
  ],
  configurations: [
    ApplicationConfiguration
  ]
})
export class GreetingApplication {
  private readonly _greetingService: GreetingService;

  public constructor(greetingService: GreetingService) {
    this._greetingService = greetingService;
  }
  
  @Run
  public run(): void {
    this._greetingService.sayHello('Alex');
  }
}


@Configuration
export class ApplicationConfiguration {
  @Unit
  public getGreetingService(printer: ConsolePrinter): GreetingService {
    return new GreetingService(printer);
  }
}


@Module({
  components: [
    GreetingService
  ],
  dependsOn: [
    PrinterModule
  ]
})
export class GreetingModule {
}


@Service
export class GreetingService {
  private readonly _printer: Printer;
  
  public constructor(printer: Printer) {
    this._printer = printer;
  }
  
  public sayHello(personName: string): void {
    this._printer.print(`Hello ${personName}!`);
  }
}


@Module({
  components: [
    ConsolePrinter
  ]
})
export class PrinterModule {
}


export interface Printer {
  print(text: string): void;
}


@Lazy
@Component
export class ConsolePrinter implements Printer {
  public print(text: string): void {
    console.log(text);
  }
}

```

### Tests

```ts

@Component
export class PrinterMock implements Printer {
  private readonly _messages: LinkedList<string> = new LinkedList();
  
  public get messages(): ReadOnlyList<string> {
    return this._messages;
  }
  
  public print(message: string): void {
    this._messages.add(message);
  }
}


@Configuration
export class GreetingServiceTestConfiguration {
  @Unit
  public getGreetingService(printer: PrinterMock): GreetingService {
    return new GreetingService(printer);
  }
}


@ContextConfiguration({
  modules: [
    GreetingModule
  ],
  components: [
    PrinterMock,
    GreetingServiceTestConfiguration
  ]
})
export class GreetingServiceTest {

  @Test
  public 'sending greeting text to printer'(assert: Assert, service: GreetingService, printer: PrinterMock) {
    service.sayHello('Alex');
    
    assert.equals(printer.messages.last, 'Hello Alex!');
  }
}
```

## Contribution

Feel free to make pull-requests. Your help is always welcome.


## License

MIT
