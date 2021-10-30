import {
  ChakraProvider
} from "@chakra-ui/react"
import * as React from "react"
import { connect, ConnectedProps } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { bindActionCreators } from "redux"
import { loadAuthAction } from "./backend/reduxRepo/auth/auth.action"
import { AuthState } from "./backend/reduxRepo/auth/auth.state"
import Routes from "./routes"
import theme from "./theme"
import ErrorAlert from "./widget/ErrorAlert"
import PokemonDetailDialog from "./widget/PokemonDetailDialog"

const mapStateToProps = (state: any) => {


  return ({

    authState: state.authState as AuthState
  })
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    loadAuthAction
  }, dispatch);
}

const connector = connect(mapStateToProps, mapDispatchToProps);



type Props = ConnectedProps<typeof connector>

const App: React.FC<Props> = (props) => {

  React.useEffect(() => {

    if (!props.authState.loaded) {
      props.loadAuthAction()
    }

  }, [])

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        {
          props.authState.loaded ?
            <Routes /> : 'loading...'
        }
        {/* pokemon detail  */}
        <PokemonDetailDialog />
        {/* auth errors detail  */}
        <ErrorAlert />
      </BrowserRouter>
    </ChakraProvider>
  )




}

export default connector(App)