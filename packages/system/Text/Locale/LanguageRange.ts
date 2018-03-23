import {Assert} from '@monument/core/Assertion/Assert';
import {List} from '../../../collections-core/main/List';
import {ArrayList} from '../../../collections/main/ArrayList';
import {InvalidArgumentException} from '../../../core/main/exceptions/InvalidArgumentException';
import {EMPTY_STRING} from '../../../text/main/constants';
import {NullPointerException} from '../../../core/main/exceptions/NullPointerException';
import {HeaderName} from '../../Net/Http/Headers/HeaderName';
import {LocaleEquivalentMaps} from './LocaleEquivalentMaps';


export class LanguageRange {
    private static readonly ACCEPT_LANGUAGE_HEADER_ENTRY: string = `${HeaderName.AcceptLanguage.toLowerCase()}:`;
    private static readonly WEIGHT_ENTRY: string = ';q=';

    public static readonly MAX_WEIGHT: number = 1;
    public static readonly MIN_WEIGHT: number = 0;


    public static parse(input: string): List<LanguageRange> {
        input = input.replace(/ /g, '').toLowerCase();

        if (input.startsWith(LanguageRange.ACCEPT_LANGUAGE_HEADER_ENTRY)) {
            // delete unnecessary prefix
            input = input.substring(16);
        }

        let langRanges: string[] = input.split(',');
        let list: List<LanguageRange> = new ArrayList();
        let tempList: List<string> = new ArrayList();

        let numOfRanges: number = 0;

        for (let range of langRanges) {
            let index;
            let r;
            let w;

            if ((index = range.indexOf(LanguageRange.WEIGHT_ENTRY)) === -1) {
                r = range;
                w = LanguageRange.MAX_WEIGHT;
            } else {
                r = range.substring(0, index);
                index += LanguageRange.WEIGHT_ENTRY.length;

                w = parseFloat(range.substring(index));

                if (isNaN(w)) {
                    throw new InvalidArgumentException('weight', `Weight is not a number for language range "${r}"`);
                }

                Assert.argument('weight', w).bounds(LanguageRange.MIN_WEIGHT, LanguageRange.MAX_WEIGHT);
            }

            if (!tempList.contains(r)) {
                let lr: LanguageRange = new LanguageRange(r, w);

                index = numOfRanges;

                for (let j = 0; j < numOfRanges; j++) {
                    if (list.getAt(j).weight < w) {
                        index = j;
                        break;
                    }
                }

                list.insert(index, lr);

                numOfRanges++;

                tempList.add(r);

                // Check if the range has an equivalent using IANA LSR data.
                // If yes, register it to the UserDto's Language Priority List as well.

                // aa-XX -> aa-YY
                let equivalent: string | null;

                if ((equivalent = LanguageRange.getEquivalentForRegionAndVariant(r)) != null && !tempList.contains(
                        equivalent)) {
                    list.insert(index + 1, new LanguageRange(equivalent, w));

                    numOfRanges++;

                    tempList.add(equivalent);
                }

                let equivalents: string[] | null;

                if ((equivalents = LanguageRange.getEquivalentsForLanguage(r)) != null) {
                    for (let equiv of equivalents) {
                        // aa-XX -> bb-XX(, cc-XX)
                        if (!tempList.contains(equiv)) {
                            list.insert(index + 1, new LanguageRange(equiv, w));

                            numOfRanges++;

                            tempList.add(equiv);
                        }

                        // bb-XX -> bb-YY(, cc-YY)
                        equivalent = LanguageRange.getEquivalentForRegionAndVariant(equiv);

                        if (equivalent != null && !tempList.contains(equivalent)) {
                            list.insert(index + 1, new LanguageRange(equivalent, w));
                            numOfRanges++;
                            tempList.add(equivalent);
                        }
                    }
                }
            }
        }

        return list;
    }


