
export const SECONDS_IN_MINUTE: number = 60;
export const MINUTES_IN_HOUR: number = 60;
export const HOURS_IN_DAY: number = 24;

export const MILLISECONDS_IN_SECOND: number = 1000;
export const MILLISECONDS_IN_MINUTE: number = SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
export const MILLISECONDS_IN_HOUR: number = MINUTES_IN_HOUR * MILLISECONDS_IN_MINUTE;
export const MILLISECONDS_IN_DAY: number = HOURS_IN_DAY * MILLISECONDS_IN_HOUR;

export const DAYS_TO_MONTH_365: number[] = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
export const DAYS_TO_MONTH_366: number[] = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];
export const DAYS_OFFSET_PER_MONTH: number[] = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

