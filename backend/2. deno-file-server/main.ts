
/*
(C) 2020 SDBagel | sdbagel.com | MIT License
Deno samples included are also licensed under MIT.
https://mit-license.org

** About this Sample:
Extends the base Deno HTTP server sample.
A basic implementation of a server and API in Deno
Explore serving different file types and data.

** Recommended Concepts:
How can we create a server that shows HTML, CSS, etc?
How can we serve complicated files like images?

** How to Run:
deno run --allow-net --allow-read=app --unstable main.ts
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
  // Log the request URL so we can see what's being accessed.
  console.log(req.url);
  // Append 'app' to url. Ensures only the app folder is accessed.
  const path = `app${req.url}`;

  // If the file does not exist, return a 404 and move on.
  // Also 404 if the path does not contain a period (like in .html)
  if (!exists(path) || path.indexOf('.') === -1) {
    req.respond({ status: 404, body: "Not found!" });
    continue;
  }

  // We use the Deno builtin 'readFile' function to get file data.
  // This returns the data in the form of bytes (not human readable).
  const fileData = await Deno.readFile(path);

  // Let's respond with this data.
  req.respond({
    // A status of 200 means "Okay, found it!"
    status: 200,
    // We can pass in the bytes without converting it
    // such that it's human readable, because...
    body: fileData,
    // we specify a "Content-Type" header. This tells
    // the browser what kind of file it is - for example,
    // it will convert HTML files into text but will leave
    // images as bytes so it can display them properly.
    headers: new Headers({ "Content-Type": contentType(path) })
  });

  // TASK: See if you can use the things we learned from our
  // deno-basic-api example to improve upon this server.

  // 1. Right now, you have to type in index.html, navigating
  // directly to localhost:8000 doesn't work. This is because
  // the app tries to find a file without a name ("/").
  // See if you can make it so that "/" returns the index.html.

  // 2. What if you wanted to get some data from an API like in
  // our previous sample? It would be a hassle to manage multiple
  // servers. Try and add a "/data" endpoint that returns a string.

}

/* Returns the content-type based on the extension of a path. 
Modified from Deno Standard Library file server example. */
function contentType(path: string): string {
  // Common media types (MIME types) for files.
  // These tell the browser what kind of file we sent to it.
  const MEDIA_TYPES: Record<string, string> = {
    "html": "text/html",
    "txt": "text/plain",
    "js": "application/javascript",
    "css": "text/css",
    "png": "image/png"
  };

  return MEDIA_TYPES[path.split('.').pop() ?? "txt"];
}