

export interface IApplicationConfiguration {
    readonly applicationId: number;
    readonly applicationName: string;

    /**
     * @throws {InvalidConfigurationException} If application context have not passed validation.
     */
    checkValidity(): void;
}
