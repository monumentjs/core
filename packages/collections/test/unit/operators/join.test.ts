import { IgnoreCaseEquals } from '@monument/comparison';
import { join } from '../../../src/operators/join';

describe('join()', function() {
  it('should join sequences and maintain on-demand evaluation evaluation', function() {
    const sourceA = ['two', 'ONE', 'one', 'Three', 'One'];
    const sourceB = ['Ten', 'Once', 'Twelve'];
    const result = join(sourceA, sourceB, wordA => wordA[0], wordB => wordB[0], (wordA, wordB) => [wordA, wordB], IgnoreCaseEquals);

    expect([...result]).toEqual([
      ['two', 'Ten'],
      ['two', 'Twelve'],
      ['ONE', 'Once'],
      ['one', 'Once'],
      ['Three', 'Ten'],
      ['Three', 'Twelve'],
      ['One', 'Once']
    ]);

    sourceB.push('One');

    expect([...result]).toEqual([
      ['two', 'Ten'],
      ['two', 'Twelve'],
      ['ONE', 'Once'],
      ['ONE', 'One'],
      ['one', 'Once'],
      ['one', 'One'],
      ['Three', 'Ten'],
      ['Three', 'Twelve'],
      ['One', 'Once'],
      ['One', 'One']
    ]);
  });
});
