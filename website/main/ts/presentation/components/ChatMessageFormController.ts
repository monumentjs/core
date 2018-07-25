

export interface ChatMessageFormController {
    readonly message: string;

    submit(): Promise<void>;
    reset(): void;
}
