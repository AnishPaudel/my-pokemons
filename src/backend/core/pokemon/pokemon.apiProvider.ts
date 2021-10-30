import { AxiosResponse } from "axios";

import * as api from "./pokemon.api";

import { Pokemon, PokemonAbility, PokemonDetail, PokemonHeldItems, PokemonMove, PokemonTypes, } from "./pokemon.model";
import { PokemonListResponse, PokemonResponse } from "./pokemon.responseModel";
import { ErrorPokemon, ErrorType } from "../common/errorPokemon";

const getIdFromUrl = (pokeUrl: string): string | null => {

    let m = pokeUrl.split('/');

    if (m.length > 2) {
        return m[m.length - 2]
    }
    else {
        return null
    }


}

export class PokemonApiProvider {


    providePokemonList = async (offset: number, limit: number): Promise<PokemonListResponse> => {
        const res: AxiosResponse = await api.getPokemonList(offset, limit)
        let response: PokemonListResponse;

        if (res.status === 200) {

            ///////////////

            let responseData = res.data

            let results = responseData['results'] as Array<any>;
            const count: number = responseData['count'] ?? 0

            let pokemonList: Pokemon[] = [];

            for (var m of results) {

                const name: string = m['name'] ?? '';
                const url: string = m['url'] ?? '';
                const id = getIdFromUrl(url)

                let pokemon: Pokemon = {
                    name,
                    url,
                    id, // getting id from url (in order to avoid another call)
                    showDownGifUrl: `https://play.pokemonshowdown.com/sprites/ani/${name.replace(/-/g, '')}.gif`,
                    imgUrl: id ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` : null

                }



                pokemonList.push(pokemon);
            }

            response = { hasError: false, pokemonList, count }

            ////////////////////


        } else {
            let error: ErrorPokemon = { errorMsg: `Error : ${res.status} ,${res.statusText} `, errorType: ErrorType.ERROR_FETCHING_INFO }
            response = {
                hasError: true,
                pokemonList: [],
                error: error
            }
        }
        return response;
    }


    //get pokemon detail 
    providePokemonDetail = async (pokemon: Pokemon): Promise<PokemonResponse> => {
        const res: AxiosResponse = await api.getPokemonDetail(pokemon.id??pokemon.name)
        let response: PokemonResponse;

        if (res.status === 200) {

            ///////////////

            let responseData = res.data

            //detail initial 
            let pokemonDetail: PokemonDetail = {
                abilities: [],
                base_experience: responseData['base_experience'] ?? 0,
                height: `${((responseData['height'] ?? 0) * .1).toFixed(2)} m`,
                weight: `${((responseData['weight'] ?? 0) * .1).toFixed(2)} kg`,
                heldItems: [],
                moves: [],
                types: []

            }

            //ability
            let abilitesR = responseData['abilities'] as Array<any>;
            let abilities: PokemonAbility[] = [];

            for (var ab of abilitesR) {

                const a: any = ab['ability'] ?? { name: '' };

                let ability: PokemonAbility = {
                    ability: a['name'] ?? '',
                    is_hidden: ab['is_hidden']
                }

                abilities.push(ability);
            }
            pokemonDetail.abilities = abilities;

            //heldItems
            let heldItemR = responseData['held_items'] as Array<any>;
            let heldItems: PokemonHeldItems[] = [];

            for (var h of heldItemR) {

                const a: any = h['item'] ?? { name: '' };

                let heldItem: PokemonHeldItems = {
                    name: a['name'] ?? '',
                }

                heldItems.push(heldItem);
            }

            pokemonDetail.heldItems = heldItems;

             //movesItems
             let movesR = responseData['moves'] as Array<any>;
             let moves: PokemonMove[] = [];
 
             for (var mV of movesR) {
 
                 const a: any = mV['move'] ?? { name: '' };
 
                 let move: PokemonMove = {
                     name: a['name'] ?? '',
                 }
 
                 moves.push(move);
             }
 
             pokemonDetail.moves = moves;

               //types
               let typesR = responseData['types'] as Array<any>;
               let typE: PokemonTypes[] = [];
   
               for (var tP of typesR) {
   
                   const a: any = tP['type'] ?? { name: '' };
   
                   let move: PokemonTypes = {
                       name: a['name'] ?? '',
                   }
   
                   typE.push(move);
               }
   
               pokemonDetail.types = typE;




            response = {
                hasError: false, pokemon: {
                    ...pokemon,
                    detail: pokemonDetail
                }
            }

            ////////////////////


        } else {
            let error: ErrorPokemon = { errorMsg: `Error : ${res.status} ,${res.statusText} `, errorType: ErrorType.ERROR_FETCHING_INFO }
            response = {
                hasError: true,
                error: error
            }
        }
        return response;
    }

}