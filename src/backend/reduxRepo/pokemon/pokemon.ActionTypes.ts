


import { Pokemon } from "../../core/pokemon/pokemon.model";
import { BaseResponseAction } from "../base_action";

export const POKEMON_DETAIL_RESPONSE = 'POKEMON_DETAIL_RESPONSE';
export const SET_POKEMON_DETAIL_PROGRESS_ACTION = 'SET_POKEMON_DETAIL_PROGRESS_ACTION'

export const OPEN_CLOSE_POKEMON_DETAIL_DIALOG = 'OPEN_CLOSE_POKEMON_DETAIL_DIALOG';
export const OPEN_RANDOM_POKEMON_DETAIL_DIALOG = 'OPEN_RANDOM_POKEMON_DETAIL_DIALOG';

interface PokemonDetailResponse extends BaseResponseAction {
    type: typeof POKEMON_DETAIL_RESPONSE;
    pokemon?: Pokemon,
  
}

interface SetPokemonDetailProgress {
    type: typeof SET_POKEMON_DETAIL_PROGRESS_ACTION,
    progress: boolean,
    
}

interface OpenClosePokemonDetailDialog{
    type:typeof OPEN_CLOSE_POKEMON_DETAIL_DIALOG,
    pokemon?:Pokemon
}

interface OpenRandomPokemonDetailDialog extends BaseResponseAction{
    type:typeof OPEN_RANDOM_POKEMON_DETAIL_DIALOG,
    pokemon?:Pokemon
}

export type PokemonActionTypes =
    PokemonDetailResponse | SetPokemonDetailProgress|OpenClosePokemonDetailDialog|OpenRandomPokemonDetailDialog ;

