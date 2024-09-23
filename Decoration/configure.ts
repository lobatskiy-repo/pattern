import fetch from 'node-fetch';

class GetCapitalCommand {
  private static API_URL: string = 'https://restcountries.com/v3.1/name/';

  constructor() {
    // Add arguments configuration here if needed
  }

  async execute(country: string): Promise<void> {
    const url = `${GetCapitalCommand.API_URL}${encodeURIComponent(country)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const capital = data[0]?.capital?.[0];

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

// Usage example
const command = new GetCapitalCommand();
command.execute('France');
