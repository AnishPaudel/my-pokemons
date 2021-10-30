import AuthCacheProvider from "../../core/auth/auth.cacheProvider";
import Auth from "../../core/auth/auth.model";
import { Pokemon } from "../../core/pokemon/pokemon.model";

import { AuthActionTypes, SET_AUTH_NAME_ACTION, LOAD_AUTH_ACTION, SET_AUTH_TEAM_ACTION, RESET_AUTH_ERROR } from "./advActionTypes";


const authCacheProvider = new AuthCacheProvider()

export const setAuthName = (name: string, auth: Auth): AuthActionTypes => {

    const changedAuth = {
        ...auth,
        name: name
    }

    authCacheProvider.storeAuth(changedAuth)

    return {
        type: SET_AUTH_NAME_ACTION,
        auth: changedAuth


    }
}


export const addRemovePokemon = (pokemon: Pokemon, auth: Auth): AuthActionTypes => {

    let authTeam = [
        ...auth.team.reverse()
    ];
    let error: string | undefined = undefined;

    if (authTeam.length > 0) {

        //test is in the team 
        let i = authTeam.findIndex(p => (p.name === pokemon.name))
        if (i === -1) {
            //not on team so add
            if (authTeam.length < 6) {
                authTeam.push({
                    ...pokemon
                });

            } else {
                //notify cannot add 
                error = 'Cannot add more than 6 pokemon '
            }

        } else {
            //remove from team
            pokemon.onTeam = false;
            authTeam = authTeam.filter((p) => (p.name !== pokemon.name))
        }



    } else {
        //just add 
        authTeam.push({
            ...pokemon
        });

    }

    const changedAuth: Auth = {
        ...auth,
        team: authTeam.reverse(),
    }

    authCacheProvider.storeAuth(changedAuth)
    return {
        type: SET_AUTH_TEAM_ACTION,
        auth: changedAuth,
        error

    }
}


export const givePokemonNickName = (nickName: string, pokemon: Pokemon, auth: Auth) => {
    let authTeam = [
        ...auth.team
    ];

    //find index
    let i = authTeam.findIndex(p => p.name === pokemon.name)

    if (i !== -1) {
        //replace
        authTeam[i] = {
            ...authTeam[i],
            nickName: nickName

        }
    }

    const changedAuth: Auth = {
        ...auth,
        team: authTeam,
    }
    authCacheProvider.storeAuth(changedAuth)
    return {
        type: SET_AUTH_TEAM_ACTION,
        auth: changedAuth,
        

    }
}

export const loadAuthAction = (): AuthActionTypes => {

    let auth = authCacheProvider.getAuth();

    return {
        type: LOAD_AUTH_ACTION,
        auth
    }
}

export const resetAuthError = (): AuthActionTypes => {
    return {
        type: RESET_AUTH_ERROR
    }
}