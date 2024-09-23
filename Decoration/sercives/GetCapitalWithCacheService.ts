import { CacheInterface, GetCapitalServiceInterface } from "../Inteface";
import { GetCapitalServices } from "./getCapitalServices";

export class GetCapitalWithCacheService implements GetCapitalServiceInterface {
  constructor(
    private service: GetCapitalServiceInterface,
    private cache: CacheInterface
  ) {}

  async getCapital(country: string) {
    const cachedCapital = this.cache.get(country);
    if (cachedCapital) {
      console.log(`Returning cached capital for ${country}`);
      return cachedCapital;
    }

    const capital = await this.service.getCapital(country);
    if (capital) {
      this.cache.set(country, capital);
    }
    return capital;
  }
}
