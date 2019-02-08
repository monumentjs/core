/* tslint:disable:prefer-const */
import { Builder, Cloneable, Disposable } from '../..';

{
    let builder!: Builder<string>;
    let build: () => string = builder.build;
}

{
    let cloneable!: Cloneable<string>;
    let clone: () => string = cloneable.clone;
}

{
    let disposable!: Disposable;
    let clone: () => void = disposable.dispose;
}

{
    let disposable!: Disposable<boolean>;
    let clone: () => boolean = disposable.dispose;
}
