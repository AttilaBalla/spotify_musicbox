import React from "react";
import {Box, Image, Text} from "@chakra-ui/react";
import classes from "../styles/recentlyPlayed.module.css";
import {IModalParams, ISpotifyAudioFeatures, ISpotifyTrackInfo} from "../utilities/types";
import {convertMsToMinutesSeconds} from "../utilities/helpers";
import {MdAccessTime, MdDirectionsRun} from 'react-icons/md';

interface IProps {
    item: ISpotifyTrackInfo,
    audioFeatures: ISpotifyAudioFeatures,
    openModal: (modalParams: IModalParams) => void // callback from useDisclosure that opens modal
}

export const TrackItem: React.FC<IProps> = ({item, audioFeatures, openModal}) => {

    const trackDuration = convertMsToMinutesSeconds(item.track.duration_ms);

    return (
        <Box display={'flex'}
             my={'1rem'}
        >
            <Image mr={'1rem'} boxSize={'50px'} src={item.track.album.images[0].url}/>
            <Box display={'flex'}
                 width={'100%'}
                 justifyContent={'space-between'}
                 className={classes.recentlyPlayedItem}
                 onClick={() => {
                     openModal({track: item.track, audioFeatures: audioFeatures});
                 }}>
                <Box display={'flex'} flexDirection={'column'}>
                    <Text>{item.track.name}</Text>
                    <Text>{item.track.artists[0].name}</Text>
                </Box>
                <Box display={'flex'} alignItems={'center'} >
                    <MdAccessTime/><Text ml={'.25rem'} mr={'2rem'}>{`${Math.floor(trackDuration.minutes)}:${trackDuration.seconds}`}</Text>
                    <MdDirectionsRun/><Text minWidth={'2.5rem'}>{Math.round(audioFeatures?.tempo)}</Text>
                </Box>
            </Box>
        </Box>
    )
}