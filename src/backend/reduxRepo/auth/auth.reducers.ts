import { AuthActionTypes, LOAD_AUTH_ACTION, RESET_AUTH_ERROR, SET_AUTH_NAME_ACTION, SET_AUTH_TEAM_ACTION } from './advActionTypes';
import { AuthState } from './auth.state';




const initialState: AuthState = {
    auth: {
        name: '',
        team: []
    },
    loaded: false

}

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {


    switch (action.type) {


        case SET_AUTH_NAME_ACTION:

            return {
                ...state,
                auth: action.auth
            }

        case SET_AUTH_TEAM_ACTION:

            return {
                ...state,
                auth: action.auth,
                error:action.error
            }

        case LOAD_AUTH_ACTION:

            if (action.auth) {
                return {
                    ...state,
                    auth: action.auth,
                    loaded: true // cache is loaded
                }
            }

            return {
                ...state,
                loaded: true // tried to get from cache
            }

        case RESET_AUTH_ERROR:
            return{
                ...state,
                error:undefined
            }


        default:
            return state;
    }
}

export default authReducer
