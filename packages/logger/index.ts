// Export public API

export * from './src/core/Level';
export * from './src/core/LogAction';
export * from './src/core/LogEvent';
export * from './src/core/Logger';
export * from './src/core/LoggerManager';

export * from './src/filter/FilterDecision';

export * from './src/filter/MatchingFilter';
export * from './src/filter/ThresholdFilter';
export * from './src/filter/NameFilter';
export * from './src/filter/TagFilter';

export * from './src/transport/TransportBase';
export * from './src/transport/TransportMediator';
export * from './src/transport/console/ConsoleTransport';
export * from './src/transport/testing/LogEventHistory';

// backward compatibility
export { LoggingConfiguration, Filter, Transport, ConsoleLayout  } from '@monument/contracts';
