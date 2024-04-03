import axios from 'axios';

import { API } from '../settings';

// ------------ POST
/**
 *
 * @param route Path
 * @param data Body
 * @param APIKeyRequired API KEY
 * @param extraHeaders
 * @returns
 */
export const post = async (
  route: string,
  data: Record<string, any>,
  APIKeyRequired: boolean = false,
  extraHeaders?: Record<string, any>
) => {
  let headers = { ...extraHeaders };

  if (APIKeyRequired) {
    // Aquí se deberia obtener la clave API de alguna manera segura
    const key = ''; // Por ejemplo, desde una variable de entorno
    const keyHeader = {
      Authorization: `API-Key ${key}`,
    };
    headers = { ...keyHeader, ...headers };
  }

  const config = { headers };
  const res = await axios.post(API.URL + route, data, config);
  return res.data;
};

// ------------ GET

/**
 *
 * @param route Path
 * @param query_params Query params (after path)
 * @param APIKeyRequired API KEY
 * @param extraHeaders
 * @param responseType
 * @returns
 */
export const get = async (
  route: string,
  query_params?: string,
  APIKeyRequired: boolean = false,
  extraHeaders?: Record<string, any>,
  responseType?: Record<string, any>
) => {
  let params: any = '';
  let headers = { ...extraHeaders };

  if (APIKeyRequired) {
    // obtener clave API de alguna manera segura
    const key = '';
    const keyHeader = {
      Authorization: `API-Key ${key}`,
    };
    headers = { ...keyHeader, ...headers };
  }

  if (query_params) {
    params = new URLSearchParams(query_params);
    route += '?' + params;
  }

  const config = {
    headers: { ...headers },
    ...responseType,
  };

  const res = await axios.get(API.URL + route, config);
  return res.data;
};

// ------------ DELETE

/**
 *
 * @param route Path
 * @param data Body
 * @param APIKeyRequired API KEY
 * @param extraHeaders
 * @returns
 */
export const del = async (
  route: string,
  data?: Record<string, any>,
  APIKeyRequired: boolean = true,
  extraHeaders?: Record<string, any>
) => {
  let headers = { ...extraHeaders };

  if (APIKeyRequired) {
    const key = '';
    const keyHeader = {
      Authorization: `API-Key ${key}`,
    };
    headers = { ...keyHeader, ...headers };
  }

  const config = {
    headers: { ...headers },
    data: {
      ...data,
    },
  };

  const res = await axios.delete(API.URL + route, config);
  return res.data;
};
// ------------ PUT

/**
 *
 * @param route Path
 * @param data Body
 * @param APIKeyRequired API Key
 * @param extraHeaders
 * @returns
 */
export const put = async (
  route: string,
  data: Record<string, any>,
  APIKeyRequired: boolean = false,
  extraHeaders?: Record<string, any>
) => {
  let headers = { ...extraHeaders };

  if (APIKeyRequired) {
    const key = '';
    const keyHeader = {
      Authorization: `API-Key ${key}`,
    };
    headers = { ...keyHeader, ...headers };
  }

  const config = {
    headers: { ...headers },
    data: {
      ...data,
    },
  };

  const res = await axios.put(API.URL + route, data, config);
  return res.data;
};
