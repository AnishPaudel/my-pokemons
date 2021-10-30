import { ErrorPokemon } from "./errorPokemon";


export interface ServiceResponse {
    error?: ErrorPokemon,
    hasError: boolean,
}

