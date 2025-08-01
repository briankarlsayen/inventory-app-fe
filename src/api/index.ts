import { instance } from "./instance";

interface DefaultApiResponse {
  success: boolean;
  data: any;
  status: number;
  statusText: string;
}

interface PutApiProps {
  apiRoute: string;
  params?: any;
}

interface PostApiProps {
  apiRoute: string;
  params?: any;
}

interface GetApiProps {
  apiRoute: string;
}

const getHeader = async () => {
  const data = localStorage.getItem("access");
  return data ? "Bearer " + data : "";
};

export const routePostApi = async ({
  apiRoute,
  params,
}: PostApiProps): Promise<DefaultApiResponse> => {
  try {
    const headers = { Authorization: await getHeader() };
    const response = await instance.post(apiRoute, params, {
      headers,
    });
    const { status, data, statusText } = response;
    console.log("status", status);
    return { status, data, statusText, success: true };
  } catch (error: any) {
    const { status, data, statusText } = error?.response ?? "";
    return { status, data, statusText, success: false };
  }
};

export const routeGetApi = async ({
  apiRoute,
}: GetApiProps): Promise<DefaultApiResponse> => {
  try {
    const headers = { Authorization: await getHeader() };

    const response = await instance.get(apiRoute, { headers });
    const { status, data, statusText } = response;
    return { status, data, statusText, success: true };
  } catch (error: any) {
    const { status, data, statusText } = error?.response ?? "";
    return { status, data, statusText, success: false };
  }
};

export const routeUpdateApi = async ({
  apiRoute,
  params,
}: PutApiProps): Promise<DefaultApiResponse> => {
  try {
    const headers = { Authorization: await getHeader() };

    const response = await instance.put(apiRoute, params, { headers });
    return { ...response, success: true };
  } catch (error: any) {
    const { status, data, statusText } = error?.response ?? "";
    return { status, data, statusText, success: false };
  }
};

export const routeDeleteApi = async ({
  apiRoute,
}: GetApiProps): Promise<DefaultApiResponse> => {
  try {
    const headers = { Authorization: await getHeader() };

    const response = await instance.delete(apiRoute, { headers });
    return { ...response, success: true };
  } catch (error: any) {
    const { status, data, statusText } = error?.response ?? "";
    return { status, data, statusText, success: false };
  }
};
