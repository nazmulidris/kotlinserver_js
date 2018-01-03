import kotlin.js.json

/*
 * Copyright 2018 Nazmul Idris All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Declare external JS functions / objects here
external fun require(module: String): dynamic

external val process: dynamic

// Main entry point of node program
fun main(args: Array<String>) {
    println("Hello JavaScript!")

    val express = require("express")
    val app = express()

    // Middleware - serve static pages
    app.use(
            express.static(
                    "public",
                    json(Pair("index", "index.html"))
            )
    )

    // Routes
    app.get(
            "/hola",
            { req, res ->
                res.type("text/plain")
                res.send("hola worlds!")
            }
    )

    app.get("/hola/:name",
            { req: dynamic, res: dynamic ->
                var name = req.params.name
                res.type("text/plain")
                res.send("hola $name")
            }
    )

    // Start the server
    getPort().let {
        app.listen(it) { println("listening on port $it") }
    }

}

fun getPort(): Int {
    return process.env.PORT ?: 3000
}