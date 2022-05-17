type FlagEvent = 'initialized' | 'error' | 'ready' | 'update';

const FlagEvents = {
  Init: 'initialized',
  Error: 'error',
  Ready: 'ready',
  Update: 'update',
} as const;

export { FlagEvent, FlagEvents };
