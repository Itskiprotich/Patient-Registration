export const getRequestConfig = (headers?: any) => {
    const config = {
      headers: { 
        'Accept':'application/fhir+json',
        'Content-Type': 'application/json',
      },
    };
    if (headers) {
      config.headers = Object.assign({}, config.headers, headers);
    }
    return config;
  };
  