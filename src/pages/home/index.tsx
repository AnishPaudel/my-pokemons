import { Box, Button, CircularProgress, Drawer, DrawerContent, DrawerOverlay, Flex, HStack, Icon, IconButton, Input, Text, useBreakpointValue, VStack } from '@chakra-ui/react';
import React, { createRef, useEffect, useRef, useState } from "react";
import { MdCatchingPokemon, MdClose, MdSearch, MdShuffle } from "react-icons/md";
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { Pokemon } from '../../backend/core/pokemon/pokemon.model';
import { addRemovePokemon } from '../../backend/reduxRepo/auth/auth.action';
import { AuthState } from '../../backend/reduxRepo/auth/auth.state';
import { fetchPokemonList } from '../../backend/reduxRepo/pokemonList/pokemonList.action';
import { PokemonListState } from '../../backend/reduxRepo/pokemonList/pokemonList.state';
import PokemonList from '../../component/PokemonList';
import TeamPokemonListComponent from '../../component/TeamPokemonList';
import { PRAG_GENERATE_RANDOM, PRAG_SEARCH } from '../../routes/constants';
import PokemonDetailDialog from '../../widget/PokemonDetailDialog';
import { openCloseDetailDialog,openRandomPokemon } from '../../backend/reduxRepo/pokemon/pokemon.action'
import { ErrorType } from '../../backend/core/common/errorPokemon';


const mapStateToProps = (state: any) => {


    return ({

        authState: state.authState as AuthState,
        pokemonListS: state.pokemonList as PokemonListState
    })
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        addRemovePokemon, fetchPokemonList, openCloseDetailDialog,openRandomPokemon
    }, dispatch);
}

const connector = connect(mapStateToProps, mapDispatchToProps);



type Props = ConnectedProps<typeof connector>

const mergeListWithTeam = (team: Pokemon[], list: Pokemon[]): Pokemon[] => {

    if (team.length === 0) {
        //if team has no memeber
        return list;
    }

    //reset all 
    list.forEach(p => { p.onTeam = undefined ; p.nickName=undefined})

    for (let t of team) {
        let i = list.findIndex((p) => p.name === t.name)
        if (i !== -1) {
            list[i] = {
                ...list[i],
                onTeam: true,
                nickName:t.nickName
            }
        }

    }

    return list
}

