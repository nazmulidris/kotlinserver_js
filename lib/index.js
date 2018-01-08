(function (_, Kotlin) {
  'use strict';
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Pair = Kotlin.kotlin.Pair;
  var json = Kotlin.kotlin.js.json_pyyo18$;
  var StringBuilder = Kotlin.kotlin.text.StringBuilder;
  var Unit = Kotlin.kotlin.Unit;
  var split = Kotlin.kotlin.text.split_ip8yn$;
  var contains = Kotlin.kotlin.text.contains_li3zpu$;
  var sorted = Kotlin.kotlin.collections.sorted_exjks8$;
  var equals = Kotlin.equals;
  var Enum = Kotlin.kotlin.Enum;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var throwISE = Kotlin.throwISE;
  var listOf = Kotlin.kotlin.collections.listOf_mh5how$;
  var listOf_0 = Kotlin.kotlin.collections.listOf_i5x0yv$;
  Headers.prototype = Object.create(Enum.prototype);
  Headers.prototype.constructor = Headers;
  Category.prototype = Object.create(Enum.prototype);
  Category.prototype.constructor = Category;
  function main$lambda(req, res) {
    res.type('text/plain');
    return res.send('hola worlds!');
  }
  function main$lambda_0(req, res) {
    var name = req.params.name;
    res.type('text/plain');
    return res.send('hola ' + name);
  }
  function main$lambda_1(req, res) {
    return res.render('hello.md', json([new Pair('name', 'Nazmul'), new Pair('age', '43')]));
  }
  function main$lambda$lambda(closure$res, closure$savedFileName) {
    return function (err) {
      closure$res.type('text/plain');
      if (err == null) {
        return processFile(closure$res, closure$savedFileName), Unit;
      }
       else {
        return closure$res.send('File could not be written on server');
      }
    };
  }
  function main$lambda_2(req, res) {
    if (isEmptyJSO(req.files)) {
      return res.send('No files were uploaded');
    }
     else {
      var file = req.files.csv_file;
      var fileName = file.name;
      var fileType = file.mimetype;
      var fileDataBuffer = file.data;
      var fileDataString = fileDataBuffer.toString('utf8');
      var sb = new StringBuilder();
      sb.append_gw00v9$('fileName: ' + fileName + ', ');
      sb.append_gw00v9$('\n');
      sb.append_gw00v9$('fileType: ' + fileType + ', ');
      sb.append_gw00v9$('\n');
      sb.append_gw00v9$('fileDataBuffer.length: ' + fileDataBuffer.length + ' bytes, ');
      sb.append_gw00v9$('\nfileDataString:\n');
      sb.append_gw00v9$(fileDataString.toString());
      var savedFileName = 'uploaded.csv';
      return file.mv(savedFileName, main$lambda$lambda(res, savedFileName));
    }
  }
  function main$lambda$lambda_0(closure$it) {
    return function () {
      println('listening on port ' + closure$it);
      return Unit;
    };
  }
  function main(args) {
    println('Hello JavaScript!');
    var express = require('express');
    var app = express();
    var fileUpload = require('express-fileupload');
    app.use(fileUpload());
    var markedejs = require('markedejs');
    app.engine('.md', markedejs.__express);
    app.use(express.static('public', json([new Pair('index', 'index.html')])));
    app.get('/hola', main$lambda);
    app.get('/hola/:name', main$lambda_0);
    app.get('/md', main$lambda_1);
    app.post('/fileupload', main$lambda_2);
    var it = getPort();
    app.listen(it, main$lambda$lambda_0(it));
  }
  function isEmptyJSO(obj) {
    if (Object.keys(obj) == 0)
      return true;
    else
      return false;
  }
  function getPort() {
    var tmp$;
    return (tmp$ = process.env.PORT) != null ? tmp$ : 3000;
  }
  function processFile$lambda(closure$listOfRows) {
    return function (row) {
      var record = convertRowToRecord(row);
      return closure$listOfRows.v.add_11rb$(record);
    };
  }
  function processFile$lambda_0(closure$listOfRows, closure$res) {
    return function (row) {
      var map = transform(closure$listOfRows.v);
      closure$res.type('text/html');
      return closure$res.send(prettyPrint(map));
    };
  }
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  function processFile(res, savedFileName) {
    var csv = require('ya-csv');
    var listOfRows = {v: ArrayList_init()};
    var reader = csv.createCsvFileReader(savedFileName, json([new Pair('columnsFromHeader', 'true')]));
    reader.addListener('data', processFile$lambda(listOfRows));
    reader.addListener('end', processFile$lambda_0(listOfRows, res));
  }
  var toDouble = Kotlin.kotlin.text.toDouble_pdl1vz$;
  function convertRowToRecord(row) {
    var type = row[Headers$TYPE_getInstance().id];
    var xact = row[Headers$XACT_getInstance().id];
    var post = row[Headers$POST_getInstance().id];
    var desc = row[Headers$DESC_getInstance().id];
    var amt = row[Headers$AMT_getInstance().id];
    var xactDate = parseDate(xact);
    var postDate = parseDate(post);
    var amtFloat = toDouble(amt);
    var record = new Record(type, xactDate, postDate, desc, amtFloat);
    return record;
  }
  function parseDate(dateStr) {
    var dateStrList = split(dateStr, ['/']);
    var year = dateStrList.get_za3lpa$(2);
    var day = dateStrList.get_za3lpa$(1);
    var month = dateStrList.get_za3lpa$(0);
    var jsDate = new Date(year + '/' + month + '/' + day);
    return jsDate;
  }
  var Collection = Kotlin.kotlin.collections.Collection;
  var LinkedHashMap_init = Kotlin.kotlin.collections.LinkedHashMap_init_q3lmfv$;
  function transform(recordList) {
    var tmp$;
    var map = LinkedHashMap_init();
    tmp$ = recordList.iterator();
    while (tmp$.hasNext()) {
      var record = tmp$.next();
      var type = record.component1()
      , transDate = record.component2()
      , postDate = record.component3()
      , description = record.component4()
      , amount = record.component5();
      var $receiver = Category$values();
      var tmp$_0;
      for (tmp$_0 = 0; tmp$_0 !== $receiver.length; ++tmp$_0) {
        var element = $receiver[tmp$_0];
        var tmp$_1;
        tmp$_1 = element.descriptionList.iterator();
        while (tmp$_1.hasNext()) {
          var element_0 = tmp$_1.next();
          if (contains(description, element_0, true)) {
            var tmp$_2;
            var value = map.get_11rb$(element);
            if (value == null) {
              var answer = ArrayList_init();
              map.put_xwzc9p$(element, answer);
              tmp$_2 = answer;
            }
             else {
              tmp$_2 = value;
            }
            tmp$_2.add_11rb$(record);
          }
        }
      }
      var any$result;
      any$break: do {
        var tmp$_3;
        if (map.isEmpty()) {
          any$result = false;
          break any$break;
        }
        tmp$_3 = map.entries.iterator();
        while (tmp$_3.hasNext()) {
          var element_1 = tmp$_3.next();
          var $receiver_0 = element_1.value;
          var any$result_0;
          any$break_0: do {
            var tmp$_4;
            if (Kotlin.isType($receiver_0, Collection) && $receiver_0.isEmpty()) {
              any$result_0 = false;
              break any$break_0;
            }
            tmp$_4 = $receiver_0.iterator();
            while (tmp$_4.hasNext()) {
              var element_2 = tmp$_4.next();
              if (element_2 != null ? element_2.equals(record) : null) {
                any$result_0 = true;
                break any$break_0;
              }
            }
            any$result_0 = false;
          }
           while (false);
          if (any$result_0) {
            any$result = true;
            break any$break;
          }
        }
        any$result = false;
      }
       while (false);
      if (!any$result) {
        var key = Category$Unknown_getInstance();
        var tmp$_5;
        var value_0 = map.get_11rb$(key);
        if (value_0 == null) {
          var answer_0 = ArrayList_init();
          map.put_xwzc9p$(key, answer_0);
          tmp$_5 = answer_0;
        }
         else {
          tmp$_5 = value_0;
        }
        tmp$_5.add_11rb$(record);
      }
    }
    return map;
  }
  function prettyPrint(map) {
    var buffer = new StringBuilder();
    var totals = LinkedHashMap_init();
    var tmp$;
    tmp$ = sorted(map.keys).iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var tmp$_0;
      var categoryTotal = {v: 0.0};
      var recordBuffer = new StringBuilder();
      if ((tmp$_0 = map.get_11rb$(element)) != null) {
        var tmp$_1;
        tmp$_1 = tmp$_0.iterator();
        while (tmp$_1.hasNext()) {
          var element_0 = tmp$_1.next();
          categoryTotal.v += element_0.amount;
          var tmp$_2, tmp$_3;
          tmp$_2 = element_0.type;
          if (equals(tmp$_2, 'Sale'))
            tmp$_3 = '#ff8c00';
          else if (equals(tmp$_2, 'Payment'))
            tmp$_3 = '#006994';
          else
            tmp$_3 = '#3cb371';
          var highlightColor = tmp$_3;
          recordBuffer.append_gw00v9$('<span style=' + '"' + 'color:' + highlightColor + '"' + '>' + element_0.type + '<\/span>');
          recordBuffer.append_gw00v9$(', ' + element_0.transDate);
          recordBuffer.append_gw00v9$(', ' + element_0.amount);
          recordBuffer.append_gw00v9$(', ' + element_0.description);
          recordBuffer.append_gw00v9$('<br/>');
        }
      }
      var tmp$_4;
      var value = totals.get_11rb$(element);
      if (value == null) {
        var answer = categoryTotal.v;
        totals.put_xwzc9p$(element, answer);
        tmp$_4 = answer;
      }
       else {
        tmp$_4 = value;
      }
      buffer.append_gw00v9$('<h2>');
      buffer.append_s8jyv4$(element);
      buffer.append_gw00v9$(', ');
      buffer.append_s8jyv4$(categoryTotal.v);
      buffer.append_gw00v9$('<\/h2>');
      buffer.append_gw00v9$(recordBuffer);
    }
    return buffer.toString();
  }
  function Headers(name, ordinal, id) {
    Enum.call(this);
    this.id = id;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function Headers_initFields() {
    Headers_initFields = function () {
    };
    Headers$TYPE_instance = new Headers('TYPE', 0, 'Type');
    Headers$XACT_instance = new Headers('XACT', 1, 'Trans Date');
    Headers$POST_instance = new Headers('POST', 2, 'Post Date');
    Headers$DESC_instance = new Headers('DESC', 3, 'Description');
    Headers$AMT_instance = new Headers('AMT', 4, 'Amount');
  }
  var Headers$TYPE_instance;
  function Headers$TYPE_getInstance() {
    Headers_initFields();
    return Headers$TYPE_instance;
  }
  var Headers$XACT_instance;
  function Headers$XACT_getInstance() {
    Headers_initFields();
    return Headers$XACT_instance;
  }
  var Headers$POST_instance;
  function Headers$POST_getInstance() {
    Headers_initFields();
    return Headers$POST_instance;
  }
  var Headers$DESC_instance;
  function Headers$DESC_getInstance() {
    Headers_initFields();
    return Headers$DESC_instance;
  }
  var Headers$AMT_instance;
  function Headers$AMT_getInstance() {
    Headers_initFields();
    return Headers$AMT_instance;
  }
  Headers.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Headers',
    interfaces: [Enum]
  };
  function Headers$values() {
    return [Headers$TYPE_getInstance(), Headers$XACT_getInstance(), Headers$POST_getInstance(), Headers$DESC_getInstance(), Headers$AMT_getInstance()];
  }
  Headers.values = Headers$values;
  function Headers$valueOf(name) {
    switch (name) {
      case 'TYPE':
        return Headers$TYPE_getInstance();
      case 'XACT':
        return Headers$XACT_getInstance();
      case 'POST':
        return Headers$POST_getInstance();
      case 'DESC':
        return Headers$DESC_getInstance();
      case 'AMT':
        return Headers$AMT_getInstance();
      default:throwISE('No enum constant Headers.' + name);
    }
  }
  Headers.valueOf_61zpoe$ = Headers$valueOf;
  function Record(type, transDate, postDate, description, amount) {
    this.type = type;
    this.transDate = transDate;
    this.postDate = postDate;
    this.description = description;
    this.amount = amount;
  }
  Record.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Record',
    interfaces: []
  };
  Record.prototype.component1 = function () {
    return this.type;
  };
  Record.prototype.component2 = function () {
    return this.transDate;
  };
  Record.prototype.component3 = function () {
    return this.postDate;
  };
  Record.prototype.component4 = function () {
    return this.description;
  };
  Record.prototype.component5 = function () {
    return this.amount;
  };
  Record.prototype.copy_b9cncb$ = function (type, transDate, postDate, description, amount) {
    return new Record(type === void 0 ? this.type : type, transDate === void 0 ? this.transDate : transDate, postDate === void 0 ? this.postDate : postDate, description === void 0 ? this.description : description, amount === void 0 ? this.amount : amount);
  };
  Record.prototype.toString = function () {
    return 'Record(type=' + Kotlin.toString(this.type) + (', transDate=' + Kotlin.toString(this.transDate)) + (', postDate=' + Kotlin.toString(this.postDate)) + (', description=' + Kotlin.toString(this.description)) + (', amount=' + Kotlin.toString(this.amount)) + ')';
  };
  Record.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.type) | 0;
    result = result * 31 + Kotlin.hashCode(this.transDate) | 0;
    result = result * 31 + Kotlin.hashCode(this.postDate) | 0;
    result = result * 31 + Kotlin.hashCode(this.description) | 0;
    result = result * 31 + Kotlin.hashCode(this.amount) | 0;
    return result;
  };
  Record.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.type, other.type) && Kotlin.equals(this.transDate, other.transDate) && Kotlin.equals(this.postDate, other.postDate) && Kotlin.equals(this.description, other.description) && Kotlin.equals(this.amount, other.amount)))));
  };
  function Category(name, ordinal, descriptionList) {
    Enum.call(this);
    this.descriptionList = descriptionList;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  var emptyList = Kotlin.kotlin.collections.emptyList_287e2$;
  function Category_initFields() {
    Category_initFields = function () {
    };
    Category$Cars_instance = new Category('Cars', 0, listOf('PORSCHE'));
    Category$RideShare_instance = new Category('RideShare', 1, listOf_0(['LYFT', 'UBER']));
    Category$Household_instance = new Category('Household', 2, listOf_0(['Amazon.com', 'AMAZON MKTPLACE PMTS', 'jet.com', 'walmart', 'UPS', 'USPS']));
    Category$Phone_instance = new Category('Phone', 3, listOf('VZWRLSS'));
    Category$Internet_instance = new Category('Internet', 4, listOf('COMCAST CALIFORNIA'));
    Category$Groceries_instance = new Category('Groceries', 5, listOf('wholefds'));
    Category$Restaurants_instance = new Category('Restaurants', 6, listOf_0(['doordash', 'LYFE KITCHEN', 'COUPA', 'LISAS TEA TIME LLC', 'SQ']));
    Category$Chocolate_instance = new Category('Chocolate', 7, listOf('WWWVALRHONA'));
    Category$Health_instance = new Category('Health', 8, listOf_0(['GOOGLE *Massage', 'GOOGLE WELLNESS CTR']));
    Category$Books_instance = new Category('Books', 9, listOf('Amazon Services-Kindle'));
    Category$Music_instance = new Category('Music', 10, listOf('GOOGLE *Google Music'));
    Category$Movies_instance = new Category('Movies', 11, listOf('Amazon Video On Demand'));
    Category$TechSubscription_instance = new Category('TechSubscription', 12, listOf_0(['HEROKU', 'github']));
    Category$Beauty_instance = new Category('Beauty', 13, listOf('VIZAVOO'));
    Category$RetirementHome_instance = new Category('RetirementHome', 14, listOf('TransferwiseCom_USD'));
    Category$Unknown_instance = new Category('Unknown', 15, emptyList());
  }
  var Category$Cars_instance;
  function Category$Cars_getInstance() {
    Category_initFields();
    return Category$Cars_instance;
  }
  var Category$RideShare_instance;
  function Category$RideShare_getInstance() {
    Category_initFields();
    return Category$RideShare_instance;
  }
  var Category$Household_instance;
  function Category$Household_getInstance() {
    Category_initFields();
    return Category$Household_instance;
  }
  var Category$Phone_instance;
  function Category$Phone_getInstance() {
    Category_initFields();
    return Category$Phone_instance;
  }
  var Category$Internet_instance;
  function Category$Internet_getInstance() {
    Category_initFields();
    return Category$Internet_instance;
  }
  var Category$Groceries_instance;
  function Category$Groceries_getInstance() {
    Category_initFields();
    return Category$Groceries_instance;
  }
  var Category$Restaurants_instance;
  function Category$Restaurants_getInstance() {
    Category_initFields();
    return Category$Restaurants_instance;
  }
  var Category$Chocolate_instance;
  function Category$Chocolate_getInstance() {
    Category_initFields();
    return Category$Chocolate_instance;
  }
  var Category$Health_instance;
  function Category$Health_getInstance() {
    Category_initFields();
    return Category$Health_instance;
  }
  var Category$Books_instance;
  function Category$Books_getInstance() {
    Category_initFields();
    return Category$Books_instance;
  }
  var Category$Music_instance;
  function Category$Music_getInstance() {
    Category_initFields();
    return Category$Music_instance;
  }
  var Category$Movies_instance;
  function Category$Movies_getInstance() {
    Category_initFields();
    return Category$Movies_instance;
  }
  var Category$TechSubscription_instance;
  function Category$TechSubscription_getInstance() {
    Category_initFields();
    return Category$TechSubscription_instance;
  }
  var Category$Beauty_instance;
  function Category$Beauty_getInstance() {
    Category_initFields();
    return Category$Beauty_instance;
  }
  var Category$RetirementHome_instance;
  function Category$RetirementHome_getInstance() {
    Category_initFields();
    return Category$RetirementHome_instance;
  }
  var Category$Unknown_instance;
  function Category$Unknown_getInstance() {
    Category_initFields();
    return Category$Unknown_instance;
  }
  Category.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Category',
    interfaces: [Enum]
  };
  function Category$values() {
    return [Category$Cars_getInstance(), Category$RideShare_getInstance(), Category$Household_getInstance(), Category$Phone_getInstance(), Category$Internet_getInstance(), Category$Groceries_getInstance(), Category$Restaurants_getInstance(), Category$Chocolate_getInstance(), Category$Health_getInstance(), Category$Books_getInstance(), Category$Music_getInstance(), Category$Movies_getInstance(), Category$TechSubscription_getInstance(), Category$Beauty_getInstance(), Category$RetirementHome_getInstance(), Category$Unknown_getInstance()];
  }
  Category.values = Category$values;
  function Category$valueOf(name) {
    switch (name) {
      case 'Cars':
        return Category$Cars_getInstance();
      case 'RideShare':
        return Category$RideShare_getInstance();
      case 'Household':
        return Category$Household_getInstance();
      case 'Phone':
        return Category$Phone_getInstance();
      case 'Internet':
        return Category$Internet_getInstance();
      case 'Groceries':
        return Category$Groceries_getInstance();
      case 'Restaurants':
        return Category$Restaurants_getInstance();
      case 'Chocolate':
        return Category$Chocolate_getInstance();
      case 'Health':
        return Category$Health_getInstance();
      case 'Books':
        return Category$Books_getInstance();
      case 'Music':
        return Category$Music_getInstance();
      case 'Movies':
        return Category$Movies_getInstance();
      case 'TechSubscription':
        return Category$TechSubscription_getInstance();
      case 'Beauty':
        return Category$Beauty_getInstance();
      case 'RetirementHome':
        return Category$RetirementHome_getInstance();
      case 'Unknown':
        return Category$Unknown_getInstance();
      default:throwISE('No enum constant Category.' + name);
    }
  }
  Category.valueOf_61zpoe$ = Category$valueOf;
  _.main_kand9s$ = main;
  _.isEmptyJSO_za3rmp$ = isEmptyJSO;
  _.getPort = getPort;
  _.processFile_hwpqgh$ = processFile;
  _.parseDate_61zpoe$ = parseDate;
  _.transform_7y4n2p$ = transform;
  _.prettyPrint_8jven3$ = prettyPrint;
  Object.defineProperty(Headers, 'TYPE', {
    get: Headers$TYPE_getInstance
  });
  Object.defineProperty(Headers, 'XACT', {
    get: Headers$XACT_getInstance
  });
  Object.defineProperty(Headers, 'POST', {
    get: Headers$POST_getInstance
  });
  Object.defineProperty(Headers, 'DESC', {
    get: Headers$DESC_getInstance
  });
  Object.defineProperty(Headers, 'AMT', {
    get: Headers$AMT_getInstance
  });
  _.Headers = Headers;
  _.Record = Record;
  Object.defineProperty(Category, 'Cars', {
    get: Category$Cars_getInstance
  });
  Object.defineProperty(Category, 'RideShare', {
    get: Category$RideShare_getInstance
  });
  Object.defineProperty(Category, 'Household', {
    get: Category$Household_getInstance
  });
  Object.defineProperty(Category, 'Phone', {
    get: Category$Phone_getInstance
  });
  Object.defineProperty(Category, 'Internet', {
    get: Category$Internet_getInstance
  });
  Object.defineProperty(Category, 'Groceries', {
    get: Category$Groceries_getInstance
  });
  Object.defineProperty(Category, 'Restaurants', {
    get: Category$Restaurants_getInstance
  });
  Object.defineProperty(Category, 'Chocolate', {
    get: Category$Chocolate_getInstance
  });
  Object.defineProperty(Category, 'Health', {
    get: Category$Health_getInstance
  });
  Object.defineProperty(Category, 'Books', {
    get: Category$Books_getInstance
  });
  Object.defineProperty(Category, 'Music', {
    get: Category$Music_getInstance
  });
  Object.defineProperty(Category, 'Movies', {
    get: Category$Movies_getInstance
  });
  Object.defineProperty(Category, 'TechSubscription', {
    get: Category$TechSubscription_getInstance
  });
  Object.defineProperty(Category, 'Beauty', {
    get: Category$Beauty_getInstance
  });
  Object.defineProperty(Category, 'RetirementHome', {
    get: Category$RetirementHome_getInstance
  });
  Object.defineProperty(Category, 'Unknown', {
    get: Category$Unknown_getInstance
  });
  _.Category = Category;
  main([]);
  Kotlin.defineModule('index', _);
  return _;
}(module.exports, require('kotlin')));

//# sourceMappingURL=index.js.map
