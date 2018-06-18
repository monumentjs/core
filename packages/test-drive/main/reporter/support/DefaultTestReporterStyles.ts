import {Component} from '@monument/core/main/stereotype/Component';
import {Theme} from '@monument/terminal/main/design/Theme';
import {TextColor} from '@monument/terminal/main/design/TextColor';
import {TextStyle} from '@monument/terminal/main/design/TextStyle';
import {Rule} from '@monument/terminal/main/design/Rule';
import {TestStatus} from '../../report/TestStatus';


@Component
export class DefaultTestReporterStyles {
    private readonly _statusThemes = {
        [TestStatus.SKIPPED]: new Theme(TextColor.GRAY, TextStyle.BOLD),
        [TestStatus.PASSED]: new Theme(TextColor.GREEN, TextStyle.BOLD),
        [TestStatus.FAILED]: new Theme(TextColor.RED, TextStyle.BOLD)
    };


    public getStatusStyle(status: TestStatus): Rule {
        return this._statusThemes[status];
    }


    public get textStyle(): Rule {
        return new Theme(TextStyle.DIM);
    }


    public get durationStyle(): Rule {
        return new Theme(TextStyle.BOLD);
    }


    public get errorStyle() {
        return new Theme(TextColor.RED);
    }
}
