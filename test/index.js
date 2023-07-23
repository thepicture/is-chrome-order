const assert = require("node:assert");
const { it } = require("node:test");

const isChromeOrder = require("../index");

it("should return true with node:http library headers", () => {
  const expected = true;
  const headers = {
    host: "",
    "accept-language": "",
    "user-agent": "",
    accept: "",
    "accept-encoding": "",
  };

  const actual = isChromeOrder(headers);

  assert.strictEqual(expected, actual);
});

it("should ignore casing", () => {
  const expected = true;
  const headers = {
    HOST: "",
    "accept-language": "",
    "User-Agent": "",
    aCcEpT: "",
    "accept-encoding": "",
  };

  const actual = isChromeOrder(headers);

  assert.strictEqual(expected, actual);
});

it("should return false with non-chrome order", () => {
  const expected = false;
  const headers = {
    "accept-language": "",
    "user-agent": "",
    "accept-encoding": "",
    host: "",
    accept: "",
  };

  const actual = isChromeOrder(headers);

  assert.strictEqual(expected, actual);
});

it("should work with arrays", () => {
  const expected = true;
  const headers = [
    "host",
    "accept-language",
    "user-agent",
    "accept",
    "accept-encoding",
  ];

  const actual = isChromeOrder(headers);

  assert.strictEqual(expected, actual);
});

it("should work with entries", () => {
  const expected = true;
  const headers = [
    ["host", ""],
    ["accept-language", ""],
    ["user-agent", ""],
    ["accept", ""],
    ["accept-encoding", ""],
  ];

  const actual = isChromeOrder(headers);

  assert.strictEqual(expected, actual);
});

it("should throw on unknown protocol", () => {
  const expected = {
    message: "Input protocol is unknown",
  };
  const headers = [
    "host",
    "accept-language",
    Object.apply,
    "accept",
    "accept-encoding",
  ];

  const actual = () => isChromeOrder(headers);

  assert.throws(actual, expected);
});

it("should work with rawHeaders entries", () => {
  const expected = true;
  const headers = [
    "user-agent",
    "this is invalid because there can be only one",
    "Host",
    "127.0.0.1:8000",
    "accept-language",
    "",
    "User-Agent",
    "curl/7.22.0",
    "ACCEPT",
    "*",
    "ACCEPT-encoding",
    "gzip",
  ];

  const actual = isChromeOrder(headers, { areRawHeaders: true });

  assert.strictEqual(expected, actual);
});
