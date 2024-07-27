type BaseResponse<T> = {
    status: string;
    data: T | null;
    message: string | null;
    error: unknown;
}

export default BaseResponse;