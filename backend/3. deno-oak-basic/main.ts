
/*
(C) 2020 SDBagel | sdbagel.com | MIT License
oak is licensed under MIT. https://github.com/oakserver/oak
https://mit-license.org

** About this Sample:
Now that you are more familiar with how to
build a server from "scratch" - without as
much abstraction, we can explore libraries
like oak which make concepts we've learned
including routing and API design easier.

** Additional Information
https://github.com/oakserver/oak
The README of the oak GitHub repository is
super fantastic in showing exactly what it
can do. Highly recommended extra reading.

** Recommended Concepts:
What is middleware, and how does it affect the server?
What are HTTP GET and POST requests?
How can abstractions help better organize code?

** How to Run:
deno run --allow-net main.ts
Allow network access for the server.
*/

// Like we imported the 'serve' function from Deno,
// we're importing the Oak Application (the entire server)
// as well as the Router which helps us route requests.
import { Application, Router } from "https://deno.land/x/oak@v6.4.1/mod.ts";

// An array of "Fruit" objects.
// We'll be building an API using this data.
// Think of this like an in-app database.
const fruitCollection = [
  {
    name: "Apple",
    quality: 5
  },
  {
    name: "Orange",
    quality: 3
  },
  {
    name: "Banana",
    quality: 9
  }
];

// Let's make a new Router to help us sort requests.
const router = new Router();
// We can use functional programming (chaining functions)
// to add different "routes" to our router. This is like
// adding cases in our switch statement in previous samples.
router
  // .get means this will only activate on an HTTP GET request.
  // Get requests are "getting" data, like when you load a page.
  .get("/", (context) => {
    // We can explicitly set the content-type of this
    // html string by setting the type property:
    context.response.type = "text/html";
    // You can also read and serve files like this,
    // but oak has a better way of doing it without
    // needing to specify every route.
    // https://github.com/oakserver/oak#static-content
    context.response.body = "<h1>Served with Oak.</h1><p>Neat!</p>";
  })
  // .post means this will only activate on an HTTP POST request.
  // Post requests are sent by the client, giving data to the server.
  // (Side note: we mark this function async so we can use 'await' inside.)
  .post("/data", async (context) => {
    // Data can be passsed to the server in several ways.
    // In this case, it's in the request body.
    const body = context.request.body();

    // Try and get the JSON (object) value from the body.
    // If it's not JSON, we don't care because it's invalid.
    let value: any;
    if (body.type === "json")
      value = await body.value;
    else return;

    // TASK 1: We've just recieved some new data passed to
    // our server, but we need to add it to our data collection.
    // Assume the data is correctly formed as a single fruit object.
    // Ex: value is { name: "Name", quality: 8 }

  })
  // TASK 2: We also want to get our data as a client, not just
  // upload it to the server. Make a GET route on "/data" to return
  // the entire collection of fruits we have.

// Now, we create the oak Application, or our server.
const app = new Application();
// We tell the application to use our routes above.
app.use(router.routes());
// We also tell it to respect the allowed methods (GET, POST, etc).
app.use(router.allowedMethods());

// Lastly, we tell the server to start accepting connections.
console.log("http://localhost:8000");
await app.listen({ port: 8000 });


