import { ErrorType } from "../common/errorPokemon";
import { PokemonApiProvider } from "./pokemon.apiProvider";
import PokemonCacheProvider from "./pokemon.cacheProvider";
import { Pokemon } from "./pokemon.model";

import { PokemonListResponse, PokemonResponse } from "./pokemon.responseModel";



export default class PokemonRepository {

    cacheProvider: PokemonCacheProvider = new PokemonCacheProvider();

    apiProvider: PokemonApiProvider = new PokemonApiProvider();


    //tries from session other wise gets from api
    searchPokemon = async (searchString: string, force?: boolean): Promise<PokemonListResponse> => {

        // let response: PokemonListResponse = { pokemonList: [], hasError: true }

        let pokemonList: Pokemon[] = [];
        //get from cache if not forced
        if (!force) {
            pokemonList = this.cacheProvider.getAllStoredPokemons();
        }

        if (pokemonList.length === 0) {
            //get count first
            const countRes = await this.apiProvider.providePokemonList(0, 1);

            if (!countRes.hasError && countRes.count) {
                //get all pokemons
                const AllPokemonRes = await this.apiProvider.providePokemonList(0, countRes.count);

                if (AllPokemonRes.pokemonList.length > 0) {
                    //store
                    this.cacheProvider.storePokemons(AllPokemonRes.pokemonList);
                    // filter 
                    AllPokemonRes.pokemonList = this._filterPokemon(searchString, AllPokemonRes.pokemonList)
                }

                return AllPokemonRes
            }

            return countRes
        }
        //with cache response
        return {
            hasError: false,
            pokemonList: this._filterPokemon(searchString, pokemonList)
        }

    }

    _filterPokemon = (s: string, pList: Pokemon[]): Pokemon[] => {
        return pList.filter((p) => p.name.toLocaleLowerCase().includes(s.toLocaleLowerCase()))
    }

    _getRandomPokemon = (pList: Pokemon[]): Pokemon => {
        const max = pList.length - 1;
        const randomIndex = Math.floor(Math.random() * max);
        return pList[randomIndex];

    }


    //tries from session other wise gets from api
    getRandomPokemon = async ( force?: boolean): Promise<PokemonResponse> => {

        // let response: PokemonListResponse = { pokemonList: [], hasError: true }

        let pokemonList: Pokemon[] = [];
        //get from cache if not forced
        if (!force) {
            pokemonList = this.cacheProvider.getAllStoredPokemons();
        }

        if (pokemonList.length === 0) {
            //get count first
            const countRes = await this.apiProvider.providePokemonList(0, 1);

            if (!countRes.hasError && countRes.count) {
                //get all pokemons
                const AllPokemonRes = await this.apiProvider.providePokemonList(0, countRes.count);

                if (AllPokemonRes.pokemonList.length > 0) {
                    //store
                    this.cacheProvider.storePokemons(AllPokemonRes.pokemonList);
                    // filter 
                    return {
                        hasError: false,
                        pokemon: this._getRandomPokemon(AllPokemonRes.pokemonList)
                    }
                }


                return {
                    hasError: true,
                    error: AllPokemonRes.error ?? {
                        errorMsg: 'Unkown Error with pokemon count ',// cant have condition where count is present (from server) and has error,
                        errorType: ErrorType.ERROR_FETCHING_INFO
                    }
                }
            }

            return countRes
        }
        //with cache response
        return {
            hasError: false,
            pokemon: this._getRandomPokemon(pokemonList)
        }

    }


    getPokemonDetails = async (p:Pokemon,force:boolean): Promise<PokemonResponse> => {
        // let response: PokemonListResponse = { pokemonList: [], hasError: true }

        let pokemon ={
            ...p
        }
        let cachepokemonList: Pokemon[]= this.cacheProvider.getAllStoredPokemons();
    
        //get from cache if not forced
        if (!force) {
             
            let cp = cachepokemonList.find(pk=>pk.name===pokemon.name);
            if(cp && cp.detail){
                pokemon.detail = cp.detail;

                return{
                    hasError:false,
                    pokemon,
                }
            }

        }


        let pResponse = await this.apiProvider.providePokemonDetail(pokemon);

        
        //update the cache 
        let responsePokemon = pResponse.pokemon
        if(responsePokemon &&responsePokemon.detail ){

            if(cachepokemonList.length===0){
                cachepokemonList.push(responsePokemon);

            }else{
                //find cached pokemon
                let cachep = cachepokemonList.find(pk=>pk.name===responsePokemon!.name);

                if(cachep){
                    
                    //update detail
                    cachep.detail = responsePokemon.detail
                }
            }
            //update cache

            this.cacheProvider.storePokemons([...cachepokemonList]);
        }
       
        //with cache response
        return {
            ...pResponse
        }

    }




}