const HomePage: React.FC<Props> = (props) => {
    const history = useHistory();
    let searchRequestPram = (history.location.state ?? {} as any)[`${PRAG_SEARCH}`] ?? undefined
    const [search, setSearch] = useState<string>(searchRequestPram ?? '');

    const isMobile = useBreakpointValue({ base: true, md: false })
    const [mobileDOpen, setMoblieDOpen] = useState(false);

    const searchRef = createRef<HTMLInputElement>()



    //only first time load  send request from other pages
    useEffect(() => {
        if (searchRequestPram && props.pokemonListS.searchPram !== searchRequestPram ) {
            props.fetchPokemonList(searchRequestPram);

        }
        if((history.location.state ?? {} as any)[`${PRAG_GENERATE_RANDOM}`]){
           handlePokemonRandomClick()
        }
    }, [])

    const pokeList = React.useMemo(
        () => mergeListWithTeam(props.authState.auth.team, props.pokemonListS.pokemonList)
        , [props.authState.auth.team, props.pokemonListS.pokemonList])




    const handleSearchBtnClick = () => {
        searchRef.current?.blur()
        if (props.pokemonListS.searchPram !== search) {
            props.fetchPokemonList(search);
        }
    }



    const addremovePokemonToTeam = (pokemon: Pokemon) => {
        //select or deselect

        props.addRemovePokemon(pokemon, props.authState.auth);
    }

    //detail dialog



    const handlePokemonOnClick = (pokemon: Pokemon) => {

        //open detail dialog 

        props.openCloseDetailDialog(pokemon)

    }

    const handlePokemonRandomClick=()=>{
        props.openRandomPokemon();
    }



    const searchHeader = (
        <Box mt={3} display={'flex'} flexDirection={'column'} p={4} alignItems={'center'}>

            <Text color={'primary.500'} fontSize={'xl'}>
                Find Your Pokemon
            </Text>
            <HStack mt={5} w={{ base: '100%', md: '40vw' }} >
                <Input
                    placeholder="Enter a pokemon full/partial name "
                    size="sm"
                    ref={searchRef}
                    onChange={(e) => setSearch(e.target.value ?? '')}
                    value={search}
                    onKeyUp={
                        (e)=>{
                            console.log(e)
                            if( e.key === 'Enter'){
                                handleSearchBtnClick()
                            }
                        }
                    }
                    type={'search'}
                />
                <IconButton
                    aria-label="go btn"
                    size={'sm'}
                    colorScheme={'primary'}
                    disabled={search.length < 2}
                    onClick={handleSearchBtnClick}
                    icon={<MdSearch />}
                />
                <Box h={'1.5rem'} w={'1px'} bg={'gray.200'}></Box>
                <IconButton
                    aria-label="go btn"
                    size={'sm'}
                    colorScheme={'primary'}
                    onClick={handlePokemonRandomClick}

                    icon={<MdShuffle />}
                />
            </HStack>

        </Box>
    )

    const MyPokemon = (
        <Box pt={4} backgroundColor={'gray.100'} >

            <Flex justifyContent={'center'} alignItems={'center'}>

                <Icon fontSize={20} color={'primary.500'}>
                    <MdCatchingPokemon />
                </Icon>

                <Text
                    ml={2}
                    textAlign={'center'}
                    color={'primary.500'}>

                    MY TEAM
                </Text>
            </Flex>



            <TeamPokemonListComponent
                onDeleteClickHandler={addremovePokemonToTeam}
                onClick={handlePokemonOnClick}
                team={props.authState.auth.team}
            />
        </Box>
    )

    const pokemonList = (
        <PokemonList
            list={pokeList}
            onCLick={handlePokemonOnClick}
            onSelected={addremovePokemonToTeam}
        />
    )

    const progressError = (
        <>
            {props.pokemonListS.progress ?
                <Box display={'flex'} w={'95vw'} mt={20} justifyContent={'center'} alignItems={'center'}>
                    <CircularProgress isIndeterminate color={'primary.500'} />
                </Box>
                : props.pokemonListS.error ?
                    <VStack mt={20} justifyContent={'center'} alignContent={'center'}>
                        <Text textAlign={'center'} >
                            {`${props.pokemonListS.error?.errorMsg} `}
                        </Text>
                        {
                            props.pokemonListS.error?.errorType !== ErrorType.ERROR_FILTER_NO_DATA ?
                                <Button onClick={() => props.fetchPokemonList(search.length > 1 ? search : searchRequestPram)}>
                                    Try Again
                                </Button> : null
                        }

                    </VStack> : null


            }
        </>
    )

    return (
        <>
            <Flex minH={'100%'} >
                <Box flex={1} h={'100%'} overflowY={'auto'} >
                    <Box  >
                        {searchHeader}

                        {pokemonList}
                        {progressError}
                    </Box>


                </Box>
                <Box orientation='vertical' h={'100%'} minH={'100%'} bg={'gray.200'} w={'1px'} />
                {
                    !isMobile ?
                        MyPokemon :
                        (
                            <Drawer placement={'right'} onClose={() => setMoblieDOpen(false)} isOpen={mobileDOpen}>
                                <DrawerOverlay />

                                <DrawerContent overflow={'auto'}   >
                                    {/* for title */}
                                    <HStack p={3}>
                                        <Flex w={'100%'} justifyContent={'center'} alignItems={'center'}>

                                            <Icon fontSize={22} color={'primary.500'}>
                                                <MdCatchingPokemon />
                                            </Icon>

                                            <Text
                                                ml={2}
                                                textAlign={'center'}
                                                color={'primary.500'}>

                                                MY TEAM
                                            </Text>
                                        </Flex>
                                        <IconButton
                                            aria-label="remove pokemon from team"
                                            icon={<MdClose />}
                                            alignSelf={'flex-end'}

                                            onClick={() => setMoblieDOpen(false)}
                                        />
                                    </HStack>

                                    <TeamPokemonListComponent
                                        onDeleteClickHandler={addremovePokemonToTeam}
                                        onClick={handlePokemonOnClick}
                                        team={props.authState.auth.team}
                                    />
                                </DrawerContent>
                            </Drawer>
                        )
                }
                {
                    isMobile ?
                        <Button
                            position={'absolute'}
                            color={'primary.500'}
                            bottom={4}
                            onClick={() => setMoblieDOpen(true)}
                            opacity={'80%'}
                            leftIcon={<MdCatchingPokemon />}
                            right={5}>
                            <Text>
                                My Team
                            </Text>

                        </Button> : null
                }



            </Flex>



        </>
    )
}

export default connector(HomePage)