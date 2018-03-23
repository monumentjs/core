import {Comparator} from '../../../../core/main/Comparator';
import {ComparisonResult} from '../../../../core/main/ComparisonResult';
import {NumberComparator} from '../../../../core/main/NumberComparator';
import {GetInstance} from '@monument/core/Language/Decorators/GetInstance';
import {MediaType} from './MediaType';


export class MediaTypeQualityComparator implements Comparator<MediaType> {

    @GetInstance()
    public static readonly instance: MediaTypeQualityComparator;


    public compare(x: MediaType, y: MediaType): ComparisonResult {
        let qualityComparison: ComparisonResult = NumberComparator.instance.compare(y.quality, x.quality);

        if (qualityComparison !== ComparisonResult.Equals) {
            // audio/*;q=0.7 < audio/*;q=0.3
            return qualityComparison;
        } else if (x.isWildcardType && !y.isWildcardType) {
            // */* < audio/*
            return ComparisonResult.Greater;
        } else if (!x.isWildcardType && y.isWildcardType) {
            // audio/* > */*
            return ComparisonResult.Less;
        } else if (x.type !== y.type) {
            // audio/basic == text/html
            return ComparisonResult.Equals;
        } else {
            if (x.isWildcardSubType && !y.isWildcardSubType) {
                // audio/* < audio/basic
                return ComparisonResult.Greater;
            } else if (!x.isWildcardSubType && y.isWildcardSubType) {
                // audio/basic > audio/*
                return ComparisonResult.Less;
            } else if (x.subType !== y.subType) {
                // audio/basic == audio/wave
                return ComparisonResult.Equals;
            } else {
                // audio/basic;level=1 < audio/basic
                return NumberComparator.instance.compare(y.parameters.length, x.parameters.length);
            }
        }
    }
}
