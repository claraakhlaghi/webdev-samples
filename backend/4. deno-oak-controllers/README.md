
# Oak, Controllers, and Services in Deno

This sample focuses on splitting up code into multiple files.

## TASKS:

- Finish the weather service! It should be able to get and set weather info (place name and temperature) using the app's data service, already provided to you.
- Using your weather service, plug it into the ApiController such that the proper information can be set and retrieved through the API.

## HINT:

- Passing the information from the weather service, to the ApiController, to the user accessing it from the browser is like writing "getters and setters" in other languages.

## TEST:

- Running the server will initially yield no data. Either hardcode data in `data.service.ts` by setting the private variable `data` to `{"LOCATION_NAME": "DATA"}` or use the `fetch` function in the browser.

## OPTIONAL:

- If you want extra practice with routing, serving files, or want to see how multiple controllers might look in an app, create a new controller called `home.controller.ts` with two new routes. One should return a home page for this weather app and the other should return an about page.

## Where are the completed/slim sample files?

On a completely arbitrary decision, I decided it might be better to let the student explore this sample on their own. During workshop time, I will be available to assist if needed, but the student should be able to complete this 'final sample' in this unit using previous skills and provided code.

Also there were a lot of files in this folder (for a small sample) already...