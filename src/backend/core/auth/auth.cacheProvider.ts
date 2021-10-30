
import Auth from "./auth.model"


const POKEMON_AUTH_SESSION_KEY = 'session_auth_pokemon'

export default class AuthCacheProvider{

    getAuth =():Auth|null=>{
        const aS = window.localStorage.getItem(POKEMON_AUTH_SESSION_KEY);
        return aS?JSON.parse(aS) as Auth:null;
    }

    storeAuth=(auth:Auth)=>{
        return window.localStorage.setItem(POKEMON_AUTH_SESSION_KEY,JSON.stringify(auth))
    }
} 