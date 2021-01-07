# webdev-samples
[![https://maintained.cc/SDBagel/webdev-samples/1](https://maintained.cc/SDBagel/webdev-samples/1)](https://maintained.cc/SDBagel/webdev-samples/1/redirect)
[![https://maintained.cc/SDBagel/webdev-samples/2](https://maintained.cc/SDBagel/webdev-samples/2)](https://maintained.cc/SDBagel/webdev-samples/2/redirect)

This repo includes samples for the web development workshop/course I host, organized into backend, database, and frontend subsections.

Each sample will include instructions in either a README or at the top of the code file. There are four samples per section and three sections to constitute twelve weeks of course material. Incomplete samples (excercises) and completed samples are included for applicable sections.

Found errors or inconsistencies? Please make a pull request or issue to this repository.

## Prior Knowledge
Basics of JavaScript or another object-oriented language like Python, Java, or C# is highly encouraged for all subsections. This includes declaring variables, knowledge of functions, and loops.

Knowing the top level of how websites work and users interact with servers can also be helpful in understanding how these samples function. 

As a quick refresher, what the user sees is the *frontend*. This includes the HTML, CSS, and JS you write. The frontend is *served* to the user by the backend, which is a server. Each time the user wants more data, they call the backend. User data and other info can be stored in a database, which the user accesses through the backend.

## Software Requirements

### Backend
For simplicity of install and management, most of the backend samples use [Deno](https://deno.land). Deno is secure, one terminal command to install, and uses TypeScript, a typed superset of JavaScript encouraging better code practices. These samples work with backend concepts like creating APIs, serving files, and more.

### Database
Database samples are separated from backend samples for clarity. These samples use MongoDB and Deno, and work with managing data in conjunction with a backend. It is recommended to start with the backend samples first.

### Frontend
There will be standard HTML, CSS, and JS files included in the first few samples, stepping up to introduce SCSS and TypeScript for the frontend. These samples focus on design and principles of UI, UX, and how that relates to the code and markup itself. Later samples introduce [NodeJS](https://nodejs.org/en/) and Angular 11 as a framework.

## Course Extensions
For more reading from me, check out [Integration Testing](https://sdbagel.com/integration-testing), which is my blog for code design and the intricacies of putting something together to make a great project. Right now, it focuses more on the ideals rather than the code itself, which many tutorials seem to gloss over.

Otherwise, [searching](https://ddg.gg) for tutorials on various technologies, languages, and how to do certain things will almost certaintly yield results and be of great benefit. Of course, more practice means more experience!

If you need a little more direction, I suggest expanding on some of the examples provided here, continuing to work with the technologies shown here through web tutorials, or exploring alternatives to see what you like.