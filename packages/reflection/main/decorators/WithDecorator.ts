import {Decorator} from '../Decorator';


class WithDecoratorDecorator extends Decorator {

    protected onClass(): void {
        // Stub
    }


    protected onMethod(): void {
        // Stub
    }


    protected onField(): void {
        // Stub
    }


    protected onProperty(): void {
        // Stub
    }


    protected onMethodParameter(): void {
        // Stub
    }


    protected onConstructorParameter(): void {
        // Stub
    }
}


export function WithDecorator(decorator: Function) {
    return function (...args: any[]) {
        new WithDecoratorDecorator(decorator).apply(args);
    };
}
