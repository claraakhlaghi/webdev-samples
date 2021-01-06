
/*
(C) 2020 SDBagel | sdbagel.com | MIT License
oak is licensed under MIT. https://github.com/oakserver/oak
https://mit-license.org

** About this Sample:
Jamming all your code logic and server handling
in one file isn't the best - especially as you
start building bigger and bigger apps - so let's
look at how we can split up some of the code.

** Additional Information
https://github.com/oakserver/oak
The README of the oak GitHub repository is
super fantastic in showing exactly what it
can do. Highly recommended extra reading.

** Recommended Concepts:
What is MVC and how is it used across the web?
How can we define code across multiple files?

** How to Run:
deno run --allow-net main.ts
Allow network access for the server.
*/

// Import the oak objects we need.
import { Application, Router } from 'https://deno.land/x/oak@v6.4.1/mod.ts';

// Note how we can also import files from our own computer.
// Here, we import an API Controller that we made, a file
// that handles all routing of our API. This makes sections
// of our app clearly defined and easily readable.
import { ApiController } from './controllers/api.controller.ts';

// Let's also import a global data handling service for our app.
import { DataService } from './services/data.service.ts';

// Even though we imported it, we still need to make a new
// instance of the service and controller to use it.
const dataService = new DataService();
// Note how we pass in the data service, rather than letting
// each controller create it's own instance of one. In more
// complex code, this would use Dependency Injection (DI) and
// be done automatically, but this is similar to that.
// DI prevents potential side effects from having multiple instances.
const api = new ApiController(dataService);

// Let's make a new Router to help us sort requests.
const router = new Router();
// Just like before, we use .get and .post for routes.
// However, instead of a context lambda, we can pass
// in our methods from our controller directly.
router
  .get('/api/weather', api.getWeather)
  .post('/api/weather', api.postWeather)

// Optional Task: if you need more practice with routing
// or serving files in oak, try adding a new controller
// that serves a basic title page and about page.

// Now, we create the server and give it our routes like before.
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

// Lastly, we tell the server to start accepting connections.
console.log('http://localhost:8000');
await app.listen({ port: 8000 });


