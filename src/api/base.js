import logger from '../helpers/logger';
import {__DEV__ } from '../constants/env';

const TIMEOUT = 20000; // 20 sec timeout
const baseUrl = process.env.REACT_APP_PUBLIC_URL || 'http://server.mindgamehack.ru';

const fetchWithTimeout = (...args) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async resolve => {
    const t = setTimeout(() => {
      resolve({ status: 0, error: 'Request timed out' });
    }, TIMEOUT);
    try {
      const res = await fetch(...args);
      resolve(res);
    } finally {
      clearTimeout(t);
    }
  });
}

const authHeaders = token => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${token}`);
  headers.append('Accept', 'application/json');
  return headers;
};

/**
 * Throws connection error.
 */
const throwConnectionError = (error) => {
  throw new Error(error);
}

const BaseAPI = (method, { url, body, token }, mockResponse) => {

  const baseHeaders = new Headers();
  // baseHeaders.append('Content-Type', 'application/json');
  // baseHeaders.append('Accept', 'application/json');
  const uri = `${baseUrl}/${url}`;

  const params = {
    method,
    mode: 'cors',
    headers: baseHeaders,
    // dataType: 'json'
  };

  if (method !== 'GET') {
    params.body = JSON.stringify(body)
  }

  logger.info(`${method}: `, uri, params);

  if (mockResponse) {
    return new Promise((resolve) => resolve(mockResponse))
  }

  return fetchWithTimeout(uri, params)
      .catch(throwConnectionError)
      .then(async response => {
        await validateResponse(response);
        return response;
      })
      .then(response => {
        if (response.status === 401) {
          return { code: response.status, message: response.statusText }
        }

        return response.json()
      });
}

export const POST = (url, body, token = null, mockResponse = undefined) => {
  return BaseAPI('POST', {url, body, token}, mockResponse)
}

export const PUT = (url, body, token = null, mockResponse = undefined) => {
  return BaseAPI('PUT', {url, body, token}, mockResponse)
}

export const PATCH = (url, body, token = null, mockResponse = undefined) => {
  return BaseAPI('PATCH', {url, body, token}, mockResponse)
}

export const GET = (url, body, token = null, mockResponse = undefined) => {
  return BaseAPI('GET', {url, body, token}, mockResponse)
}

export const DELETE = (url, body, token = null, mockResponse = undefined) => {
  return BaseAPI('DELETE', {url, body, token}, mockResponse)
}

/**
* Validates HTTP response and throws error if something goes wrong.
* @param {Response} response
*/
const validateResponse = async (response) => {
 // Redirect user to login screen if he is not authorized
 if (response.status === 401) {
   return Promise.resolve(true);
 }

 if (response.status !== 200 || response.error) {
   // if (!Config.__TEST__) {
   logger.error(response);
   // }
 }

 // if (Config.__TEST__) return Promise.resolve(true);
 if (__DEV__ && typeof response.clone === 'function') {
   const clonedResponse = response.clone();
   const body = await clonedResponse.json();

   logger.info({
     response,
     body,
   });
 } else {
   logger.info(response);
 }

 return Promise.resolve(true);
}
