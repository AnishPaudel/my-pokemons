import React, { useEffect, useState } from "react"
import { Flex, HStack ,Box} from "@chakra-ui/react"
import AudioPlayer from "../../widget/AudioPlayer"
import { ColorModeSwitcher } from "../../widget/ColorModeSwitcher"
import ErrorAlert from "../../widget/ErrorAlert"

//common layout stuff

const Layout: React.FC = (props) => {
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        const updateWindowDimensions = () => {
            const newHeight = window.innerHeight-2;


            setHeight(newHeight);
            console.log("updating height");
        };

        window.addEventListener("resize", updateWindowDimensions);

        return () => window.removeEventListener("resize", updateWindowDimensions)

    }, []);
    return (
        <>
           <Box position={'relative'} >
           <Box  display={{ md: "flex" }} height={`${height}px`} overflow={'auto'} >
                <Box m={1} >
                    <Box display={{md:'block',base:'flex'}}>
                    <ColorModeSwitcher  />
                    <div>
                    <AudioPlayer />
                    </div>
                  
                    </Box>
                   
                </Box>
                <Box flex="1" h={`calc(${height}px - 3rem)`}>
                {props.children}
                </Box>
                

            </Box>
           </Box>
          
         
        </>
    )

}

export default Layout