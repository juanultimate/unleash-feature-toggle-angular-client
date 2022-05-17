export default interface StorageProvider {
  save: (name: string, data: any) => Promise<void>;
  get: (name: string) => Promise<any>;
}
