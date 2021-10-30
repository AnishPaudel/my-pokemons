import { ErrorPokemon } from "../../core/common/errorPokemon";
import { Pokemon } from "../../core/pokemon/pokemon.model";


export interface PokemonListState {
   pokemonList:Pokemon[],
   searchPram:string,
   progress:boolean,
   hasError:boolean,
   error?: ErrorPokemon
}