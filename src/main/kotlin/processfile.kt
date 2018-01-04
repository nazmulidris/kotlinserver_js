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

external class Date {
    constructor(str: String)

    companion object {
        fun parse(str: String): Date
    }
}

fun processFile(res: dynamic, savedFileName: String) {
    var csv = require("ya-csv")
    var listOfRows = mutableListOf<Record>() // not JSON
    var reader = csv.createCsvFileReader(
            savedFileName,
            json(Pair("columnsFromHeader", "true")))
    reader.addListener(
            "data",
            { row ->
                val record = convertRowToRecord(row)
                listOfRows.add(record)
            }
    )
    reader.addListener(
            "end",
            { row ->
                var map = transform(listOfRows)
                res.type("text/html")
                res.send(prettyPrint(map))
            }
    )
}

private fun convertRowToRecord(row: dynamic): Record {
    val type: String = row[Headers.TYPE.id]
    val xact: String = row[Headers.XACT.id]
    val post: String = row[Headers.POST.id]
    val desc: String = row[Headers.DESC.id]
    val amt: String = row[Headers.AMT.id]

    val xactDate = parseDate(xact)
    val postDate = parseDate(post)
    val amtFloat = amt.toFloat()

    val record = Record(type, xactDate, postDate, desc, amtFloat)
    return record
}

/**
 * Data format for the date is month/day/year, eg: 11/30/2017
 * However JavaScript Date format is year/month/day
 */
fun parseDate(dateStr: String): Date {
    val dateStrList = dateStr.split("/")
    val year = dateStrList[2]
    val day = dateStrList[1]
    val month = dateStrList[0]
    val jsDate = Date(year + "/" + month + "/" + day)
    return jsDate
}

//
// All the code below is copied from the JVM version
// https://github.com/nazmulidris/kotlinserver_js
//

fun transform(recordList: MutableList<Record>): MutableMap<Category, MutableList<Record>> {
    val map = mutableMapOf<Category, MutableList<Record>>()
    for (record in recordList) {
        val (type, transDate, postDate, description, amount) = record

        // Check to see if the record matches any of the Categories
        Category.values().forEach { category ->
            category.descriptionList.forEach { categoryDescription ->
                if (description.contains(categoryDescription, true)) {
                    map.getOrPut(category) { mutableListOf() }.add(record)
                }
            }
        }

        // If a record didn't match any of the categories, then add it to Unknown
        if (!map.any { it.value.any { it == record } })
            map.getOrPut(Category.Unknown) { mutableListOf() }.add(record)
    }
    return map
}

fun prettyPrint(map: MutableMap<Category, MutableList<Record>>): String {
    val buffer = StringBuilder()
    val totals = mutableMapOf<Category, Float>()

    map.keys.sorted().forEach { // every category

        var categoryTotal = 0f

        val recordBuffer = StringBuilder()
        map[it]?.forEach { // every record in a category
            categoryTotal += it.amount
            with(recordBuffer) {
                val highlightColor = when (it.type) {
                    "Sale" -> "#ff8c00"
                    "Payment" -> "#006994"
                    else -> "#3cb371"
                }
                append("""<span style="color:$highlightColor">${it.type}</span>""")
                append(", ${it.transDate}")
                append(", ${it.amount}")
                append(", ${it.description}")
                append("<br/>")
            }
        }

        totals.getOrPut(it) { categoryTotal }

        with(buffer) {
            append("<h2>")
            append(it)
            append(", ")
            append(categoryTotal)
            append("</h2>")
            append(recordBuffer)
        }

    }
    return buffer.toString()
}

enum class Headers(val id: String) {
    TYPE("Type"),
    XACT("Trans Date"),
    POST("Post Date"),
    DESC("Description"),
    AMT("Amount")
}

data class Record(val type: String,
                  val transDate: Date,
                  val postDate: Date,
                  val description: String,
                  val amount: Float)

enum class Category(val descriptionList: List<String>) {
    // Transportation
    Cars(listOf("PORSCHE")),
    RideShare(listOf("LYFT", "UBER")),

    // Household
    Household(listOf("Amazon.com", "AMAZON MKTPLACE PMTS", "jet.com", "walmart", "UPS", "USPS")),

    // Services
    Phone(listOf("VZWRLSS")),
    Internet(listOf("COMCAST CALIFORNIA")),

    // Food
    Groceries(listOf("wholefds")),
    Restaurants(listOf("doordash", "LYFE KITCHEN", "COUPA", "LISAS TEA TIME LLC", "SQ")),
    Chocolate(listOf("WWWVALRHONA")),

    // Health
    Health(listOf("GOOGLE *Massage", "GOOGLE WELLNESS CTR")),

    // Education
    Books(listOf("Amazon Services-Kindle")),

    // Entertainment
    Music(listOf("GOOGLE *Google Music")),
    Movies(listOf("Amazon Video On Demand")),

    // IT
    TechSubscription(listOf("HEROKU", "github")),

    // Grooming
    Beauty(listOf("VIZAVOO")),

    // Other
    RetirementHome(listOf("TransferwiseCom_USD")),

    // Unknown
    Unknown(listOf())
}
