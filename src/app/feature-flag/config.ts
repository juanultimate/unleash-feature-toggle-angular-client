import StorageProvider from './storage-provider';

interface StaticContext {
  appName: string;
  environment?: string;
}

interface MutableContext {
  userId?: string;
  sessionId?: string;
  remoteAddress?: string;
  properties?: { [key: string]: string };
}

type Context = StaticContext & MutableContext;

interface Config extends StaticContext {
  url: string;
  clientKey: string;
  disableRefresh?: boolean;
  refreshInterval?: number;
  metricsInterval?: number;
  disableMetrics?: boolean;
  storageProvider?: StorageProvider;
  context?: MutableContext;
  bootstrap?: Toggle[];
  bootstrapOverride?: boolean;
  headerName?: string;
}

interface Variant {
  name: string;
  payload?: {
    type: string;
    value: string;
  };
}

interface Toggle {
  name: string;
  enabled: boolean;
  variant: Variant;
}

export { StaticContext, MutableContext, Context, Config, Variant, Toggle };
