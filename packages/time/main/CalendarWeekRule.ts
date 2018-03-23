

export enum CalendarWeekRule {
    /**
     * Indicates that the first week of the year starts on the first day of the year and ends before
     * the following designated first day of the week.
     */
    FirstDay,

    /**
     * Indicates that the first week of the year is the first week with four or more days before
     * the designated first day of the week.
     */
    FirstFullWeek,

    /**
     * Indicates that the first week of the year begins on the first occurrence of the designated first day
     * of the week on or after the first day of the year.
     */
    FirstFourDayWeek
}
