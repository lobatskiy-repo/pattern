import { GetCapitalServiceInterface } from "./getCapitalServicesIntrface";
import { CacheInterface, LoggerInterface } from "./Inteface";
import { CapitalServiceWithLogger } from "./sercives/CapitalServiceWithLogger";
import { GetCapitalServices } from "./sercives/getCapitalServices";

class GetCapitalCommand {
  constructor(private service: GetCapitalServiceInterface) {}

  async execute(country: string): Promise<void> {
    try {
      const capital = await this.service.getCapital(country);

      if (capital) {
        console.log(`The capital of ${country} is ${capital}`);
      } else {
        console.log(`Capital not found for ${country}`);
      }
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  }
}

class ConsoleLogger implements LoggerInterface {
  log(message: string): void {
    console.log(message);
  }
}

class SimpleCache implements CacheInterface {
  private cache: Record<string, string> = {};

  get(key: string): string | null {
    return this.cache[key] || null;
  }

  set(key: string, value: string): void {
    this.cache[key] = value;
  }
}

// Usage example
const baseService = new GetCapitalServices();
const logger = new ConsoleLogger();
const cache = new SimpleCache();

// Decorating the base service with logger and cache
const cachedService = new CapitalServiceWithLogger(baseService, logger);
const loggedAndCachedService = new CapitalServiceWithLogger(
  cachedService,
  cache
);

// Using the final decorated service in the command
const command = new GetCapitalCommand(loggedAndCachedService);

command.execute("France");
