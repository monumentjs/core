import {Comparator} from '../../../../core/main/Comparator';
import {ComparisonResult} from '../../../../core/main/ComparisonResult';
import {MimeType} from './MimeType';
import {GetInstance} from '@monument/core/Language/Decorators/GetInstance';


export class MimeTypeSpecificityComparator<T extends MimeType> implements Comparator<T> {
    @GetInstance()
    public static readonly instance: MimeTypeSpecificityComparator<MimeType>;


    protected constructor() {}


    public compare(x: T, y: T): ComparisonResult {
        if (x.isWildcardType && !y.isWildcardType) {
            // */* < audio/*
            return 1;
        } else if (y.isWildcardType && !x.isWildcardType) {
            // audio/* > */*
            return -1;
        } else if (x.type !== y.type) {
            // audio/basic == text/html
            return 0;
        } else {
            // mediaType1.getType().equals(mediaType2.getType())
            if (x.isWildcardSubType && !y.isWildcardSubType) {
                // audio/* < audio/basic
                return 1;
            } else if (y.isWildcardSubType && !x.isWildcardSubType) {
                // audio/basic > audio/*
                return -1;
            } else if (x.subType !== y.subType) {
                // audio/basic == audio/wave
                return 0;
            } else {
                // mediaType2.getSubtype().equals(mediaType2.getSubtype())
                return this.compareParameters(x, y);
            }
        }
    }


    protected compareParameters(x: T, y: T): ComparisonResult {
        let xParametersCount: number = x.parameters.length;
        let yParametersCount: number = y.parameters.length;

        // audio/basic;level=1 < audio/basic

        if (xParametersCount > yParametersCount) {
            return ComparisonResult.LESS;
        }

        if (xParametersCount < yParametersCount) {
            return ComparisonResult.GREATER;
        }

        return ComparisonResult.EQUALS;
    }
}
