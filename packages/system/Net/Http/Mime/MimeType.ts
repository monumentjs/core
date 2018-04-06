import {Encoding} from '../../../Text/Encoding';
import {Map} from '../../../../collections/main/Map';
import {Comparable} from '../../../../core/main/Comparable';
import {Equatable} from '../../../../core/main/Equatable';
import {ComparisonResult} from '../../../../core/main/ComparisonResult';
import {IgnoreCaseComparator} from '../../../../text/main/IgnoreCaseComparator';
import {StringBuilder} from '../../../../text/main/StringBuilder';
import {Assert} from '@monument/core/Assertion/Assert';
import {ReadOnlyMap} from '../../../../collections/main/ReadOnlyMap';
import {InvalidArgumentException} from '../../../../core/main/exceptions/InvalidArgumentException';
import {PreserveCaseComparator} from '../../../../text/main/PreserveCaseComparator';
import {ListMap} from '../../../../collections/main/ListMap';
import {ArrayList} from '../../../../collections/main/ArrayList';
import {List} from '../../../../collections/main/List';


export class MimeType implements Comparable<MimeType>, Equatable<MimeType> {
    protected static readonly PARAMETERS_DELIMITER: string = '; ';
    protected static readonly PARAMETER_DELIMITER: string = '=';
    protected static readonly ILLEGAL_CHARACTERS: string = '()<>@,;:\\"/[]?={} \t';
    protected static readonly CHARSET_PARAMETER_NAME: string = 'charset';

    public static readonly WILDCARD_TYPE: string = '*';
    public static readonly DEFINITIONS_DELIMITER: string = ', ';


    private _type: string;
    private _subType: string;
    private _charset: Encoding | undefined;
    private _parameters: ReadOnlyMap<string, string>;


    public get type(): string {
        return this._type;
    }


    public get subType(): string {
        return this._subType;
    }


    public get charset(): Encoding | undefined {
        return this._charset;
    }


    public get parameters(): ReadOnlyMap<string, string> {
        return this._parameters;
    }


    public get isConcrete(): boolean {
        return !this.isWildcardType && !this.isWildcardSubType;
    }


    public get isWildcardType(): boolean {
        return this.type === MimeType.WILDCARD_TYPE;
    }


    public get isWildcardSubType(): boolean {
        return this.subType === MimeType.WILDCARD_TYPE || this.subType.startsWith('*+');
    }


    public constructor(
        type: string,
        subType: string = MimeType.WILDCARD_TYPE,
        charset?: Encoding,
        parameters?: ReadOnlyMap<string, string>
    ) {
        Assert.argument('type', type).notEmptyString();
        Assert.argument('subType', subType).notEmptyString();

        const normalizedParameters: Map<string, string> = new ListMap();

        if (parameters != null) {
            for (let {key, value} of parameters) {
                value = this.unquote(value);

                this.checkParameter(key, value);

                normalizedParameters.put(key, value);
            }
        }

        this._type = type.toLowerCase();
        this._subType = subType.toLowerCase();
        this._charset = charset;
        this._parameters = normalizedParameters;
    }


    public includes(other: MimeType): boolean {
        if (this.isWildcardType) {
            // */* includes anything
            return true;
        }

        if (this.type === other.type) {
            if (this.subType === other.subType) {
                return true;
            }

            if (this.isWildcardSubType) {
                // wildcard with suffix, e.g. application/*+xml
                let thisPlusIdx: number = this.subType.lastIndexOf('+');

                if (thisPlusIdx === -1) {
                    return true;
                }

                // application/*+xml includes application/soap+xml
                let otherPlusIdx: number = other.subType.lastIndexOf('+');

                if (otherPlusIdx !== -1) {
                    let thisSubtypeNoSuffix: string = this.subType.substring(0, thisPlusIdx);
                    let thisSubtypeSuffix: string = this.subType.substring(thisPlusIdx + 1);
                    let otherSubtypeSuffix: string = other.subType.substring(otherPlusIdx + 1);

                    if (thisSubtypeSuffix === otherSubtypeSuffix && MimeType.WILDCARD_TYPE === thisSubtypeNoSuffix) {
                        return true;
                    }
                }

            }
        }

        return false;
    }


