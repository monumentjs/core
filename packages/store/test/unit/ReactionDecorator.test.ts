import { Reaction, ReactionDecorator } from '../..';

class TestState {
  values: string[] = [];

  @Reaction('ADD')
  add(value: string) {
    this.values.push(value);
  }
}

describe('ReactionDecorator', function() {
  describe('ofInstance()', function() {
    it('should fetch ReactionDecorator array associated with object instance', function() {
      const decorators: ReactionDecorator[] = ReactionDecorator.ofInstance(new TestState());

      expect(decorators.length).toBe(1);
      expect(decorators).toEqual([
        new ReactionDecorator('add', 'ADD')
      ]);
    });

    it('should return empty array as fallback', function() {
      const decorators: ReactionDecorator[] = ReactionDecorator.ofInstance({});

      expect(decorators.length).toBe(0);
    });
  });
});
