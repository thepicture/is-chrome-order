# is-chrome-order

```
Checks if http header order is Chrome
```

## Usage

```javascript
const express = require("express");
const isChromeOrder = require("is-chrome-order");

const port = 3000;
const app = express();

app.get("/", ({ headers }, res) => {
  const operation = isChromeOrder(headers) ? "are" : "are not";

  res.send(`You ${operation} chrome!`);
});

app.listen(port);
```

# API

```javascript
  type Headers = Record<string, string> | string[] | Array<[string, string]>;
  type IsChromeOrderOptions = {
    areRawHeaders: boolean;
  };

  function IsChromeOrder(
    headers: Headers,
    options: IsChromeOrderOptions = { areRawHeaders = false }
  ): boolean;

  export = IsChromeOrder;
```

`headers` - one of:

- array of strings

```javascript
["accept", "accept-language"];
```

- object of structure `[key: string]: string`

```javascript
{
  'accept': '...',
  'user-agent': '...'
}
```

- array with 2-length array of strings

```javascript
[
  ["accept-encoding", "gzip"],
  ["accept", "*/*"],
];
```

`options`: object that can have `areRawHeaders` option if it should parse entries array such as:

```javascript
[
  "user-agent",
  "this is invalid because there can be only one",
  "User-Agent",
  "curl/7.22.0",
  "Host",
  "127.0.0.1:8000",
  "ACCEPT",
  "*",
];
```

`areRawHeaders` defaults to `false`

## Test

```bash
node test
```
