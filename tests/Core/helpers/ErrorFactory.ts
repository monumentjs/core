
export default {
    createSimpleError(message: string = 'Test Error'): Error {
        return new Error(message);
    }
};