    public isCompatibleWith(other: MimeType): boolean {
        if (this.isWildcardType || other.isWildcardType) {
            return true;
        } else if (this.type === other.type) {
            if (this.subType === other.subType) {
                return true;
            }

            // wildcard with suffix? e.g. application/*+xml
            if (this.isWildcardSubType || other.isWildcardSubType) {
                let thisPlusIdx = this.subType.lastIndexOf('+');
                let otherPlusIdx = other.subType.lastIndexOf('+');

                if (thisPlusIdx === -1 && otherPlusIdx === -1) {
                    return true;
                } else if (thisPlusIdx !== -1 && otherPlusIdx !== -1) {
                    let thisSubtypeNoSuffix: string = this.subType.substring(0, thisPlusIdx);
                    let otherSubtypeNoSuffix: string = other.subType.substring(0, otherPlusIdx);

                    let thisSubtypeSuffix: string = this.subType.substring(thisPlusIdx + 1);
                    let otherSubtypeSuffix: string = other.subType.substring(otherPlusIdx + 1);

                    if (thisSubtypeSuffix === otherSubtypeSuffix &&
                        (MimeType.WILDCARD_TYPE === thisSubtypeNoSuffix || MimeType.WILDCARD_TYPE === otherSubtypeNoSuffix)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }


    public getParameter(name: string): string | undefined {
        return this._parameters.get(name);
    }


    public equals(other: MimeType): boolean {
        if (this === other) {
            return true;
        }

        return this.type === other.type && this.subType === other.subType && this.parametersAreEqual(other);
    }


    public compareTo(other: MimeType): ComparisonResult {
        let comp: ComparisonResult = IgnoreCaseComparator.instance.compare(this.type, other.type);

        if (comp !== ComparisonResult.Equals) {
            return comp;
        }

        comp = IgnoreCaseComparator.instance.compare(this.subType, other.subType);

        if (comp !== ComparisonResult.Equals) {
            return comp;
        }

        comp = this.parameters.length - other.parameters.length;

        if (comp !== ComparisonResult.Equals) {
            return comp;
        }

        let thisAttributes: List<string> = new ArrayList(this.parameters.keys).distinct(IgnoreCaseComparator.instance);
        let otherAttributes: List<string> = new ArrayList(other.parameters.keys).distinct(IgnoreCaseComparator.instance);

        for (let index = 0; index < thisAttributes.length; index++) {
            let thisAttribute: string = thisAttributes.getAt(index);
            let otherAttribute: string = otherAttributes.getAt(index);

            comp = IgnoreCaseComparator.instance.compare(thisAttribute, otherAttribute);

            if (comp !== ComparisonResult.Equals) {
                return comp;
            }

            let thisValue: string = this.parameters.get(thisAttribute) as string;
            let otherValue: string | undefined = other.parameters.get(otherAttribute);

            if (otherValue == null) {
                otherValue = '';
            }

            comp = PreserveCaseComparator.instance.compare(thisValue, otherValue);

            if (comp !== ComparisonResult.Equals) {
                return comp;
            }
        }

        return ComparisonResult.Equals;
    }


    public toString(): string {
        const builder = new StringBuilder();

        this.appendTo(builder);

        return builder.toString();
    }


    public appendTo(builder: StringBuilder): void {
        builder.append(`${this.type}/${this.subType}`);

        for (let parameter of this.parameters) {
            builder.append(`${MimeType.PARAMETERS_DELIMITER}${parameter.key}${MimeType.PARAMETER_DELIMITER}${parameter.value}`);
        }
    }


    protected checkParameter(key: string, value: string): void {
        Assert.argument(`parameters[${key}].key`, key).notEmptyString();
        Assert.argument(`parameters[${key}].value`, value).notEmptyString();

        this.checkToken(`parameters[${key}].key`, key);
        this.checkToken(`parameters[${key}].value`, value);
    }


    protected unquote(s: string): string {
        return this.isQuotedString(s) ? s.substring(1, s.length - 1) : s;
    }


    private checkToken(argumentName: string, token: string): void {
        for (let i = 0; i < token.length; i++) {
            let ch: string = token.charAt(i);

            if (!MimeType.ILLEGAL_CHARACTERS.includes(ch)) {
                throw new InvalidArgumentException(argumentName, `Invalid token character "${ch}" in token "${token}"`);
            }
        }
    }


    private isQuotedString(s: string): boolean {
        if (s.length < 2) {
            return false;
        } else {
            return (s.startsWith('"') && s.endsWith('"')) || (s.startsWith('\'') && s.endsWith('\''));
        }
    }


    private parametersAreEqual(other: MimeType): boolean {
        if (this.parameters.length !== other.parameters.length) {
            return false;
        }

        for (let key of this.parameters.keys) {
            if (!other.parameters.containsKey(key)) {
                return false;
            }

            if (MimeType.CHARSET_PARAMETER_NAME === key) {
                if (this.charset !== other.charset) {
                    return false;
                }
            } else if (this.parameters.get(key) !== other.parameters.get(key)) {
                return false;
            }
        }

        return true;
    }
}
