import React from "react"
import { bindActionCreators } from "redux"
import { setAuthName } from "../../backend/reduxRepo/auth/auth.action"
import { AuthState } from "../../backend/reduxRepo/auth/auth.state"
import InstructionName from "../../component/InstructionName"
import { connect, ConnectedProps } from "react-redux";
import InstructionSearch from "../../component/InstructionSearch"
import { Redirect, useHistory } from "react-router-dom"
import { PRAG_GENERATE_RANDOM, PRAG_POKEMON, PRAG_SEARCH, ROUTE_TO_HOME } from "../../routes/constants"

const mapStateToProps = (state: any) => {


    return ({

        authState: state.authState as AuthState
    })
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        setAuthName
    }, dispatch);
}

const connector = connect(mapStateToProps, mapDispatchToProps);



type Props = ConnectedProps<typeof connector>


const IntroPage: React.FC<Props> = (props) => {

    const history = useHistory()


    const onNameEntered = (name: string) => {
        props.setAuthName(name, props.authState.auth)
    }


    const handleRandomClick = () => {
        let pushstate: any = {}
        pushstate[`${PRAG_GENERATE_RANDOM}`] = true
        history.push(ROUTE_TO_HOME, pushstate)
    }

    const handleSearchRequest = (s: string) => {
        let pushstate: any = {}
        pushstate[`${PRAG_SEARCH}`] = s
        history.push(ROUTE_TO_HOME, pushstate)
    }

    return (
        <>
            {
                //check if auth has auth name 
                props.authState.auth.name.length > 0 ?
                    // check if user has pokemon in his heam
                    (props.authState.auth.team.length === 0 ?
                        //if user doesnt have pokemon
                        <InstructionSearch onRandomClicked={handleRandomClick} name={props.authState.auth.name} onSearch={handleSearchRequest} /> :
                        //have pokemon redirect to search
                        <Redirect to={ROUTE_TO_HOME} />)
                    :
                    //check no name then  show this
                    <InstructionName onNameEntered={onNameEntered} />
            }
        </>

    )



    //         /* https://archive.org/download/299SoundEffectCollection/101%20Opening.mp3 */}
    //         /*  https://archive.org/download/soundcloud-211368187/211368187.mp3 */}

    //     </>
    // )
}

export default connector(IntroPage)