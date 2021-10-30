import React from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import {
    ROUTE_TO_DETAIL,
    ROUTE_TO_INTRO,
    ROUTE_TO_PAGE_NOT_FOUND,
    ROUTE_TO_HOME
} from "./constants";

import IntroPage from '../pages/intro'
import PokemonDetailPage from '../pages/detail'
import HomePage from '../pages/home'
import PageNotFoundPage from "../pages/pageNotFound";
import Layout from "../component/hoc/layout";

//describs route to diffrent pages
const Routes: React.FC = () => {

    return (
        <React.Fragment>
            <Layout>
                <Switch>

                    <Route exact path={'/'} component={
                        (_: RouteComponentProps) => {

                            return (
                                <Redirect to={ROUTE_TO_INTRO} />
                            )
                        }
                    } />
                   
                    <Route exact path={ROUTE_TO_INTRO} component={IntroPage}/>
                    <Route exact path={ROUTE_TO_DETAIL} component={PokemonDetailPage}/>
                    <Route exact path={ROUTE_TO_HOME} component={HomePage}/>
                    <Route exact path={ROUTE_TO_PAGE_NOT_FOUND} component={PageNotFoundPage}/>
                    <Route  path={'/'} component={()=>(<Redirect to={ROUTE_TO_PAGE_NOT_FOUND}/>)}/>
                 
                </Switch>
                </Layout>
        </React.Fragment>

    )
}

export default Routes;