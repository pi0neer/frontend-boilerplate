export function useHttpClient(
  baseURL: string,
  interceptors?: {
    // eslint-disable-next-line
    onResponse?: ({ request, response, options }: { request: any; response: any; options: any }) => void;
    // eslint-disable-next-line
    onResponseError?: ({ request, response, options }: { request: any; response: any; options: any }) => void;
    // eslint-disable-next-line
    onRequest?: ({ request, options }: { request: any; options: any }) => void;
    // eslint-disable-next-line
    onRequestError?: ({ request, error, options }: { request: any; error: any; options: any }) => void;
  },
) {
  const fetch = (
    method: 'post' | 'patch' | 'put' | 'get' | 'delete',
    request: string,
    // eslint-disable-next-line
    opts?: { body?: any; headers?: any },
  ) => {
    if (opts?.body) {
      return $fetch(request, {
        method,
        baseURL,
        body: { ...opts?.body },
        headers: { 'Content-Type': 'application/json', ...opts?.headers },
        onResponse: interceptors?.onResponse,
        onResponseError: interceptors?.onResponseError,
        onRequest: interceptors?.onRequest,
        onRequestError: interceptors?.onRequestError,
      });
    }

    return $fetch(request, {
      method,
      baseURL,
      onResponse: interceptors?.onResponse,
      onResponseError: interceptors?.onResponseError,
      onRequest: interceptors?.onRequest,
      onRequestError: interceptors?.onRequestError,
      headers: { 'Content-Type': 'application/json', ...opts?.headers },
    });
  };
  return {
    get: (
      request: string,
      // eslint-disable-next-line
      opts?: { body?: any; headers?: any },
    ) => fetch('get', request.toString(), opts),
    post: (
      request: string,
      // eslint-disable-next-line
      opts?: { body?: any; headers?: any },
    ) => fetch('post', request.toString(), opts),
    put: (
      request: string,
      // eslint-disable-next-line
      opts?: { body?: any; headers?: any },
    ) => fetch('put', request.toString(), opts),
    patch: (
      request: string,
      // eslint-disable-next-line
      opts?: { body?: any; headers?: any },
    ) => fetch('patch', request.toString(), opts),
    delete: (
      request: string,
      // eslint-disable-next-line
      opts?: { body?: any; headers?: any },
    ) => fetch('delete', request.toString(), opts),
  };
}
