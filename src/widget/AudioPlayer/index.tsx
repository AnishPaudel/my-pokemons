import {

    CircularProgress,
    IconButton, IconButtonProps, Tooltip
} from "@chakra-ui/react"
import React, { useState } from "react"
import { MdVolumeOff, MdVolumeUp } from "react-icons/md"
import ReactPlayer from "react-player"
type AudioplayerProps = Omit<IconButtonProps, "aria-label">
const AudioPlayer: React.FC<AudioplayerProps> = (props) => {

    const [playing, setPlaying] = useState(false);

    const [ready, setReady] = useState(false)



    return (
        <>


            {
                !ready ?
                    <CircularProgress
                        size={'1.5rem'}
                        marginLeft={3}
                        color={'black'}
                        isIndeterminate
                    /> : 
                    <Tooltip label="Enable audio for better experience" placement="right">
                    <IconButton
                        size="md"
                        fontSize="lg"
                        variant="ghost"
                        color="current"
                        marginLeft="2"
                        onClick={() => setPlaying(play => (!play))}
                        icon={playing ? <MdVolumeUp /> : <MdVolumeOff />}
                        aria-label={`Volumen change`}
                        {...props}

                    />
                    </Tooltip>
            }


            <ReactPlayer
                onReady={() => {
                    console.log('playing')
                    setReady(true)
                }}

                url={'https://archive.org/download/299SoundEffectCollection/101%20Opening.mp3'} style={{ display: 'none' }} volume={0.03} loop playing={playing} />
        </>
    )
}

export default AudioPlayer