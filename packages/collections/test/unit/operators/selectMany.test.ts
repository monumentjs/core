import { selectMany } from '../../../src/operators/selectMany';

describe('selectMany()', function() {
  it('should select many items and maintain on-demand evaluation', function() {
    const source = [
      {
        name: 'Alex',
        marks: [4, 5]
      }
    ];
    const result = selectMany(source, student => student.marks, (student, mark) => ({ name: student.name, mark }));

    expect([...result]).toEqual([
      {
        name: 'Alex',
        mark: 4
      },
      {
        name: 'Alex',
        mark: 5
      }
    ]);

    source.push(
      {
        name: 'Bob',
        marks: [3, 4]
      }
    );

    expect([...result]).toEqual([
      {
        name: 'Alex',
        mark: 4
      },
      {
        name: 'Alex',
        mark: 5
      },
      {
        name: 'Bob',
        mark: 3
      },
      {
        name: 'Bob',
        mark: 4
      }
    ]);

  });
});
