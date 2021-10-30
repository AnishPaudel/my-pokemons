import Auth from "../../core/auth/auth.model";
import { ErrorPokemon } from "../../core/common/errorPokemon";


export interface AuthState {
    auth:Auth,
    loaded:boolean,
    error?:string,
    
    
}