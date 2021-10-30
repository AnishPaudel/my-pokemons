import { PokemonListActionTypes, POKEMON_LIST_RESPONSE, SET_POKEMON_LIST_PROGRESS_ACTION } from './pokemonListActionTypes';
import { PokemonListState } from './pokemonList.state';




const initialState: PokemonListState = {
    hasError: false,
    progress: false,
    searchPram: '',
    pokemonList: []

}

const pokmonListReducer = (state = initialState, action: PokemonListActionTypes): PokemonListState => {


    switch (action.type) {


        case POKEMON_LIST_RESPONSE:

            return {
                ...state,
                pokemonList: action.pokemons,
                error: action.error,
                hasError: action.hasError,
                progress: false,


            }


        case SET_POKEMON_LIST_PROGRESS_ACTION:
            return {
                ...state,
                progress: action.progress,
                searchPram: action.search??''
            }


        default:
            return state;
    }
}

export default pokmonListReducer
