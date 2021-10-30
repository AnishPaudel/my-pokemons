import { Box, IconButton, Image, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import React from "react";
import { MdRemoveCircle } from "react-icons/md";
import PokemonPlaceHolder from '../../assets/pokemon_place.png';
import { TeamPokemonListProps } from "./types";
import PokeballBack from '../../assets/pokeball_back.png'
const TeamPokemonListComponent: React.FC<TeamPokemonListProps> = (props) => {
    const value = useColorModeValue('gray.100', 'gray.400')
    return (
        <React.Fragment>

            <Box minW={'10rem'} >

                <VStack mt={4} h={'100%'}  bg={value} spacing={6}>

                    {
                        props.team.map((p) => {
                            return (

                                <VStack key={p.name} w={'100%'} >
                                    <IconButton
                                        aria-label="remove pokemon from team"
                                        icon={<MdRemoveCircle />}
                                        alignSelf={'flex-end'}
                                        mb={-4}
                                        onClick={() => props.onDeleteClickHandler(p)}
                                    />
                                    <Box bg={`url(${PokeballBack})`} backgroundRepeat={'no-repeat'} backgroundSize={'cover'}>
                                        <Image
                                            alt={`${p.name}`}
                                            src={p.showDownGifUrl ?? ''}
                                            fallbackSrc={p.imgUrl??''}
                                            cursor={'pointer'}
                                            h={'90px'}
                                            w={'90px'}
                                            maxW={'9rem'}
                                            objectFit={'scale-down'}
                                            onClick={()=>props.onClick(p)}


                                        />
                                    </Box>


                                    <Text cursor={'pointer'} align={'center'} ml={4} w={'100%'} onClick={()=>props.onClick(p)}>
                                        {p.nickName??p.name}
                                    </Text>



                                </VStack>
                            )
                        })
                    }
                </VStack>

            </Box>
        </React.Fragment>
    )
}
export default TeamPokemonListComponent;