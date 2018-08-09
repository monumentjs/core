

export interface LoginFormProps {
    readonly email: string;
    readonly password: string;

    readonly processing: boolean;

    setEmail(value: string): void;

    setPassword(value: string): void;

    submit(): void;
}
