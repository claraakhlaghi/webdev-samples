
// Let's also make a weather service.
// Services don't serve the user directly,
// but are used by the rest of our code.

// The weather service needs to get data from
// the app's data store. We only need the type,
// not the object itself, so we use 'import type'.
import type { DataService } from "./data.service.ts";

export class WeatherService {

  // This is an inline declaration inside the
  // constructor. This means 'data' can be used
  // like a property even though it's a parameter
  // in the constructor.
  constructor(private data: DataService) {}

  // TASK: Use the injected data service to create
  // a service that can GET and SET the weather for
  // a particular location, including temperature.
  // Upon 'getting' weather info, a JSON object should
  // be returned with place name and temperature.
  getWeather(placeName: string) {
    return this.data.get(placeName);
  }
  
  setWeather(placeName: string, temperature: string) {
    this.data.store(placeName, temperature); //name: varname
  }
  // HINT: Use `this.data` to access the data service.
  // HINT: A JSON object looks like { ... }. Properties
  // can go in it like a dictionary in other languages.
  // Use the methods JSON.stringify(obj) and JSON.parse(str).

}