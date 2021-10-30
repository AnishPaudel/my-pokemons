import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../common/baseUrl";




export const getPokemonList = (offset:number,limit:number): Promise<AxiosResponse> => {
    
   
    return axios.get(`${BASE_URL}/pokemon-species/?offset=${offset}&limit=${limit}`);

    
}


export const getPokemonDetail =(nameId:string)=>{

    return axios.get(`${BASE_URL}/pokemon/${nameId}`);
}

// https://play.pokemonshowdown.com/sprites/ani/nidoranm.gif


// export const getRandomPokemon =():Promise<AxiosResponse> => {
    
  
//     return axios.get(`${BASE_URL}/advertisement/all/active/home-page/`);

    
// }


// export const getPokemonDetail=():Promise<AxiosResponse> =>{
//     return axios.get(`${BASE_URL}/advertisement/all/active/home-page/`);
// }