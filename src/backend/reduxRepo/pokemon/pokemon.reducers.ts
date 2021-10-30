import { OPEN_CLOSE_POKEMON_DETAIL_DIALOG, OPEN_RANDOM_POKEMON_DETAIL_DIALOG, PokemonActionTypes, POKEMON_DETAIL_RESPONSE, SET_POKEMON_DETAIL_PROGRESS_ACTION } from './pokemon.ActionTypes';
import { PokemonState } from './pokemon.state';




const initialState: PokemonState = {
    hasError: false,
    progress: false,


}

const pokemonReducer = (state = initialState, action: PokemonActionTypes): PokemonState => {


    switch (action.type) {

        case OPEN_CLOSE_POKEMON_DETAIL_DIALOG:
            return {
                ...state,
                pokemon: action.pokemon,

            }

        case POKEMON_DETAIL_RESPONSE:

            return {
                ...state,                          //dialog is open
                pokemon: (action.pokemon?.detail && state.pokemon) ? action.pokemon : state.pokemon, // if response has detail then only change the pokemon obj
                error: action.error,
                hasError: action.hasError,
                progress: false,


            }


        case SET_POKEMON_DETAIL_PROGRESS_ACTION:
            return {
                ...state,
                progress: action.progress,

            }
        case OPEN_RANDOM_POKEMON_DETAIL_DIALOG:
            return {
                ...state,
                pokemon: action.pokemon,
                progress:false

            }


        default:
            return state;
    }
}

export default pokemonReducer
