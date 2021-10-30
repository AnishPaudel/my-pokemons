import { Button, HStack, Input } from "@chakra-ui/react"
import React, { useState } from "react"
import ProfOak from '../../assets/prof_oak.png'
import InstructionHOC from "../../component/hoc/instruction"
import { InstructionNameProps } from "./types"
const InstructionName: React.FC<InstructionNameProps> = (props) => {


    const [name,setName]= useState('');


    return (
        <InstructionHOC
            title=" First , What is your name ?"
            instruction={[' Hello There !', ' Welcome to the world of Pokemon !']}
            img={{
                src: ProfOak,
                alt: 'prof oak holding pokedex'
            }}
        >
            <HStack mt={5}>
                <Input
                 placeholder="Your name"
                  size="sm" 
                  onChange={(e)=>setName(e.target.value??'')}
                  value={name}
                  />
                <Button
                    aria-label="go btn"
                    size={'sm'}
                    colorScheme={'primary'}
                    disabled ={name.length===0}

                    onClick={()=>props.onNameEntered(name)}

                >GO</Button>
            </HStack>

        </InstructionHOC>
    )


   
}

export default InstructionName