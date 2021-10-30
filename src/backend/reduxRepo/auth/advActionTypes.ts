import Auth from "../../core/auth/auth.model";

export const SET_AUTH_NAME_ACTION = 'SET_AUTH_NAME_ACTION';
export const SET_AUTH_TEAM_ACTION = 'SET_AUTH_TEAM_ACTION';
export const RESET_AUTH_ERROR = 'RESET_AUTH_ERROR';

export const LOAD_AUTH_ACTION = 'LOAD_AUTH_ACTION';

interface SetAuthNameAction  {
    type: typeof SET_AUTH_NAME_ACTION
    auth:Auth
    
}

interface SetAuthTeamAction {
    type: typeof SET_AUTH_TEAM_ACTION,
    auth:Auth,
    error?:string
}

interface LoadAuthTeamAction{
    type: typeof LOAD_AUTH_ACTION,
    auth:Auth|null
}

interface ResetAuthError {
    type: typeof RESET_AUTH_ERROR,
}


export type AuthActionTypes =
    SetAuthNameAction | SetAuthTeamAction |LoadAuthTeamAction|ResetAuthError
 