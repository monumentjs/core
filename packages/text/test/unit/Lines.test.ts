import { Lines } from '../..';

describe('Lines', function() {
  describe('iterator', function() {
    it('should iterate over lines', function() {
      const lines = new Lines('One\rTwo\r\nThree\nFour\r\n\r\nFive\n\nSix\n\r\nSeven');

      expect(lines.toArray()).toEqual([
        'One', 'Two', 'Three', 'Four', '', 'Five', '', 'Six', '', 'Seven'
      ]);
    });
  });
});
