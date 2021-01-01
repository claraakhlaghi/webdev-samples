
/*
(C) 2020 SDBagel | sdbagel.com | MIT License
Deno samples included are also licensed under MIT.
https://mit-license.org

!! This is the completed sample !!
The tasks are completed with explanations so 
you can see one correct implementation.

** Recommended Concepts:
How can we create a server that shows HTML, CSS, etc?
How can we serve complicated files like images?

** How to Run:
deno run --allow-net --allow-read=app --unstable main.completed.ts
Allow network and file read access to the "app" folder.
Some parts of Deno we use are also unstable, so we allow that.
*/

// Import serve (server) function
import { serve } from "https://deno.land/std@0.83.0/http/server.ts";
// Import exists from Deno file system, checks if a file exists
import { exists } from "https://deno.land/std@0.83.0/fs/mod.ts";

// Create a server on your computer (localhost) at port 8000.
const server = serve({ port: 8000 });
console.log("Server active at: http://localhost:8000/index.html");

for await (const req of server) {
  // Log path for debug purposes.
  console.log(req.url);

  // Again, let's use a switch statement to "route" our client.
  switch (req.url) {
    // There are actually some weird intricacies of JS/TS
    // meaning that we *have* to put the most specific route
    // first. In this case, it is "/data". This is because
    // of some weird behavior that means an exact match
    // isn't required to enter a case - so, to minimize
    // unexpected side effects, we reject as many cases as
    // possible before entering the general cases like "/".

    // Task 2: Create a custom data endpoint.
    case "/data":
      req.respond({ body: "{data: 'my custom data'}" });
      // We don't want this case to fall through
      // since we've already responded.
      continue;

    // Task 1: Redirect "/" to the index.html file.
    case "/":
      // In this case, we actually "rewrite" the path
      // to the file we're looking for to index.html.
      // We want this case to fall through to get picked
      // up by our file server code, since we didn't respond.
      req.url = "/index.html";

    default:
      // We put the file server code into the default.
      const path = `app${req.url}`;
      // If the file does not exist or invalid URL, move on.
      if (!exists(path) || path.indexOf('.') === -1) {
        req.respond({ status: 404, body: "Not found!" });
        continue;
      }
      // Get file data to send and send it.
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