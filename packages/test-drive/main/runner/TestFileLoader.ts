import {Component} from '@monument/core/main/stereotype/Component';
import {ClassLoader} from '@monument/core/main/ClassLoader';
import {Type} from '@monument/core/main/Type';
import {Class} from '@monument/core/main/reflection/Class';
import {Path} from '@monument/node/main/path/Path';
import {TestFile} from '../object-model/TestFile';
import {TestClass} from '../object-model/TestClass';


@Component
export class TestFileLoader {
    private readonly _classLoader: ClassLoader;


    public constructor(classLoader: ClassLoader) {
        this._classLoader = classLoader;
    }


    public async load(path: Path): Promise<TestFile> {
        const location: string = path.toString();
        const name: string = path.baseNameWithoutExtension;
        const ctor: Type<object> = await this._classLoader.load(location, name);
        const klass: Class<object> = Class.of(ctor);
        const testClass: TestClass = new TestClass(klass);

        return new TestFile(path, testClass);
    }
}
