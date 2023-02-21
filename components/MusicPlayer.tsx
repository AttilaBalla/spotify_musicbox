import React from "react";
import {Box, Image, Text, IconButton} from "@chakra-ui/react";
import {
    getCurrentPlaybackState,
    pausePlayback,
    skipToNextTrack,
    skipToPreviousTrack,
    startOrResumePlayback
} from "../utilities/apiRequest";
import {ArrowLeftIcon, ArrowRightIcon} from "@chakra-ui/icons";
import {MdOutlinePlayArrow} from 'react-icons/md';
import classes from '../styles/Main.module.css';
import {useMutation, useQuery} from "@tanstack/react-query";

export const MusicPlayer: React.FC = () => {

    const playbackState = useQuery(['playbackState'], getCurrentPlaybackState);
    const skipToNext = useMutation(skipToNextTrack);
    const skipToPrevious = useMutation(skipToPreviousTrack);
    const playOrResume = useMutation(startOrResumePlayback);
    const pause = useMutation(pausePlayback);

    return (
        <Box className={classes.musicPlayer} display={"flex"} justifyContent={"space-around"} alignItems={'center'}>
            <Box display={"flex"}>
                {playbackState.data ?
                    <React.Fragment>
                        <Image mr={'1rem'} boxSize={'80px'} src={playbackState.data.item.album.images[0].url}/>
                        <Box display={'flex'} flexDirection={'column'}>
                            <Text fontSize={'2xl'}>{playbackState.data.item.name}</Text>
                            <Text fontSize={'xl'}>{playbackState.data.item.artists[0].name}</Text>
                        </Box>
                    </React.Fragment> :
                    <Text>Nothing playing right now...</Text>}
            </Box>
            <Box minWidth={'8rem'}>
                <IconButton
                    onClick={() => {
                        skipToPrevious.mutate();
                    }}
                    aria-label='Previous'
                    icon={<ArrowLeftIcon/>}
                />
                <IconButton
                    aria-label='Play/Pause'
                    icon={<MdOutlinePlayArrow size={24}/>}
                />
                <IconButton
                    onClick={() => {
                        skipToNext.mutate();
                    }}
                    aria-label='Next'
                    icon={<ArrowRightIcon/>}
                />
            </Box>
        </Box>
    )
}
