
import { ErrorPokemon, ErrorType } from "../../core/common/errorPokemon";
import PokemonRepository from "../../core/pokemon/pokemon.repository";
import store from "../store";
import { PokemonListActionTypes, POKEMON_LIST_RESPONSE, SET_POKEMON_LIST_PROGRESS_ACTION } from "./pokemonListActionTypes";





const pokemonRepo = new PokemonRepository();

export const fetchPokemonList = async (searchPram: string): Promise<PokemonListActionTypes> => {
   store.dispatch(setPokemonListProgress(true, searchPram))
   const response = await pokemonRepo.searchPokemon(searchPram);

   let error =  response.error;

   //has no pokemon on search
   if(!response.hasError && response.pokemonList.length===0){
      error = {
         errorMsg:`No pokemon matching "${searchPram}" found . Please try again`,
         errorType:ErrorType.ERROR_FILTER_NO_DATA
      }
   }

   return {
      type: POKEMON_LIST_RESPONSE,
      hasError: response.hasError,
      pokemons: response.pokemonList ?? [],
      error: error,

   }
}


export const setPokemonListProgress = (progress: boolean, search?: string): PokemonListActionTypes => {
   return {
      type: SET_POKEMON_LIST_PROGRESS_ACTION,
      progress: progress,
      search,

   }
}


