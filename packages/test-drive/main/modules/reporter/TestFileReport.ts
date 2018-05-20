import {JSONSerializable} from '@monument/core/main/JSONSerializable';
import {SerializedTestReport} from './SerializedTestReport';


export class TestFileReport implements JSONSerializable<SerializedTestReport> {
    public static fromJSON(json: SerializedTestReport): TestFileReport {
        return new TestFileReport(
            json.testFilePath,
            json.testClassName,
            json.duration
        );
    }


    public readonly testFilePath: string;
    public readonly testClassName: string;
    public readonly duration: number;


    public constructor(testFilePath: string, testClassName: string, duration: number) {
        this.testFilePath = testFilePath;
        this.testClassName = testClassName;
        this.duration = duration;
    }


    public toJSON(): SerializedTestReport {
        return this;
    }
}
