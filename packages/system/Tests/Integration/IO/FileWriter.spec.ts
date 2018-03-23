import {FileWriter} from '../../..//FileSystem/FileWriter';
import {FileSystem} from '../../..//FileSystem/LocalFileSystem';
import {UnitFactory} from '@monument/core/Source/DI/Unit/UnitFactory';
import {IUnitFactory} from '@monument/core/Source/DI/Unit/Abstraction/IUnitFactory';
import {FileStorage} from '../../..//FileSystem/IFileStorage';


describe(`FileWriter`, () => {
    const unitFactory: IUnitFactory = new UnitFactory();
    const storage: FileStorage = unitFactory.getUnit(FileSystem);


    test(`creating of new file writer`, async () => {
        const textFileName: string = __dirname + '/Samples/TextFileOutput.txt';

        if (await storage.fileExists(textFileName)) {
            await storage.removeFile(textFileName);
        }

        await expect(storage.fileExists(textFileName)).resolves.toBe(false);

        const reader: FileWriter = new FileWriter(textFileName);

        expect(reader.bytesWritten).toBe(0);
        expect(reader.path.toString()).toEqual(textFileName);
        expect(reader.isWritable).toBe(true);
        expect(reader.isFinished).toBe(false);
        expect(reader.isClosed).toBe(false);
        expect(reader.isDisposed).toBe(false);

        await reader.close();

        await expect(storage.fileExists(textFileName)).resolves.toBe(true);

        if (await storage.fileExists(textFileName)) {
            await storage.removeFile(textFileName);
        }

        await expect(storage.fileExists(textFileName)).resolves.toBe(false);
    });
});
