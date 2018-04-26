import {PrimaryDecorator} from './PrimaryDecorator';


export function Primary(...args: any[]) {
    new PrimaryDecorator().apply(args);
}
