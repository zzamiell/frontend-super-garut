
export const api = {
  provider: (
    url: string,
    queryParams?: Record<string, string> | undefined,
    body?:
      | Record<
          string,
          boolean | string | "" | string[] | undefined | null | object[]
        >
      | FormData
      | undefined,
    headers?: Record<string, string> | undefined,
    isByte?: boolean
  ): { newUrl: string; newHeaders: Record<string, string> } => {
    // const { token } = useAuth();
    const baseUrl = useRuntimeConfig().public.baseAPI;
    // const baseUrl =  "https://fvgm3vgk-9000.asse.devtunnels.ms"
    
    // if (token.value) {
    //   headers = {
    //     ...headers,
    //     Authorization: `${token.value}`,
    //   };
    // }

    let newHeaders = { ...headers };

    if (!(body instanceof FormData)) {
      newHeaders = {
        "Content-Type": isByte
          ? "application/octet-stream"
          : "application/json",
        ...headers,
      };
    }

    newHeaders = {
      Accept: isByte ? "application/octet-stream" : "application/json",
      ...newHeaders,
    };

    const newUrl = queryParams
      ? `${baseUrl}${url}?${new URLSearchParams(queryParams)}`
      : `${baseUrl}${url}`;

    return { newUrl, newHeaders };
  },

  afterResponse: async <T>(response: Response, isByte: boolean) => {
    const data = isByte ? await response.blob() : await response.json();

    if (response.status === 502) navigateTo("/bad-gateway");

    // if (response.status === 401) useIsUnauthorized().value = true;
    if (response.status >= 400) throw data;

    return data;
  },

  downloadFile: async (
    url: string,
    option?: {
      queryParams?: Record<string, string>;
      headers?: Record<string, string>;
      filename?: string;
      fileType?: string;
    }
  ) => {
    const { newUrl, newHeaders } = api.provider(
      url,
      option?.queryParams,
      undefined,
      option?.headers,
      true
    );

    const response = await fetch(newUrl, {
      method: "GET",
      headers: newHeaders,
    });

    if (!response.ok) throw await response.json();

    const blob = await response.blob();
    const filename = option?.filename || "download";
    const fileType = option?.fileType || blob.type;

    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(objectUrl);
  },
  get: async (
    url: string,
    option?: {
      queryParams?: Record<string, string>;
      headers?: Record<string, string>;
      isByte?: boolean;
    }
  ) => {
    const { newUrl, newHeaders } = api.provider(
      url,
      option?.queryParams,
      undefined,
      option?.headers
    );

    const isByte = option?.isByte || false;
    const response = await fetch(newUrl, {
      method: "GET",
      headers: newHeaders,
    });

    return await api.afterResponse(response, isByte);
  },
  post: async (
    url: string,
    option?: {
      queryParams?: Record<string, string>;
      body?:
        | Record<
            string,
            boolean | string | "" | string[] | undefined | null | object[]
          >
        | FormData;
      headers?: Record<string, string>;
      isByte?: boolean;
    }
  ) => {
    const { newUrl, newHeaders } = api.provider(
      url,
      option?.queryParams,
      option?.body,
      option?.headers,
      option?.isByte
    );

    const isByte = option?.isByte || false;
    const response = await fetch(newUrl, {
      method: "POST",
      headers: newHeaders,
      body:
        option?.body instanceof FormData
          ? option.body
          : JSON.stringify(option?.body),
    });

    return await api.afterResponse(response, isByte);
  },

  put: async (
    url: string,
    option?: {
      queryParams?: Record<string, string>;
      body?: Record<any, any>;
      headers?: Record<string, string>;
      isByte?: boolean;
    }
  ) => {
    const { newUrl, newHeaders } = api.provider(
      url,
      option?.queryParams,
      option?.body,
      option?.headers
    );

    const isByte = option?.isByte || false;
    const response = await fetch(newUrl, {
      method: "PUT",
      headers: newHeaders,
      body:
        option?.body instanceof FormData
          ? option.body
          : JSON.stringify(option?.body),
    });

    return await api.afterResponse(response, isByte);
  },

  patch: async (
    url: string,
    option?: {
      queryParams?: Record<string, string>;
      body?: Record<any, any>;
      headers?: Record<string, string>;
      isByte?: boolean;
    }
  ) => {
    const { newUrl, newHeaders } = api.provider(
      url,
      option?.queryParams,
      option?.body,
      option?.headers
    );

    const isByte = option?.isByte || false;
    const response = await fetch(newUrl, {
      method: "PATCH",
      headers: newHeaders,
      body:
        option?.body instanceof FormData
          ? option.body
          : JSON.stringify(option?.body),
    });

    return await api.afterResponse(response, isByte);
  },

  delete: async (
    url: string,
    option?: {
      queryParams?: Record<string, string>;
      body?: Record<any, any>;
      headers?: Record<string, string>;
      isByte?: boolean;
    }
  ) => {
    const { newUrl, newHeaders } = api.provider(
      url,
      option?.queryParams,
      option?.body,
      option?.headers
    );

    const isByte = option?.isByte || false;
    const response = await fetch(newUrl, {
      method: "DELETE",
      headers: newHeaders,
      body: option?.body ? JSON.stringify(option?.body) : undefined,
    });

    return await api.afterResponse(response, isByte);
  },
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      api
    }
  }
});
