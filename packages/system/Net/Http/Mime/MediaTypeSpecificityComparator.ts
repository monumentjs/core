import {MimeTypeSpecificityComparator} from './MimeTypeSpecificityComparator';
import {MediaType} from './MediaType';
import {ComparisonResult} from '../../../../core/main/ComparisonResult';
import {GetInstance} from '@monument/core/Language/decorator/GetInstance';
import {NumberComparator} from '../../../../core/main/NumberComparator';


export class MediaTypeSpecificityComparator extends MimeTypeSpecificityComparator<MediaType> {
    @GetInstance()
    public static readonly instance: MediaTypeSpecificityComparator;


    protected compareParameters(x: MediaType, y: MediaType): ComparisonResult {
        let qualityComparison: ComparisonResult = NumberComparator.instance.compare(y.quality, x.quality);

        if (qualityComparison !== ComparisonResult.Equals) {
            // audio/*;q=0.7 < audio/*;q=0.3
            return qualityComparison;
        }

        return super.compareParameters(x, y);
    }
}
