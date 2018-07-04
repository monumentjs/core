import {FileSystemEntry} from '@monument/node/main/file-system/FileSystemEntry';
import {File} from '@monument/node/main/file-system/File';
import {PackageLayout} from '@monument/project/main/layout/PackageLayout';
import {Component} from '@monument/core/main/stereotype/Component';
import {IgnoreCaseComparator} from '@monument/core/main/text/IgnoreCaseComparator';
import {FileSystemEntryFilter} from '@monument/node/main/file-system/filter/FileSystemEntryFilter';


@Component
export class TestFileFilter implements FileSystemEntryFilter {
    private readonly _packageLayout: PackageLayout;
    private readonly _extensionComparator: IgnoreCaseComparator;


    public constructor(packageLayout: PackageLayout, extensionComparator: IgnoreCaseComparator) {
        this._packageLayout = packageLayout;
        this._extensionComparator = extensionComparator;
    }


    public async decide(entry: FileSystemEntry): Promise<boolean> {
        const fileExtension: string = entry.path.extension;
        const className: string = entry.path.baseNameWithoutExtension;
        const testFileNameSuffix: string = this._packageLayout.testFileNameSuffix;
        const executableFileExtension: string = this._packageLayout.executableFileExtension;
        const isFile: boolean = entry instanceof File;
        const hasNameSuffix: boolean = className.endsWith(testFileNameSuffix);
        const hasExtension: boolean = this._extensionComparator.equals(fileExtension, executableFileExtension);

        return isFile && hasNameSuffix && hasExtension;
    }
}
