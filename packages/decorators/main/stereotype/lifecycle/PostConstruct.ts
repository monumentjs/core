import {PostConstructDecorator} from './PostConstructDecorator';


export function PostConstruct(...args: any[]) {
    new PostConstructDecorator().apply(args);
}
