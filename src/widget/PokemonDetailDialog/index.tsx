import { Badge, Box, Button, Checkbox, CircularProgress, Flex, GridItem, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, Tag, Text, useBreakpointValue, VStack } from '@chakra-ui/react';
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { bindActionCreators } from "redux";
import { Pokemon, PokemonDetail, PokemonTypes } from '../../backend/core/pokemon/pokemon.model';
import { AuthState } from "../../backend/reduxRepo/auth/auth.state";
import { addRemovePokemon } from "../../backend/reduxRepo/auth/auth.action";
import { fetchPokemonDetail, openCloseDetailDialog } from "../../backend/reduxRepo/pokemon/pokemon.action";
import { PokemonState } from "../../backend/reduxRepo/pokemon/pokemon.state";
import { getPokemonTypeColor } from '../../backend/core/common/pokemonTypeUtil';

const mapStateToProps = (state: any) => {


    return ({

        authState: state.authState as AuthState,
        pokemonState: state.pokemonState as PokemonState
    })
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        fetchPokemonDetail, openCloseDetailDialog, addRemovePokemon
    }, dispatch);
}

const connector = connect(mapStateToProps, mapDispatchToProps);



type Props = ConnectedProps<typeof connector>


//merge pokemon with team (when pokemon gets in team this object may not know )
const mergePokemonWithTeam = (team: Pokemon[], pokemon?: Pokemon,): Pokemon | undefined => {

    let p = pokemon ? {
        ...pokemon
    } : undefined

    if (p) {
        //if team has no member return pokemon
        if (team.length === 0) {
            return p;
        }
        //get pokemon on the team
        let pt = team.findIndex(pk => p!.name === pk.name);

        if (pt !== -1) {
            // it is on the team
            p.onTeam = true;

        } else {
            p.onTeam = false;
        }
        return p

    }

    return undefined;

}

