import { Catch, CatchDecorator } from '../..';

class ErrorHandler {
  errors: Error[] = [];

  @Catch(Error)
  onError(err: Error) {
    this.errors.push(err);
  }
}

describe('CatchDecorator', function() {
  describe('decorate()', function() {
    class Dummy {
      readonly errors: Error[] = [];

      onError(error: Error) {
        this.errors.push(error);
      }
    }

    CatchDecorator.decorate(Dummy.prototype, 'onError', Error);
  });

  describe('ofInstance()', function() {
    it('should fetch CatchDecorator array associated with object instance', function() {
      const decorators: CatchDecorator[] = CatchDecorator.ofInstance(new ErrorHandler());

      expect(decorators.length).toBe(1);
      expect(decorators).toEqual([
        new CatchDecorator('onError', Error)
      ]);
    });

    it('should return empty array as fallback', function() {
      const decorators: CatchDecorator[] = CatchDecorator.ofInstance({});

      expect(decorators.length).toBe(0);
    });
  });
});