    private static getEquivalentsForLanguage(range: string): string[] | null {
        let r = range;

        while (r.length > 0) {
            if (LocaleEquivalentMaps.singleEquivMap.containsKey(r)) {
                let equiv: string | undefined = LocaleEquivalentMaps.singleEquivMap.get(r);

                if (equiv == null) {
                    throw new NullPointerException(`Locale equivalent is not defined.`);
                }

                // Return immediately for performance if the first matching
                // subtag is found.
                return [range.replace(r, equiv)];
            } else if (LocaleEquivalentMaps.multiEquivsMap.containsKey(r)) {
                let equivs: string[] | undefined = LocaleEquivalentMaps.multiEquivsMap.get(r);

                if (equivs == null) {
                    throw new NullPointerException(`Locale equivalents list is not defined.`);
                }

                for (let i = 0; i < equivs.length; i++) {
                    equivs[i] = range.replace(r, equivs[i]);
                }

                return equivs;
            }

            // Truncate the last subtag simply.
            let index: number = r.lastIndexOf('-');

            if (index === -1) {
                break;
            }

            r = r.substring(0, index);
        }

        return null;
    }


    private static getEquivalentForRegionAndVariant(range: string): string | null {
        let extensionKeyIndex: number = LanguageRange.getExtentionKeyIndex(range);

        for (let subtag of LocaleEquivalentMaps.regionVariantEquivMap.keys) {
            let index: number;

            if ((index = range.indexOf(subtag)) !== -1) {
                // Check if the matching text is a valid region or variant.
                if (extensionKeyIndex !== Number.MIN_SAFE_INTEGER && index > extensionKeyIndex) {
                    continue;
                }

                let len = index + subtag.length;

                if (range.length === len || range.charAt(len) === '-') {
                    let regionEquiv: string | undefined = LocaleEquivalentMaps.regionVariantEquivMap.get(subtag);

                    if (regionEquiv == null) {
                        throw new NullPointerException(`Region variant equivalent is not defined.`);
                    }

                    return range.replace(subtag, regionEquiv);
                }
            }
        }

        return null;
    }


    private static getExtentionKeyIndex(input: string): number {
        let index = Number.MIN_SAFE_INTEGER;

        for (let i = 1; i < input.length; i++) {
            if (input[i] === '-') {
                if (i - index === 2) {
                    return index;
                } else {
                    index = i;
                }
            }
        }

        return Number.MIN_SAFE_INTEGER;
    }


    private static isSubtagIllFormed(subtag: string, isFirstSubtag: boolean): boolean {
        if (subtag === EMPTY_STRING || subtag.length > 8) {
            return true;
        } else if (subtag === '*') {
            return false;
        }

        if (isFirstSubtag) { // ALPHA
            for (let c of subtag) {
                if (c < 'a' || c > 'z') {
                    return true;
                }
            }
        } else { // ALPHA / DIGIT
            for (let c of subtag) {
                if (c < '0' || (c > '9' && c < 'a') || c > 'z') {
                    return true;
                }
            }
        }

        return false;
    }


    private _range: string;
    private _weight: number;


    public get range(): string {
        return this._range;
    }


    public get weight(): number {
        return this._weight;
    }


    public constructor(range: string, weight: number = LanguageRange.MAX_WEIGHT) {
        Assert.argument('range', range).notEmptyString();
        Assert.argument('weight', weight).bounds(LanguageRange.MIN_WEIGHT, LanguageRange.MAX_WEIGHT);

        range = range.toLowerCase();

        // Do syntax check.
        let isIllFormed: boolean = false;
        let subtags: string[] = range.split('-');

        if (LanguageRange.isSubtagIllFormed(subtags[0], true) || range.endsWith('-')) {
            isIllFormed = true;
        } else {
            for (let i = 1; i < subtags.length; i++) {
                if (LanguageRange.isSubtagIllFormed(subtags[i], false)) {
                    isIllFormed = true;
                    break;
                }
            }
        }

        if (isIllFormed) {
            throw new InvalidArgumentException('range', 'Range is ill-formed');
        }

        this._range = range;
        this._weight = weight;
    }
}
