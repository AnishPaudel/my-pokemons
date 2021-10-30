import { PokemonTypes } from "../pokemon/pokemon.model";


export const getPokemonTypeColor = (type: PokemonTypes): string => {
    switch (type.name) {
        // 1
        case 'fire':
            return '#F08030';
        // 2
        case 'dragon':
            return '#7038F8';
        // 3
        case 'ground':
            return '#E0C068';
        // 4
        case 'normal':
            return '#A8A878';
        //5
        case 'flying':
            return '#A890F0';
        //6
        case 'psychic':
            return '#F85888';
        //7
        case 'grass':
            return '#78C850';
        // 8 
        case 'ice':
            return '#78C850';
        // 9
        case 'electric':
            return '#F8D030';
        // 10
        case 'dark':
            return '#705848';
        // 11
        case 'water':
            return '#6890F0';
        // 12
        case 'poison':
            return '#A040A0';
        // 13
        case 'fighting':
            return '#C03028';
        // 14
        case 'bug':
            return '#A8B820';
        // 15
        case 'rock':
            return '#B8A038';
        // 16
        case 'ghost':
            return '#705898';
        // 17
        case 'steel':
            return '#B8B8D0';
        // 18
        case 'fairy':
            return '#F0B6BC';

        default:
            return ''
    }
}