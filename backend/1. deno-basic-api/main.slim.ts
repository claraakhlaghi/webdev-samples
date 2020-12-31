
/*
(C) 2020 SDBagel | sdbagel.com | MIT License
Deno samples included are also licensed under MIT.
https://mit-license.org

!! This is the completed sample !!
This is the completed sample without comments.
For explanations or the original tasks, see
the other files in this folder.

** How to Run:
deno run --allow-net main.slim.ts
*/

import { serve } from "https://deno.land/std@0.83.0/http/server.ts";

const server = serve({ port: 8000 });
console.log("Server active on: http://localhost:8000/");

for await (const req of server) {
  console.log(req.url);

  switch (req.url) {
    case "/":
      req.respond({ body: "Hello from root!" });
      continue;

    case "/data":
      const randomNumber = Math.random()*100;
      req.respond({ body: `It's ${randomNumber} degrees here right now.` });
      continue;

    default:
      req.respond({ status: 404, body: "Not found!" });
      console.log(`Couldn't find route: ${req.url}`);
  }
}
