export function useCookie(): {
  getCookie: (name: string) => string | undefined;
  // eslint-disable-next-line
  setCookie: (name: string, value: string, options?: any) => void;
  deleteCookie: (name: string) => void;
} {
  const getCookie = (name: string) => {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'),
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };

  // eslint-disable-next-line
  const setCookie = (name: string, value: string, options: any = {}) => {
    options = {
      path: '/',
      ...options,
    };
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    for (const optionKey in options) {
      updatedCookie += '; ' + optionKey;
      const optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += '=' + optionValue;
      }
    }
    document.cookie = updatedCookie;
  };

  const deleteCookie = (name: string) => {
    setCookie(name, '', {
      'max-age': -1,
    });
  };

  return {
    getCookie,
    setCookie,
    deleteCookie,
  };
}
