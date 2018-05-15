import {Type} from '@monument/core/main/Type';
import {StringBuilder} from '@monument/text/main/StringBuilder';


export class UnitRequest<T extends object> {
    public readonly parent: UnitRequest<object> | undefined;
    public readonly type: Type<T>;


    public constructor(type: Type<T>, parent?: UnitRequest<object>) {
        this.type = type;
        this.parent = parent;
    }


    public next<U extends object>(type: Type<U>): UnitRequest<U> {
        return new UnitRequest(type, this);
    }


    public toString(): string {
        const sb = new StringBuilder();

        let parent: UnitRequest<object> | undefined = this;
        let index: number = 0;

        while (parent != null) {
            if (index > 0) {
                sb.prepend(' < ');
            }

            sb.prepend(parent.type.name);

            parent = parent.parent;
            index++;
        }

        return sb.toString();
    }
}
