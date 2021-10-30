export enum ErrorType {
    ERROR_FETCHING_INFO, ERROR_AUTHENTICATION,ERROR_FILTER_NO_DATA
}

export interface ErrorPokemon {
    errorMsg: string;
    errorType: ErrorType;
}