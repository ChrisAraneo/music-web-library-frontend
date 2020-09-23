"use strict";

exports.__esModule = true;
exports.requestGet = requestGet;
exports.requestPost = requestPost;
exports.requestPut = requestPut;
exports.requestDelete = requestDelete;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fetch = require("node-fetch");

async function request(url, options, token) {
    var headers = {
        "Content-Type": "application/json;"
    };

    if (token && options && options.method && options.method != "GET") {
        headers["Authorization"] = "Bearer " + token;
    }

    var response;
    var data;

    try {
        response = await fetch(url, _objectSpread(_objectSpread({}, options), {}, {
            headers: _objectSpread(_objectSpread({}, headers), options.headers)
        }));
        data = await response.json();
    } catch (error) {
        throw error;
    }

    return data;
}

async function requestGet(url) {
    var result;

    try {
        result = await request(url, {
            method: "GET"
        }, null);
    } catch (error) {
        throw error;
    }

    return result;
}

async function requestPost(url, token, options) {
    var result;

    try {
        result = await request(url, _objectSpread(_objectSpread({}, options), {}, {
            method: "POST"
        }), token);
    } catch (error) {
        throw error;
    }

    return result;
}

async function requestPut(url, token, options) {
    var result;

    try {
        result = await request(url, _objectSpread(_objectSpread({}, options), {}, {
            method: "PUT"
        }), token);
    } catch (error) {
        throw error;
    }

    return result;
}

async function requestDelete(url, token, options) {
    var result;

    try {
        result = await request(url, _objectSpread(_objectSpread({}, options), {}, {
            method: "DELETE"
        }), token);
    } catch (error) {
        throw error;
    }

    return result;
}