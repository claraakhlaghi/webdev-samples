
/*
(C) 2020 SDBagel | sdbagel.com | MIT License
oak is licensed under MIT. https://github.com/oakserver/oak
https://mit-license.org

!! This is the completed sample !!
This is the completed sample with reduced comments.
For explanations or the original tasks, see
the other files in this folder.

** How to Run:
deno run --allow-net main.slim.ts
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
  .get("/", (context) => {
    // Set this return type to HTML and return index content
    context.response.type = "text/html";
    context.response.body = "<h1>Served with Oak.</h1><p>Neat!</p>";
  })
  .post("/data", async (context) => {
    const body = context.request.body();

    // Get JSON value (or, if invalid, discard the request)
    let value: any;
    if (body.type === "json")
      value = await body.value;
    else {
      context.response.status = 400;
      return;
    }

    // Push and log data
    fruitCollection.push(value);
    console.log(`Added: ${value}`);
    console.log(fruitCollection);

    // Respond that everything is OK (200)
    context.response.status = 200;
    context.response.body = "OK";
  })
  .get("/data", (context) => {
    // Return fruitCollection as a JSON
    context.response.type = "application/json";
    context.response.body = fruitCollection;
  });

// Create the application with routes
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
console.log("http://localhost:8000");
await app.listen({ port: 8000 });


