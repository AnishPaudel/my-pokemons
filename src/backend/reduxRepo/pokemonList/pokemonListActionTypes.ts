


import { Pokemon } from "../../core/pokemon/pokemon.model";
import { BaseResponseAction } from "../base_action";

export const POKEMON_LIST_RESPONSE = 'POKEMON_LIST_RESPONSE';
export const SET_POKEMON_LIST_PROGRESS_ACTION = 'SET_POKEMON_LIST_PROGRESS_ACTION'



interface PokemonListResponse extends BaseResponseAction {
    type: typeof POKEMON_LIST_RESPONSE;
    pokemons: Pokemon[],
  
}

interface SetPokemonAdvProgress {
    type: typeof SET_POKEMON_LIST_PROGRESS_ACTION,
    progress: boolean,
    search?:string //puting in the state for future use
}



export type PokemonListActionTypes =
    PokemonListResponse | SetPokemonAdvProgress ;

