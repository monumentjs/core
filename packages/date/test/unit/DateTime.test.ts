import { DateTime, DateTimeFormat, InvariantDateTimeFormat } from '../..';

describe('DateTime', function() {
  describe('toString(pattern, format)', function() {
    it('should format date', function() {
      const format: DateTimeFormat = new InvariantDateTimeFormat();
      const samples: Array<[DateTime, string, string]> = [
        [
          new DateTime(2019, 7, 8),
          '{YYYY}-{MM}-{DD}',
          '2019-08-09'
        ],
        [
          new DateTime(2019, 7, 8),
          '{DD}.{MM}.{YY}',
          '09.08.19'
        ],
        [
          new DateTime(2019, 7, 8, 10, 12, 50),
          '{hh}:{mm}:{ss}',
          '10:12:50'
        ],
        [
          new DateTime(2019, 7, 8, 10, 12, 50),
          '{hh}:{mm}:{ss}',
          '10:12:50'
        ],
        [
          new DateTime(2019, 7, 13, 7, 5, 8, 2),
          '{YYYY} {YY} {MMMM} {MMM} {MM} {M} {DD} {D} {ddd} {dd} {d} {hh} {h} {mm} {m} {ss} {s} {sss} {a}',
          '2019 19 August Aug 08 8 14 14 Wednesday Wed We 07 7 05 5 08 8 002 AM'
        ]
      ];

      for (const [datetime, pattern, result] of samples) {
        const serialized = datetime.toString(pattern, format);

        expect(serialized).toBe(result);
      }
    });
  });
});
