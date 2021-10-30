import { Button, HStack, IconButton, Input, VStack ,Text} from "@chakra-ui/react"
import React, { useState } from "react"
import { MdSearch } from "react-icons/md"
import Ash from '../../assets/ash.png'
import InstructionHOC from "../hoc/instruction"
import { InstructionSearchProps } from "./types"
const InstructionSearch: React.FC<InstructionSearchProps> = (props) => {


    const [search,setSearch]= useState('');


    return (
        <InstructionHOC
            title=" Find your pokemons"
            instruction={[`${props.name}!`, 'Your very own pokemon legend is about to unfold.',"Let's start by building your team."]}
            img={{
                src: Ash,
                alt: 'ash hold his cap'
            }}
        >
            <VStack spacing={5} m={3}>


            
            <HStack mt={5} w={'100%'}>
                <Input
                 placeholder="Enter a pokemon full/partial name"
                  size="sm" 
                  
                  onChange={(e)=>setSearch(e.target.value??'')}
                  value={search}
                  />
                <IconButton
                    aria-label="go btn"
                    size={'sm'}
                    colorScheme={'primary'}
                    disabled ={search.length<2}
                    icon={<MdSearch />}
                    onClick={()=>props.onSearch(search)}

                />
            </HStack>
             <Text fontSize={'md'}>
                 OR
             </Text>
            <Button 
            w={'100%'}
            size={'sm'}
            aria-label="random pokemon gerator"
            colorScheme={'primary'}
            onClick={props.onRandomClicked}
            >
               Show Me A Random Pokemon
            </Button>
            </VStack>

        </InstructionHOC>
    )


   
}

export default InstructionSearch