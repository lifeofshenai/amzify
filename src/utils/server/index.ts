const getUrl = (url: string, version: number) => `/api/v${version}${url}`;

export {sendErrorResponse, sendSuccessResponse} from "./response";
