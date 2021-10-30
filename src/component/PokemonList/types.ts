import { Pokemon } from "../../backend/core/pokemon/pokemon.model";

export interface PokemonListProps{
    list:Pokemon[],
    onCLick:(pokemon:Pokemon)=>void,
    onSelected:(pokemon:Pokemon)=>void
}