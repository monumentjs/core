export interface Lifecycle {
  readonly running: boolean;

  start(): void;

  stop(): void;
}
