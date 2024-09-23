export interface LoggerInterface {
  log(message: string): void;
}

export interface CacheInterface {
  get(key: string): string | null;
  set(key: string, value: string): void;
}

export interface GetCapitalServiceInterface {
  getCapital(country: string): Promise<string | null>;
}
