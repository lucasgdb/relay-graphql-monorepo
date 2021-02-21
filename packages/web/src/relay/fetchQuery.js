/* eslint-disable no-console */
import jwtToken from '../utils/jwtToken';
import fetchWithRetries from './fetchWithRetries';
import { isMutation } from './helpers';

const handleData = response => {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json();
  }

  return response.text();
};

export const GRAPHQL_BASE_URL = `${process.env.GRAPHQL_BASE_URL}/graphql`;

const fetchQuery = async (operation, variables) => {
  try {
    const body = JSON.stringify({
      name: operation.name,
      query: operation.text,
      variables,
    });

    const headers = {
      Accept: 'application/json',
      Authorization: jwtToken.get(),
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };

    const response = await fetchWithRetries(GRAPHQL_BASE_URL, {
      method: 'POST',
      headers,
      body,
      fetchTimeout: 20000,
      retryDelays: [1000, 3000, 5000],
    });

    const data = await handleData(response);

    if (response.status === 401) {
      throw data.errors;
    }

    if (isMutation(operation) && data.errors) {
      throw data.errors;
    }

    if (!data.data) {
      throw data.errors;
    }

    if (data.errors) {
      throw data.errors;
    }

    return data;
  } catch (err) {
    console.log('err: ', err);

    const timeoutRegexp = new RegExp(/Still no successful response after/);
    const serverUnavailableRegexp = new RegExp(/Failed to fetch/);
    if (
      timeoutRegexp.test(err.message) ||
      serverUnavailableRegexp.test(err.message)
    ) {
      throw new Error('Serviço indisponível. Tente novamente mais tarde.');
    }

    throw err;
  }
};

export default fetchQuery;
