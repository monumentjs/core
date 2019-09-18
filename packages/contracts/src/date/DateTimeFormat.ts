
export interface DateTimeFormat {
  readonly fullDateTimePattern: string;
  readonly fullDatePattern: string;
  readonly fullTimePattern: string;
  readonly amDesignator: string;
  readonly pmDesignator: string;
  readonly fullMonthNames: ReadonlyArray<string>;
  readonly shortMonthNames: ReadonlyArray<string>;
  readonly fullDayNames: ReadonlyArray<string>;
  readonly shortDayNames: ReadonlyArray<string>;
  readonly shortestDayNames: ReadonlyArray<string>;
}
