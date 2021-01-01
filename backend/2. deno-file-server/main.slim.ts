
/*
(C) 2020 SDBagel | sdbagel.com | MIT License
Deno samples included are also licensed under MIT.
https://mit-license.org

!! This is the completed sample !!
This is the completed sample with reduced comments.
For explanations or the original tasks, see
the other files in this folder.

** How to Run:
deno run --allow-net --allow-read=app --unstable main.slim.ts
Allow network and file read access to the "app" folder.
Some parts of Deno we use are also unstable, so we allow that.
*/

import { serve } from "https://deno.land/std@0.83.0/http/server.ts";
import { exists } from "https://deno.land/std@0.83.0/fs/mod.ts";

const server = serve({ port: 8000 });
console.log("Server active at: http://localhost:8000/index.html");

for await (const req of server) {
  console.log(req.url);

  switch (req.url) {
    // Custom data endpoint.
    case "/data":
      req.respond({ body: "{data: 'my custom data'}" });
      continue;

    // Redirect "/" to the index.html file.
    case "/":
      req.url = "/index.html";

    default:
      // Ensure only app folder is accessed
      const path = `app${req.url}`;

      // 404 if file does not exist / invalid path
      if (!exists(path) || path.indexOf('.') === -1) {
        req.respond({ status: 404, body: "Not found!" });
        continue;
      }

      // Read file and respond
      const fileData = await Deno.readFile(path);
      req.respond({
        status: 200,
        body: fileData,
        headers: new Headers({ "Content-Type": contentType(path) })
      });

  }
}

/* Returns the content-type based on the extension of a path. 
Modified from Deno Standard Library file server example. */
function contentType(path: string): string {
  const MEDIA_TYPES: Record<string, string> = {
    "html": "text/html",
    "txt": "text/plain",
    "js": "application/javascript",
    "css": "text/css",
    "png": "image/png",
    "ico": "image/x-icon"
  };

  return MEDIA_TYPES[path.split('.').pop() ?? "txt"];
}