const PokemonDetailDialog: React.FC<Props> = (props) => {
    const finalRef = React.useRef<any>();

    const pokemon = React.useMemo(() => mergePokemonWithTeam(props.authState.auth.team, props.pokemonState.pokemon), [props.pokemonState.pokemon, props.authState.auth.team])

    const isMobile = useBreakpointValue({ base: true, md: false })
    const dialogCloseHandler = () => {
        //close
        props.openCloseDetailDialog()
    }

    //about
    const aboutItem = (title: string, detail: string) => {

        return (
            <>
                <HStack spacing={2}>
                    <Text color={'gray.500'}>
                        {`${title} : `}
                    </Text>
                    <Text>
                        {detail}
                    </Text>
                </HStack>

            </>

        )
    }

    const typeItem = (type: PokemonTypes) => {

        return (
            <Badge ml={1} mr={1} key={type.name} color={'white'} bg={getPokemonTypeColor(type)}>{type.name}</Badge>

        )

    }

    const types = (detail: PokemonDetail) => {
        return (
            <Box>
                {
                    detail.types.map(a => (
                        typeItem(a)
                    ))
                }
            </Box>
        )
    }
    const about = (name: string, detail: PokemonDetail) => {

        // let types = '';

        // for (let t of detail.types) {
        //     types = types + t.name + ',';
        // }

        // if (types.length > 0) {
        //     types = types.substring(0, types.length - 1);
        // }

        return (
            <>
                <VStack spacing={5} alignItems={'flex-start'}>
                    {
                        aboutItem('Name', name)
                    }
                    <HStack spacing={2}>
                        <Text color={'gray.500'}>
                            {`Type/s : `}
                        </Text>
                        {types(detail)}
                    </HStack>
                    {
                        aboutItem('Height', detail.height)
                    }
                    {
                        aboutItem('Weight', detail.weight)
                    }
                    {
                        aboutItem('Base Exp', `${detail.base_experience}`)
                    }
                </VStack>
            </>
        );
    }

    //ablilites

    const tagsComponent = (t: string) => {

        return (

            <Tag m={1} key={t} >
                {t}
            </Tag>


        )
    }

    const ablities = (detail: PokemonDetail) => {
        return (

            <Box>
                {
                    detail.abilities.map(a => (
                        tagsComponent(a.ability)
                    ))
                }
            </Box>

        )
    }

    const moves = (detail: PokemonDetail) => {
        return (
            <Box>
                {
                    detail.moves.map(a => (
                        tagsComponent(a.name)
                    ))
                }
            </Box>
        )
    }

    const heldItems = (detail: PokemonDetail) => {
        return (
            <Box>
                {
                    detail.heldItems.map(a => (
                        tagsComponent(a.name)
                    ))
                }
            </Box>
        )
    }

    const handleonCheckedChange = () => {
        if (pokemon) {
            props.addRemovePokemon(pokemon, props.authState.auth)
        }

    }

    return (
        <>


            <Modal finalFocusRef={finalRef} size={isMobile?'full':undefined} isOpen={!!(pokemon)} onClose={dialogCloseHandler}>
                <ModalOverlay />
                <ModalContent>

                    <Box mt={10} minH={'96px'} display={'flex'} w={'100%'} alignContent={'center'} justifyContent={'center'}>
                        <Image
                            alt="pokemonImage"
                            src={pokemon?.showDownGifUrl ?? ''}

                            objectFit={'scale-down'}
                            alignSelf={'center'}
                            fallbackSrc={pokemon?.imgUrl ?? ''}
                        />
                    </Box>
                    <ModalHeader>
                        <VStack justifyContent={'center'} alignItems={'center'} spacing={1}>
                            <HStack justifyContent={'center'} w={'100%'}>
                                <Checkbox
                                    colorScheme="primary"
                                    isChecked={pokemon?.onTeam ?? false}
                                    onChange={handleonCheckedChange}
                                >

                                </Checkbox>
                                <Text>
                                    {pokemon?.name}
                                </Text>


                            </HStack>
                            {
                                pokemon?.detail ? types(pokemon?.detail) : null
                            }
                        </VStack>

                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody minH={'50vh'}  >



                        {
                            pokemon?.detail ?
                                <Tabs>
                                    <TabList >
                                        <Tab>About</Tab>
                                        <Tab>Abilites</Tab>
                                        <Tab>Moves</Tab>
                                        <Tab>Held Items</Tab>
                                    </TabList>

                                    <TabPanels h={isMobile?undefined:'40vh'} overflow={'auto'} >
                                        <TabPanel mt={2} p={2} >
                                            {
                                                about(pokemon.name, pokemon?.detail)
                                            }
                                        </TabPanel>

                                        <TabPanel mt={2} p={2}>
                                            {
                                                ablities(pokemon.detail)
                                            }
                                        </TabPanel>
                                        <TabPanel mt={2} p={2}>
                                            {
                                                moves(pokemon.detail)
                                            }
                                        </TabPanel>
                                        <TabPanel mt={2} p={2}>
                                            {
                                                heldItems(pokemon.detail)
                                            }
                                        </TabPanel>

                                    </TabPanels>
                                </Tabs> :
                                //progress 
                                props.pokemonState.progress ?
                                    <Box display={'flex'} mt={20} justifyContent={'center'} alignItems={'center'}>
                                        <CircularProgress isIndeterminate color={'primary.500'} />
                                    </Box>
                                    :
                                    //other wise error
                                    props.pokemonState.error ?
                                        <VStack justifyContent={'center'} alignContent={'center'}>
                                            <Text textAlign={'center'} >
                                                {`${props.pokemonState.error?.errorMsg} `}
                                            </Text>
                                            <Button onClick={pokemon ? () => props.fetchPokemonDetail(pokemon, true) : undefined}>
                                                Try Again
                                            </Button>
                                        </VStack>
                                        : null
                        }

                    </ModalBody>




                </ModalContent>
            </Modal>
            {/* progress for random */}

            <Modal finalFocusRef={finalRef} isOpen={props.pokemonState.progress && !pokemon} onClose={() => { }}>
                <ModalOverlay />
                <ModalContent minH={'60vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <CircularProgress color='primary.500' isIndeterminate />
                </ModalContent>

            </Modal>
        </>
    )
}

export default connector(PokemonDetailDialog);