
/*
(C) 2020 SDBagel | sdbagel.com | MIT License
oak is licensed under MIT. https://github.com/oakserver/oak
https://mit-license.org

!! This is the completed sample !!
The tasks are completed with explanations so 
you can see one correct implementation.

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
deno run --allow-net main.completed.ts
Allow network access for the server.
*/

// Import the oak application and router for use.
import { Application, Router } from "https://deno.land/x/oak@v6.4.1/mod.ts";

// An array of "Fruit" objects (the data to be modified and retrieved).
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

// Define a new router with our routes
const router = new Router();
router
  // Only activates on an HTTP GET request
  .get("/", (context) => {
    // Set this return type to HTML and return index content
    context.response.type = "text/html";
    context.response.body = "<h1>Served with Oak.</h1><p>Neat!</p>";
  })
  // Only activates on an HTTP POST request
  .post("/data", async (context) => {
    // Get data from request body
    const body = context.request.body();

    // Get JSON value (or, if invalid, discard the request)
    let value: any;
    if (body.type === "json")
      value = await body.value;
    else {
      context.response.status = 400; // 400 = Bad Request
      return;
    }

    // TASK 1: Add the new data to our 'fruits' collection.
    // Assume the data is well-formed and correct.

    // It's as easy as that! JS arrays are flexible and not
    // as rigid as Java arrays. We just use the push function
    // to add the well-formed value to the end of the array.
    // If we wanted to add it to the front, we can use .unshift(val).
    fruitCollection.push(value);
    // We can also log the values just to be sure.
    console.log(`Added: ${value}`);
    console.log(fruitCollection);

  })
  // TASK 2: Make a GET route on "/data" to return the fruits we have.
  // We use the .get function and pass in the route name and function
  // to make a new API endpoint for our app. Remember, this works
  // because of functional programming.
  .get("/data", (context) => {
    // Technically, you can get away with just the second line here.
    // However, to be extra-sure in case our client cares, we also
    // set the response type to JSON or JavaScript Object Notation.
    context.response.type = "application/json";
    // And this is perfectly acceptable!
    context.response.body = fruitCollection;

    // ** As a side note, oak actually can set the response type
    // automatically. However, in some cases, especially where it
    // gets super hectic I recommend writing it out manually
    // especially if you know what the type is supposed to be beforehand.
    // It makes the code easier to read, and easier to debug later.
  });

// Now, we create the oak Application, or our server.
const app = new Application();
// We tell the application to use our routes above.
app.use(router.routes());
// We also tell it to respect the allowed methods (GET, POST, etc).
app.use(router.allowedMethods());

// Lastly, we tell the server to start accepting connections.
console.log("http://localhost:8000");
await app.listen({ port: 8000 });


