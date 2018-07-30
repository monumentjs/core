import {Equatable} from '@monument/core/main/utils/comparison/Equatable';
import {Comparable} from '@monument/core/main/utils/comparison/Comparable';


export interface HttpVersion extends Equatable<HttpVersion>, Comparable<HttpVersion> {
    readonly major: number;
    readonly minor: number;
}
