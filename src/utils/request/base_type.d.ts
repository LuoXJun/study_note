import { AxiosRequestConfig, AxiosResponse } from 'axios';

declare global {
  interface ResponseDataType {
    code: string | number;
    message?: string;
    msg?: string;
    data?: any;
  }

  interface IbaseRequestConfig {
    requestIntercepter?: (config: AxiosRequestConfig) => AxiosRequestConfig;

    responseIntercepter?: (
      res: AxiosResponse<ResponseDataType>
    ) => AxiosResponse<ResponseDataType>;

    requestIntercepterCatch?: (err: any) => any;

    responseIntercepterCatch?: (err: any) => any;
  }

  interface IbaseInstanceConfig extends AxiosRequestConfig {
    interceptors?: IbaseRequestConfig;
    isLoading?: boolean;
    loadingText?: string;
  }
}
