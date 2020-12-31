
/*
(C) 2020 SDBagel | sdbagel.com | MIT License
Deno samples included are also licensed under MIT.
https://mit-license.org

** About this Sample:
A basic implementation of a server and API in Deno
Has a default "Hello World" route. Explore adding
different "routes" and actions to this server.

** Recommended Concepts:
What is a backend, and what does it do?
What can use a backend, and when?
How do applications interface with servers?

** How to Run:
deno run --allow-net main.ts
(Allows network access to host the server)
*/

// Start by 'importing' a function called serve.
// This is just saying that we want to use this later, like "import" in Java.
// Deno grabs this function from the internet using this URL:
import { serve } from "https://deno.land/std@0.83.0/http/server.ts";

// Lets make a new server by calling the 'serve' function and
// storing the value it returns in a variable called 'server'.
// We're hosting this on port 8000. It's how we access the server.
const server = serve({ port: 8000 });

// Using console.log is just like in the browser's console,
// except this time it logs to our terminal window.
// localhost:8000 is like google.com, it's a URL pointing to our server.
console.log("Server active on: http://localhost:8000/");

// Now that we have the server, we need to do something with
// the incoming requests. This loop processes every request 'req'
// that comes in, and will process it using the code inside.
for await (const req of server) {
  // Lets get the URL the user requested and log it.
  console.log(req.url);

  // This is the default response of "Hello World".
  // No matter what URL we access, it responds with this.
  // Let's remove this and swap it out for something else.
  req.respond({ body: "Hello World\n" });

  // TASK: Now that you know how to get the
  // request's URL, and how to get a response to the user,
  // make the following actions happen:

  // 1. When the user goes to the "/" (called index, home, or root)
  // return the string: "Hello from root!"

  // 2. When the user goes to the "/data" route,
  // return the string: "It's {RANDOM NUMBER} degrees here right now."

  // 3. If the user goes to neither of these, give that
  // classic "404 not found" error. Bonus points if
  // you figure out the proper way to do it!
  // (Hint: You need to send the response code, not just the string.)

  // Want to check your answers? See the completed sample.
}
