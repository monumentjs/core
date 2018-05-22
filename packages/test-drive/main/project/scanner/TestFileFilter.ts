import {IgnoreCaseComparator} from '@monument/core/main/IgnoreCaseComparator';
import {Component} from '@monument/stereotype/main/Component';
import {FileSystemEntryFilter} from '@monument/node/main/file-system/walker/FileSystemEntryFilter';
import {FileSystemEntry} from '@monument/node/main/file-system/FileSystemEntry';
import {File} from '@monument/node/main/file-system/File';
import {PackageLayout} from '@monument/project/main/layout/PackageLayout';


@Component
export class TestFileFilter implements FileSystemEntryFilter {
    private readonly _extensionComparator: IgnoreCaseComparator = IgnoreCaseComparator.instance;
    private readonly _packageLayout: PackageLayout;


    public constructor(packageLayout: PackageLayout) {
        this._packageLayout = packageLayout;
    }


    public async decide(entry: FileSystemEntry): Promise<boolean> {
        const fileExtension: string = entry.path.extension;
        const className: string = entry.path.baseNameWithoutExtension;
        const {testFileNameSuffix, testFileExtension} = this._packageLayout;
        const isFile: boolean = entry instanceof File;
        const hasNameSuffix: boolean = className.endsWith(testFileNameSuffix);
        const hasExtension: boolean = this._extensionComparator.equals(fileExtension, testFileExtension);

        return isFile && hasNameSuffix && hasExtension;
    }
}
