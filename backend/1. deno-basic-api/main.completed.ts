
/*
(C) 2020 SDBagel | sdbagel.com | MIT License
Deno samples included are also licensed under MIT.
https://mit-license.org

!! This is the completed sample !!
The tasks are completed with explanations so 
you can see one correct implementation.

** Recommended Concepts:
What is a backend, and what does it do?
What can use a backend, and when?
How do applications interface with servers?

** How to Run:
deno run --allow-net main.completed.ts
(Allows network access to host the server)
*/

// Import serve function from Deno standard library
import { serve } from "https://deno.land/std@0.83.0/http/server.ts";

// Make a new server on port 8000.
const server = serve({ port: 8000 });
console.log("Server active on: http://localhost:8000/");

// Process each request that we get from clients.
for await (const req of server) {
  console.log(req.url);

  // This is the default response of "Hello World".
  // Since we can't respond multiple times, we remove this.
  //req.respond({ body: "Hello World\n" });

  // Let's use a switch statement to process our route.
  switch (req.url) {
    // 1. "/" - return: "Hello from root!"
    case "/":
      // Using the "Hello World" example from above, we return the string.
      req.respond({ body: "Hello from root!" });
      // We don't want the case to fall through, and we're in a loop so
      // we can't return/break without shutting down the loop (and the server).
      // Therefore, we use the "continue" keyword to continue the loop.
      continue;

    // 2. "/data" - return: "It's {RANDOM NUMBER} degrees here right now."
    case "/data":
      // We can use the random function to get a random number.
      // This shows that we can execute "normal" JS/TS in here.
      const randomNumber = Math.random()*100;
      // Let's respond with a template literal string (string formatting).
      req.respond({ body: `It's ${randomNumber} degrees here right now.` });
      continue;

    // 3. If none of these, return a 404 error.
    default:
      // We can use a property in the response object called "status".
      // The number we pass in is the "status code" - where the number
      // 404 comes from! There are also lots of other ones that each
      // have their own meaning, redirecting the user, giving content, etc.
      req.respond({ status: 404, body: "Not found!" });
      // Let's also log it to our server so we can see what went wrong.
      console.log(`Couldn't find route: ${req.url}`);
  }
}
