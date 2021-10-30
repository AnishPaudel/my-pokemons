import { ServiceResponse } from "../common/serviceResponse";
import {  Pokemon } from "./pokemon.model";


export interface PokemonListResponse extends ServiceResponse {
    pokemonList: Pokemon[];
    count?:number
}

export interface PokemonResponse extends ServiceResponse {
    pokemon?: Pokemon;
    
}


