import {Enumerable} from '../../../Core/Collections/Enumerable';
import {Option} from './Option';


export class OptionsCollection extends Enumerable<Option> {

    public contains(key: string): boolean {
        for (let option of this) {
            if (option.key === key) {
                return true;
            }
        }

        return false;
    }

    
    public find(key: string): Option {
        for (let option of this) {
            if (option.key === key) {
                return option;
            }
        }

        return null;
    }

    
    public findAll(key: string): OptionsCollection {
        let options: Option[] = [];

        for (let option of this) {
            if (option.key === key) {
                options.push(option);
            }
        }
        
        return new OptionsCollection(options);
    }


    public getValue(key: string): string|boolean {
        let option: Option = this.find(key);

        if (option == null) {
            return null;
        }

        return option.value;
    }
}
