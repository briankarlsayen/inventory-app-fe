import { routeDeleteApi, routeGetApi, routePostApi, routeUpdateApi } from ".";

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

interface ICreateStockReq {
  type: string;
  item: string;
  quantity: number;
  date: string;
}

interface ICreateProductReq {
  name: string;
  description: string;
  price: number;
  type: string;
  size: string;
}

interface IUpdateProductReq extends ICreateProductReq {
  id: string;
}

interface IUpdateStockReq extends ICreateStockReq {
  id: string;
}

interface ICreateStockItemReq {
  name: string;
  unit: string;
  reorder_level: number;
  category: string;
}

interface IUpdateStockItemReq extends ICreateStockItemReq {
  id: string;
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

export const getItemCategoriesApi =
  async (): Promise<IDefaultGetApiResponse> => {
    return await routeGetApi({ apiRoute: "/category/" })
      .then(({ data, success }) => {
        return { data, success };
      })
      .catch(({ data, success }) => {
        return { ...data, success };
      });
  };

export const createStockItemApi = async (
  props: ICreateStockItemReq
): Promise<IDefaultGetApiResponse> => {
  return await routePostApi({ params: props, apiRoute: "/item/" })
    .then(({ data, success }) => {
      return { data, success };
    })
    .catch(({ data, success }) => {
      return { ...data, success };
    });
};

export const updateStockItemApi = async (
  props: IUpdateStockItemReq
): Promise<IDefaultGetApiResponse> => {
  return await routeUpdateApi({
    apiRoute: "/item/" + props?.id,
    params: props,
  })
    .then(({ data, success }) => {
      return { data, success };
    })
    .catch(({ data, success }) => {
      return { ...data, success };
    });
};

export const archiveStockItemApi = async (
  id: string
): Promise<IDefaultGetApiResponse> => {
  return await routeDeleteApi({
    apiRoute: "/item/" + id,
  })
    .then(({ data, success }) => {
      return { data, success };
    })
    .catch(({ data, success }) => {
      return { ...data, success };
    });
};

export const createStockApi = async (
  props: ICreateStockReq
): Promise<IDefaultGetApiResponse> => {
  return await routePostApi({ apiRoute: "/stock/", params: props })
    .then(({ data, success }) => {
      return { data, success };
    })
    .catch(({ data, success }) => {
      return { ...data, success };
    });
};
export const updateStockApi = async (
  props: IUpdateStockReq
): Promise<IDefaultGetApiResponse> => {
  return await routeUpdateApi({
    apiRoute: "/stock/" + props?.id,
    params: props,
  })
    .then(({ data, success }) => {
      return { data, success };
    })
    .catch(({ data, success }) => {
      return { ...data, success };
    });
};

export const archiveStockApi = async (
  id: string
): Promise<IDefaultGetApiResponse> => {
  return await routeDeleteApi({
    apiRoute: "/stock/" + id,
  })
    .then(({ data, success }) => {
      return { data, success };
    })
    .catch(({ data, success }) => {
      return { ...data, success };
    });
};

// PRODUCT APIS
export const getProductsApi = async (): Promise<IDefaultGetApiResponse> => {
  return await routeGetApi({ apiRoute: "/product/" })
    .then(({ data, success }) => {
      return { data, success };
    })
    .catch(({ data, success }) => {
      return { ...data, success };
    });
};

export const createProductApi = async (
  props: ICreateProductReq
): Promise<IDefaultGetApiResponse> => {
  return await routePostApi({ apiRoute: "/product/", params: props })
    .then(({ data, success }) => {
      return { data, success };
    })
    .catch(({ data, success }) => {
      return { ...data, success };
    });
};
export const updateProductApi = async (
  props: IUpdateProductReq
): Promise<IDefaultGetApiResponse> => {
  return await routeUpdateApi({
    apiRoute: "/product/" + props?.id,
    params: props,
  })
    .then(({ data, success }) => {
      return { data, success };
    })
    .catch(({ data, success }) => {
      return { ...data, success };
    });
};

export const archiveProductApi = async (
  id: string
): Promise<IDefaultGetApiResponse> => {
  return await routeDeleteApi({
    apiRoute: "/product/" + id,
  })
    .then(({ data, success }) => {
      return { data, success };
    })
    .catch(({ data, success }) => {
      return { ...data, success };
    });
};

// ORDERS APIS
export const getOrdersApi = async (): Promise<IDefaultGetApiResponse> => {
  return await routeGetApi({ apiRoute: "/order/" })
    .then(({ data, success }) => {
      return { data, success };
    })
    .catch(({ data, success }) => {
      return { ...data, success };
    });
};
