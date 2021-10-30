import { Pokemon } from "../../backend/core/pokemon/pokemon.model";

export interface TeamPokemonListProps{
  team:Pokemon[],
  onDeleteClickHandler:(p:Pokemon)=>void,
  onClick:(p:Pokemon)=>void
  
}