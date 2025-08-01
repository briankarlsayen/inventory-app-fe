import { routeGetApi, routePostApi } from ".";

interface ILoginApi {
  username: string;
  password: string;
}

interface ILoginResponse {
  access?: string;
  refresh?: string;
  error?: string;
  success: boolean;
}

interface IDefaultGetApiResponse {
  data: any[];
  success: boolean;
}

export const loginApi = async (params: ILoginApi): Promise<ILoginResponse> => {
  return await routePostApi({ apiRoute: "/auth/login/", params })
    .then(({ data, success }) => {
      return { ...data, success };
    })
    .catch(({ data, success }) => {
      return { ...data, success };
    });
};

export const getStocksApi = async (): Promise<IDefaultGetApiResponse> => {
  return await routeGetApi({ apiRoute: "/stock/" })
    .then(({ data, success }) => {
      return { data, success };
    })
    .catch(({ data, success }) => {
      return { ...data, success };
    });
};

export const getStockItemsApi = async (): Promise<IDefaultGetApiResponse> => {
  return await routeGetApi({ apiRoute: "/item/" })
    .then(({ data, success }) => {
      return { data, success };
    })
    .catch(({ data, success }) => {
      return { ...data, success };
    });
};
