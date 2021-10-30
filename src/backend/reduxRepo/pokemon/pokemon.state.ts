import { ErrorPokemon } from "../../core/common/errorPokemon";
import { Pokemon } from "../../core/pokemon/pokemon.model";


export interface PokemonState {
   //this controlls the detail dialog
   pokemon?:Pokemon,
   progress:boolean,
   hasError:boolean,
   error?: ErrorPokemon
}