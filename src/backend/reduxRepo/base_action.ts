
// // import { ErrorAcademe } from "@academe-org/academe-core/lib";

import { ErrorPokemon } from "../core/common/errorPokemon";



export interface BaseResponseAction {
    error?:ErrorPokemon,
    hasError:boolean
}