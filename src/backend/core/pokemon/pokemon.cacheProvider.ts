import { Pokemon } from "./pokemon.model";

const POKEMON_SESSION_KEY = 'session_pokemon'

export default class PokemonCacheProvider{

    getAllStoredPokemons =():Pokemon[]=>{
        return JSON.parse(window.sessionStorage.getItem(POKEMON_SESSION_KEY)??'[]') as Pokemon[]
    }

    storePokemons=(pokemons:Pokemon[])=>{
        return window.sessionStorage.setItem(POKEMON_SESSION_KEY,JSON.stringify(pokemons))
    }
} 