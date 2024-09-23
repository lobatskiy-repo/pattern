import { LoggerInterface, GetCapitalServiceInterface } from "../Inteface";

export class CapitalServiceWithLogger implements GetCapitalServiceInterface {
  constructor(
    private service: GetCapitalServiceInterface,
    private logger: LoggerInterface
  ) {}

  async getCapital(country: string) {
    try {
      const capital = await this.service.getCapital(country);

      if (capital) {
        this.logger.log(`The capital of ${country} is ${capital}`);
      } else {
        this.logger.log(`Capital not found for ${country}`);
      }

      return capital;
    } catch (error) {
      this.logger.log(`Error fetching data: ${error.message}`);
      return "";
    }
  }
}
