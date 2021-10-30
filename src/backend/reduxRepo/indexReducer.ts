
import {combineReducers} from "redux";



import authReducer from './auth/auth.reducers';
import pokmonListReducer from "./pokemonList/pokemonList.reducers";
import pokemonReducer from "./pokemon/pokemon.reducers";
const appReducer = combineReducers(
                                        {
                                          
                                          authState:authReducer,
                                          pokemonList:pokmonListReducer,
                                          pokemonState:pokemonReducer
                                          
                                        }
                                    );

const rootReducer = (state: any, action:any) => {

return appReducer(state, action)
}

export  default  rootReducer;
