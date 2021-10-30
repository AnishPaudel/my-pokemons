
export interface Pokemon {

    name:string,
    nickName?:string,
    url:string,
    id:string|null,
    showDownGifUrl:string,
    imgUrl:string|null,
    detail?:PokemonDetail,
    onTeam?:boolean

}


export interface PokemonDetail{
    base_experience:number,
    height:string,
    weight:string,
    abilities:PokemonAbility[],
    moves:PokemonMove[],
    heldItems:PokemonHeldItems[],
    types:PokemonTypes[]


}

export interface PokemonAbility{
    is_hidden:boolean,
    ability:string
}

export interface PokemonMove{
     name:string,
     
}

export interface PokemonHeldItems{
    name:string
}

export interface PokemonTypes{
    name:string
}