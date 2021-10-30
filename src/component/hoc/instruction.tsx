import {
    Box, Image, Stack, Text
} from "@chakra-ui/react"
import React from "react"


//for all instructional component
const InstructionHOC: React.FC<{
    instruction:string[],
    title:string,
    img:{
        src:string,
        alt:string
    }
}> = (props) => {

    


    return (
        <>
            <Box textAlign="center" fontSize={{base:'medium',md:'xl'}} minH={'90vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Box display={{md:'flex'}}>
                    <Image
                        borderRadius="lg"
                        // width={{ md: 40 }}
                        height={{sm:'45vh',base:'30vh'}}
                        src={props.img.src}
                        alt={props.img.alt}
                        m={'auto'}
                    />
                    <Box ml={{md:10,base:5}} mt={{base:5,sm:10}} mr={5}  alignSelf={'center'} >
                        <Stack spacing={5}>
                        {
                            props.instruction.map(m=>(
                                <Text w={'100%'} textAlign={'start'} key={m} >
                                    {m}
                                </Text>
                            ))
                        }
                        
                        
                        </Stack>
                        <Text mt={8}  textAlign={'start'} color={'primary.500'}>
                           {props.title}
                        </Text>
                        {/* child here */}
                        {props.children}
                        

                    </Box>
                </Box>
            </Box>
            {/* https://archive.org/download/299SoundEffectCollection/101%20Opening.mp3 */}
            {/*  https://archive.org/download/soundcloud-211368187/211368187.mp3 */}

        </>
    )
}

export default InstructionHOC;
