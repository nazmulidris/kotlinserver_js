# kotlinserver_js

This is a node project written in Kotlin. 

- Kotlin code is used to  load node modules, and start an 
express server. 
- Gradle is used to build the project (compile the KT -> JS 
code, and package it all into the `lib/` folder for deployment). 
This is similar to what `webpack` would do for a pure JS project.

# Run it

`node lib/index.js` actually runs node and starts the server on
port [`3000`](http://localhost:3000).

# Todo

- Make this deployable to heroku
- Make it server some static files
- Create an endpoint capable of handling form post data (eg CSV file)

# More info
- [Node and Kotlin Tutorial](https://medium.com/@Miqubel/your-first-node-js-app-with-kotlin-30e07baa0bf7)
- [Configure Kotlin to compile to JS using Gradle](https://kotlinlang.org/docs/tutorials/javascript/getting-started-gradle/getting-started-with-gradle.html#configuring-compiler-options)
- [Kotlin dynamic type](https://kotlinlang.org/docs/reference/dynamic-type.html)
- [Calling JS from KT](https://kotlinlang.org/docs/reference/js-interop.html)
- [Express JS API Tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)
- [Express API docs](https://expressjs.com/en/guide/routing.html)
- [Express Template Engine for Markdown](https://www.npmjs.com/package/markedejs)