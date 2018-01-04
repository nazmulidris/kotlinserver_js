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

    // Support for file upload
    val fileUpload = require("express-fileupload")
    app.use(fileUpload())

    // Template engine - load markdown support
    val markedejs = require("markedejs");
    app.engine(".md", markedejs.__express);

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

    app.get("/md",
            { req: dynamic, res: dynamic ->
                res.render(
                        "hello.md",
                        json(Pair("name", "Nazmul"), Pair("age", "43")))
            }
    )

    app.post("/fileupload",
            { req: dynamic, res: dynamic ->
                if (isEmptyJSO(req.files)) {
                    res.send("No files were uploaded");
                } else {
                    // The name of the input field (i.e. "csv_file") is used to
                    // retrieve the uploaded file
                    val file = req.files.csv_file
                    val fileName = file.name
                    val fileType = file.mimetype
                    val fileDataBuffer = file.data
                    val fileDataString = fileDataBuffer.toString("utf8")

                    val sb = StringBuilder()
                    with(sb) {
                        append("fileName: $fileName, ")
                        append("\n")
                        append("fileType: $fileType, ")
                        append("\n")
                        append("fileDataBuffer.length: ${fileDataBuffer.length} bytes, ")
                        append("\nfileDataString:\n")
                        append("$fileDataString")
                    }

                    val savedFileName = "uploaded.csv"
                    file.mv(savedFileName,
                            { err ->
                                res.type("text/plain")
                                if (err == null) {
                                    processFile(res, savedFileName)
                                    //res.send(sb.toString())
                                } else {
                                    res.send("File could not be written on server")
                                }
                            }
                    )

                }
            }
    )

    // Start the server
    getPort().let {
        app.listen(it) { println("listening on port $it") }
    }

}

/** Checks to see if the JS Object has no keys / values */
fun isEmptyJSO(obj: Any): Boolean {
    return js("if (Object.keys(obj) == 0) return true; else return false;")
}

fun getPort(): Int {
    return process.env.PORT ?: 3000
}