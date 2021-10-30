import {
    Box, Checkbox, GridItem, HStack, Image, SimpleGrid, Text, VStack
} from '@chakra-ui/react';
import React from "react";
import PokemonPlaceHolder from '../../assets/pokemon_place.png';
import { PokemonListProps } from "./types";

const PokemonList: React.FC<PokemonListProps> = (props) => {

    return (
        <>
            <Box minH={'40%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <SimpleGrid minChildWidth="120px" spacing={5} w={'100%'}>
                    {
                        props.list.map((p) => {
                            return (
                                <GridItem key={p.name} >
                                    <VStack>
                                        <Image
                                            alt={`${p.name}`}
                                            src={p.imgUrl ?? ''}
                                            fallbackSrc={PokemonPlaceHolder}
                                            cursor={'pointer'}
                                            onClick={()=>props.onCLick(p)}

                                        />
                                        <HStack>
                                            <Checkbox
                                             colorScheme="primary"
                                             onChange={()=>props.onSelected(p)}
                                             isChecked={p.onTeam??false} >
                                             
                                            </Checkbox>
                                            <Text cursor={'pointer'}   onClick={()=>props.onCLick(p)}>
                                            {p.name}
                                            </Text>
                                            
                                        </HStack>

                                    </VStack>

                                </GridItem>
                            )
                        })
                    }
                </SimpleGrid>
            </Box>
        </>
    )
}

export default PokemonList