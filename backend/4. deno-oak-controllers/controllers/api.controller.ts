
// 'Import type' means that only the type, not actual
// object is imported. Prevents bulky code at runtime.
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html
import type { DataService } from '../services/data.service.ts';
import { WeatherService } from "../services/weather.service.ts";

// We make a new class called ApiController. This
// contains all our routes for our app's API.

// Convention means all routes here start with "/api/...".
export class ApiController {
  // This controller needs a weather service.
  private weather: WeatherService;

  // Just like in other languages, like JS or Java,
  // we can make a constructor to insert dependencies.
  constructor(data: DataService) {
    this.weather = new WeatherService(data);
  }

  // A "Get Weather" method. Note how we declare this
  // as a constant set to an async lambda expression -
  // a normal function won't work with oak routing.
  getWeather = async ({response}: {response: any}) => {
    // TASK: This is just some placeholder data! Let's 
    // ake it return the data from our weather store. 
    // Hint: Do the tasks in the weather service first.
    response.body = { message: 'The weather here is great.' };
    response.status = 200;
  }

  // A "Post Weather" method. This coule be a method for
  // getting new weather data from base stations located
  // in different places, for example.
  postWeather = async ({request, response}: {request: any; response: any}) => {
    // Get the body of the request.
    const body = await request.body();
    const newWeatherData = await body.value;

    // TASK: Process and store newWeatherData into
    // Hint: use 'this.weather' and your completed
    // weather service and methods!
    
    // Post requests still need a response!
    response.body = { message: 'OK' };
    response.status = 200;
  }

}