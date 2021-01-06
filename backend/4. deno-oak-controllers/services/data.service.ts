
// This file is already completed. There are no
// tasks here, but feel free to look at it to
// see how the data service works. This data
// service abstracts storage for other parts of
// this app and code.

export class DataService {
  // Declare a private in-memory dictionary.
  // Used as our 'database' since backend is
  // advised to be covered before databases.
  private data: { [id: string]: string } = {};

  constructor() {}

  // Store a key-value pair.
  store(key: string, value: string): void {
    this.data[key] = value;
  }

  // Retrieve a value from a key.
  get(key: string): string|undefined {
    return this.data[key];
  }

}