const fetch = require("../../node-fetch");

async function request(
    url,
    options,
    token
) {
    const headers = { "Content-Type": "application/json;" };

    if (token && options && options.method && options.method != "GET") {
        headers["Authorization"] = `Bearer ${token}`;
    }

    let response;
    let data;
    try {
        response = await fetch(url,
            {
                ...options,
                headers: {
                    ...headers,
                    ...options.headers
                }
            }
        );
        data = await response.json();
    } catch (error) {
        throw error;
    }

    return data;
}

export async function requestGet(url) {
    let result;
    try {
        result = await request(url, { method: "GET" }, null);
    } catch (error) {
        throw error;
    }
    return result;
}

export async function requestPost(
    url,
    token,
    options
) {
    let result;
    try {
        result = await request(url, { ...options, method: "POST" }, token);
    } catch (error) {
        throw error;
    }
    return result;
}

export async function requestPut(
    url,
    token,
    options
) {
    let result;
    try {
        result = await request(url, { ...options, method: "PUT" }, token);
    } catch (error) {
        throw error;
    }
    return result;
}

export async function requestDelete(
    url,
    token,
    options
) {
    let result;
    try {
        result = await request(url, { ...options, method: "DELETE" }, token);
    } catch (error) {
        throw error;
    }
    return result;
}