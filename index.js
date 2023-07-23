module.exports = (headers, { areRawHeaders } = { areRawHeaders: false }) => {
  let indexOfAccept,
    indexOfHost,
    indexOfUserAgent,
    indexOfAcceptLanguage,
    indexOfAcceptEncoding;

  let keys;

  let isUnknownInputProtocol = true;

  const isNodeHttpLibrary =
    typeof headers === "object" && !Array.isArray(headers);
  Object.values(headers).every((value) => typeof value === "string");

  const isArrayOfHeaderKeys =
    Array.isArray(headers) &&
    headers.every((value) => typeof value === "string");

  const isInputOfEntries =
    Array.isArray(headers) &&
    headers.every(
      (entry) =>
        entry.length === 2 && entry.every((value) => typeof value === "string")
    );

  if (isNodeHttpLibrary) {
    isUnknownInputProtocol = false;

    keys = Object.keys(headers).map((key) => key.toLowerCase());
  } else if (isArrayOfHeaderKeys && !areRawHeaders) {
    isUnknownInputProtocol = false;

    keys = headers.map((value) => value.toLowerCase());
  } else if (isInputOfEntries) {
    isUnknownInputProtocol = false;

    keys = Object.keys(Object.fromEntries(headers)).map((value) =>
      value.toLowerCase()
    );
  } else if (areRawHeaders) {
    isUnknownInputProtocol = false;

    let headerSet = {};

    for (const key of headers
      .filter((_, index) => !(index % 2))
      .map((value) => value.toLowerCase())) {
      delete headerSet[key];
      headerSet[key] = "";
    }

    keys = Object.keys(headerSet).map((value) => value.toLowerCase());
  }

  if (isUnknownInputProtocol) {
    throw new Error("Input protocol is unknown");
  }

  if (keys.indexOf("accept") !== -1) {
    indexOfAccept = keys.indexOf("accept");
  }

  if (keys.indexOf("host") !== -1) {
    indexOfHost = keys.indexOf("host");
  }

  if (keys.indexOf("user-agent") !== -1) {
    indexOfUserAgent = keys.indexOf("user-agent");
  }

  if (keys.indexOf("accept-language") !== -1) {
    indexOfAcceptLanguage = keys.indexOf("accept-language");
  }

  if (keys.indexOf("accept-encoding") !== -1) {
    indexOfAcceptEncoding = keys.indexOf("accept-encoding");
  }

  const didConditionMeet1 =
    indexOfAccept &&
    indexOfAccept < indexOfAcceptEncoding &&
    indexOfAcceptEncoding < indexOfHost &&
    indexOfHost < indexOfUserAgent;
  const didConditionMeet2 =
    indexOfAccept &&
    indexOfAccept < indexOfAcceptEncoding &&
    indexOfAcceptEncoding < indexOfAcceptLanguage &&
    indexOfAcceptLanguage < indexOfHost &&
    indexOfHost < indexOfUserAgent;
  const didConditionMeet3 =
    indexOfAcceptEncoding &&
    indexOfAcceptEncoding < indexOfAcceptLanguage &&
    indexOfAcceptLanguage < indexOfHost &&
    indexOfHost < indexOfUserAgent;
  const didConditionMeet4 =
    indexOfAccept &&
    indexOfAccept < indexOfAcceptLanguage &&
    indexOfAcceptLanguage < indexOfHost &&
    indexOfHost < indexOfUserAgent &&
    indexOfUserAgent < indexOfAcceptEncoding;
  const didConditionMeet5 =
    indexOfAccept &&
    indexOfAccept < indexOfAcceptLanguage &&
    indexOfAcceptLanguage < indexOfHost &&
    indexOfHost < indexOfUserAgent;

  const didConditionMeet6 =
    indexOfHost < indexOfAcceptLanguage &&
    indexOfAcceptLanguage < indexOfUserAgent &&
    indexOfUserAgent < indexOfAccept &&
    indexOfAccept < indexOfAcceptEncoding;

  return !!(
    didConditionMeet1 ||
    didConditionMeet2 ||
    didConditionMeet3 ||
    didConditionMeet4 ||
    didConditionMeet5 ||
    didConditionMeet6
  );
};
