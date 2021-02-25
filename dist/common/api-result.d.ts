export declare enum ApiStatus {
    SUCCESS = "success",
    ERROR = "error"
}
export declare class ApiResult<T> {
    status: ApiStatus;
    code: number;
    errorCode: string;
    message: string;
    numberResult: number;
    data: T;
    success(data?: T, numberResult?: number, message?: string): this;
    setMessage(message: string): this;
    error(message: string, code?: number, errorCode?: string): this;
}
