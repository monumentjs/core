import { RuntimeException } from '@monument/core';
import { Catch, ErrorMediator, Errors } from '../..';

class FirstException extends RuntimeException {
}

class SecondException extends RuntimeException {
}

class ErrorHandler {
  firstExceptions: FirstException[] = [];
  secondExceptions: SecondException[] = [];

  @Catch(FirstException)
  onFirstException(ex: FirstException) {
    this.firstExceptions.push(ex);
  }

  @Catch(SecondException)
  onSecondException(ex: SecondException) {
    this.secondExceptions.push(ex);
  }
}

describe('ErrorMediator', function() {
  let history: Error[];
  let errors: Errors;
  let errorHandler: ErrorHandler;
  let errorMediator: ErrorMediator;

  beforeEach(() => {
    history = [];
    errors = new Errors();

    errors.subscribe(error => history.push(error));

    errorHandler = new ErrorHandler();
    errorMediator = new ErrorMediator(errors, [errorHandler]);
  });

  afterEach(() => {
    errorMediator.dispose();
  });

  it('should dispatch specific errors to concrete method', function() {
    errors.next(new FirstException('First'));
    errors.next(new SecondException('Second'));
    expect(history).toEqual([
      new FirstException('First'),
      new SecondException('Second')
    ]);
    expect(errorHandler.firstExceptions).toEqual([
      new FirstException('First')
    ]);
    expect(errorHandler.secondExceptions).toEqual([
      new SecondException('Second')
    ]);
  });
});
