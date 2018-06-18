

export interface OutputStream<T> {
    /**
     * @throws {ClosedStreamException} when attempting to write to a closed stream.
     */
    write(chunk: T): Promise<void>;
}
