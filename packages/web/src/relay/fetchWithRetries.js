/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
const DEFAULT_TIMEOUT = 15000;
const DEFAULT_RETRIES = [1000, 3000];

function fetchWithRetries(uri, initWithRetries) {
  const { fetchTimeout, retryDelays, ...init } = initWithRetries || {};

  const _fetchTimeout = fetchTimeout != null ? fetchTimeout : DEFAULT_TIMEOUT;
  const _retryDelays = retryDelays != null ? retryDelays : DEFAULT_RETRIES;

  let requestsAttempted = 0;
  let requestStartTime = 0;
  return new Promise((resolve, reject) => {
    /**
     * Sends a request to the server that will timeout after `fetchTimeout`.
     * If the request fails or times out a new request might be scheduled.
     */
    function sendTimedRequest() {
      requestsAttempted += 1;
      requestStartTime = Date.now();
      let isRequestAlive = true;

      const request = fetch(uri, init);
      const requestTimeout = setTimeout(() => {
        isRequestAlive = false;
        if (shouldRetry(requestsAttempted)) {
          console.log('fetchWithRetries: HTTP timeout, retrying.');
          retryRequest();
        } else {
          reject(
            new Error(
              `fetchWithRetries(): Failed to get response from server, tried ${requestsAttempted} times. Try again later.`,
            ),
          );
        }
      }, _fetchTimeout);

      request
        .then(response => {
          clearTimeout(requestTimeout);
          if (isRequestAlive) {
            // We got a response, we can clear the timeout.
            if (response.status >= 200 && response.status < 300) {
              // Got a response code that indicates success, resolve the promise.
              resolve(response);
            } else if (response.status >= 500) {
              const error = new Error();
              error.response = response;
              reject(error);
            } else if (shouldRetry(requestsAttempted)) {
              // Fetch was not successful, retrying.
              // eslint-disable-next-line
              console.log('fetchWithRetries: HTTP timeout, retrying.');
              retryRequest();
            } else {
              // Request was not successful, giving up.
              const error = new Error(
                `fetchWithRetries(): Still no successful response after ${requestsAttempted} retries, giving up.`,
              );
              error.response = response;
              reject(error);
            }
          }
        })
        .catch(error => {
          clearTimeout(requestTimeout);
          if (shouldRetry(requestsAttempted)) {
            retryRequest();
          } else {
            reject(error);
          }
        });
    }

    /**
     * Checks if another attempt should be done to send a request to the server.
     */
    function shouldRetry(attempt) {
      return attempt <= _retryDelays.length;
    }

    /**
     * Schedules another run of sendTimedRequest based on how much time has
     * passed between the time the last request was sent and now.
     */
    function retryRequest() {
      const retryDelay = _retryDelays[requestsAttempted - 1];
      const retryStartTime = requestStartTime + retryDelay;
      // eslint-disable-next-line no-use-before-define
      // Schedule retry for a configured duration after last request started.
      setTimeout(sendTimedRequest, retryStartTime - Date.now());
    }

    sendTimedRequest();
  });
}

export default fetchWithRetries;
