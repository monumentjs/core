import {Module} from '../stereotype/Module';
import {DateTimeParser} from './DateTimeParser';
import {TimeEntryProcessorProvider} from './EntryProcessors/TimeEntryProcessorProvider';
import {AMPMProcessor} from './EntryProcessors/AMPMProcessor';
import {DayOfMonthProcessor} from './EntryProcessors/DayOfMonthProcessor';
import {DayOfWeekProcessor} from './EntryProcessors/DayOfWeekProcessor';
import {HoursProcessor} from './EntryProcessors/HoursProcessor';
import {MillisecondsProcessor} from './EntryProcessors/MillisecondsProcessor';
import {MinutesProcessor} from './EntryProcessors/MinutesProcessor';
import {MonthProcessor} from './EntryProcessors/MonthProcessor';
import {SecondsProcessor} from './EntryProcessors/SecondsProcessor';
import {SignProcessor} from './EntryProcessors/SignProcessor';
import {TimeZoneProcessor} from './EntryProcessors/TimeZoneProcessor';
import {YearProcessor} from './EntryProcessors/YearProcessor';
import {IgnoreCaseComparator} from '../text/IgnoreCaseComparator';


@Module({
    dependsOn: [
        IgnoreCaseComparator,
    ],
    components: [
        DateTimeParser,
        TimeEntryProcessorProvider,
        AMPMProcessor,
        DayOfMonthProcessor,
        DayOfWeekProcessor,
        HoursProcessor,
        MillisecondsProcessor,
        MinutesProcessor,
        MonthProcessor,
        SecondsProcessor,
        SignProcessor,
        TimeZoneProcessor,
        YearProcessor
    ]
})
export class TimeModule {
    
}
