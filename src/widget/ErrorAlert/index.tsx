import React from "react";

import {AlertDialog,AlertDialogOverlay,AlertDialogContent,AlertDialogHeader,AlertDialogFooter, AlertDialogBody, AlertDialogCloseButton} from '@chakra-ui/react'
import { bindActionCreators } from "redux";
import { AuthState } from "../../backend/reduxRepo/auth/auth.state";
import { connect, ConnectedProps } from "react-redux";
import {resetAuthError} from '../../backend/reduxRepo/auth/auth.action'

const mapStateToProps = (state: any) => {


    return ({

        authState: state.authState as AuthState,
      
    })
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
       resetAuthError
    }, dispatch);
}

const connector = connect(mapStateToProps, mapDispatchToProps);



type Props = ConnectedProps<typeof connector>

const ErrorAlert: React.FC<Props> = (props) => {

    const cancelRef = React.useRef<any>()

    return (
        <React.Fragment>
            <AlertDialog
                motionPreset="slideInBottom"
                onClose={props.resetAuthError}
                isOpen={!!props.authState.error}
                isCentered
                leastDestructiveRef={cancelRef}
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Error</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody mb={5}>
                        {props.authState.error}
                    </AlertDialogBody>
                   
                </AlertDialogContent>
            </AlertDialog>
        </React.Fragment>
    )
}

export default connector(ErrorAlert);