import { GetCapitalServiceInterface } from "./../Inteface";

export class GetCapitalServices implements GetCapitalServiceInterface {
  private URL_API: string = "https://restcountries.com/v3.1/name/";

  public async getCapital(country: string): Promise<string> {
    const response = await fetch(this.URL_API + encodeURIComponent(country));
    const data = await response.json();
    const capital = data[0]?.capital?.[0];
    return capital;
  }
}
