
import { ErrorType } from "../../core/common/errorPokemon";
import { ServiceResponse } from "../../core/common/serviceResponse";
import { Pokemon } from "../../core/pokemon/pokemon.model";
import PokemonRepository from "../../core/pokemon/pokemon.repository";
import { PokemonResponse } from "../../core/pokemon/pokemon.responseModel";
import store from "../store";
import { OPEN_CLOSE_POKEMON_DETAIL_DIALOG, OPEN_RANDOM_POKEMON_DETAIL_DIALOG, PokemonActionTypes, POKEMON_DETAIL_RESPONSE, SET_POKEMON_DETAIL_PROGRESS_ACTION } from "./pokemon.ActionTypes";





const pokemonRepo = new PokemonRepository();

export const fetchPokemonDetail = async (pokemon:Pokemon,force:boolean): Promise<PokemonActionTypes> => {
   store.dispatch(setPokemonDetailProgress(true))
   const response = await pokemonRepo.getPokemonDetails(pokemon,force).catch(e=>{
      return{
         hasError:true,
         error:{
            errorMsg:`${e}`,
            errorType:ErrorType.ERROR_FETCHING_INFO
         }
      }as PokemonResponse
   });
  
   return {
      type: POKEMON_DETAIL_RESPONSE,
      hasError: response.hasError,
      pokemon: response.pokemon,
      error: response.error,

   }
}


export const setPokemonDetailProgress = (progress: boolean, ): PokemonActionTypes => {
   return {
      type: SET_POKEMON_DETAIL_PROGRESS_ACTION,
      progress: progress,
    

   }
}

export const openCloseDetailDialog =(pokemon?:Pokemon):PokemonActionTypes=>{

   if(pokemon && !pokemon.detail){
      //pokemon has no detail then fetch
      store.dispatch(fetchPokemonDetail(pokemon,false))
   }

   return{
      type:OPEN_CLOSE_POKEMON_DETAIL_DIALOG,
      pokemon
   }
}

export const openRandomPokemon =async():Promise<PokemonActionTypes>=>{
   store.dispatch(setPokemonDetailProgress(true))
   //get random pokemon 
   const r = await pokemonRepo.getRandomPokemon(false).catch(e=>{
      return{
         hasError:true,
         error:{
            errorMsg:`${e}`,
            errorType:ErrorType.ERROR_FETCHING_INFO
         }
      }as PokemonResponse
   });

   if(r.pokemon){
       //get detail 
      const response = await pokemonRepo.getPokemonDetails(r.pokemon,false).catch(e=>{
         return{
            hasError:true,
            error:{
               errorMsg:`${e}`,
               errorType:ErrorType.ERROR_FETCHING_INFO
            }
         }as PokemonResponse
      });

      return{
         type:OPEN_RANDOM_POKEMON_DETAIL_DIALOG,
         pokemon:response.pokemon,
         ...response
      }
   }
  

  
   return{
      type:OPEN_RANDOM_POKEMON_DETAIL_DIALOG,
      ...r
   }
  
}


